'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * CONCEPT — 3D FLIGHT.  Option 3 of the 2026-08-23 depth comparison.
 *
 * ⚠ THIS CONCEPT DELIBERATELY BREAKS THE MASTER DOC.
 *
 * It is built to test, honestly, what the Montfort approach actually costs on
 * this project's audience. Faking it with CSS would have produced a nice page
 * and a worthless measurement, so the expensive parts are real:
 *
 *   - Real WebGL (three.js), not a CSS 3D transform impression of it.
 *   - Real scroll-jacking: wheel and touch are intercepted and the page is held
 *     while the camera flies. This is Part 6's first banned item.
 *   - Real pinned stage carrying text, which is the second half of that ban.
 *   - Mountains → ocean → globe zoom-out, which is Montfort's arc and also the
 *     exact "most predictable idea a travel site can have" the doc calls out.
 *
 * Override recorded: .memory/projects/travel-agency-app.md, 2026-08-23.
 *
 * Geometry is procedural — no model files — so the payload measured here is the
 * FLOOR for this approach. A real Montfort-grade build adds GLB models, textures
 * and an HDRI on top of it.
 */

export interface Scene {
  title: string;
  body: string;
}

export function FlightJourney({
  scenes,
  labels,
  rtl,
  footer,
}: {
  scenes: Scene[];
  labels: { skip: string; released: string; held: string };
  rtl: boolean;
  footer?: React.ReactNode;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [scene, setScene] = useState(0);
  const [held, setHeld] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  // Reduced motion cannot be honoured meaningfully here, and that is itself a
  // finding. A flight whose entire content is the flight has no cross-fade
  // equivalent — the only honest reduced-motion branch is to not run it at all.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) setHeld(false);
  }, []);

  /* ---------------------------------------------------------------- *
   * The scroll-jack. This is the banned behaviour, implemented properly
   * so the test is fair: wheel and touch deltas are consumed and mapped
   * to flight progress instead of moving the document.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    let releasedAt = 0;

    const advance = (delta: number) => {
      const next = Math.min(1, Math.max(0, progressRef.current + delta / 4200));
      progressRef.current = next;
      setScene(Math.min(scenes.length - 1, Math.floor(next * scenes.length)));
      if (next >= 1 && !releasedAt) {
        releasedAt = Date.now();
        setHeld(false);
      }
      if (next < 1 && releasedAt) {
        releasedAt = 0;
        setHeld(true);
      }
      return next;
    };

    const onWheel = (e: WheelEvent) => {
      const rect = stage.getBoundingClientRect();
      const inView = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!inView) return;
      const p = progressRef.current;
      // Only hold while there is flight left in the direction of travel.
      if ((e.deltaY > 0 && p < 1) || (e.deltaY < 0 && p > 0)) {
        e.preventDefault();
        advance(e.deltaY);
      }
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const rect = stage.getBoundingClientRect();
      const inView = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!inView) return;
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const p = progressRef.current;
      if ((dy > 0 && p < 1) || (dy < 0 && p > 0)) {
        e.preventDefault();
        advance(dy * 2.4);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [reduced, scenes.length]);

  /* ---------------------------------------------------------------- *
   * The WebGL scene: mist mountains → ocean → globe. Montfort's arc.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    if (reduced) return;
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      setWebglFailed(true);
      return;
    }
    if (!renderer.getContext()) { setWebglFailed(true); return; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    // Filmic tone mapping. Without it a dawn sky clips to flat white the moment
    // the sun is in frame, which is what made the first pass look muddy.
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const world = new THREE.Scene();

    // Dawn, not night. Linear fog rather than exponential: aerial perspective is
    // what separates one ridge from the next, and exp2 crushed them into a single
    // dark mass in the first pass.
    world.fog = new THREE.Fog(0xcdbfb6, 300, 2400);

    const camera = new THREE.PerspectiveCamera(58, mount.clientWidth / mount.clientHeight, 0.1, 7000);

    // Gradient sky dome. Cheaper and more controllable than an HDRI, and it keeps
    // the build free of texture payload.
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(5000, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          top: { value: new THREE.Color(0x24406e) },
          mid: { value: new THREE.Color(0x9fb6d4) },
          horizon: { value: new THREE.Color(0xf0b183) },
        },
        vertexShader: `
          varying vec3 vDir;
          void main() {
            vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform vec3 top; uniform vec3 mid; uniform vec3 horizon;
          varying vec3 vDir;
          void main() {
            float h = clamp(vDir.y * 1.15 + 0.12, 0.0, 1.0);
            vec3 c = mix(horizon, mid, smoothstep(0.0, 0.34, h));
            c = mix(c, top, smoothstep(0.30, 0.92, h));
            gl_FragColor = vec4(c, 1.0);
          }`,
      }),
    );
    world.add(sky);

    // Low, warm, raking light — the whole reason mountains read as mountains.
    world.add(new THREE.HemisphereLight(0xbcd6f5, 0x5d4c3c, 1.05));
    const sun = new THREE.DirectionalLight(0xffc98a, 2.6);
    sun.position.set(-420, 110, -520);
    world.add(sun);
    // Cool counter-fill from the opposite side so shadowed faces keep some form.
    const fill = new THREE.DirectionalLight(0x8fb4e0, 0.55);
    fill.position.set(340, 160, 420);
    world.add(fill);

    // --- Terrain: a displaced plane. Value noise, no texture files.
    const terrainGeo = new THREE.PlaneGeometry(900, 900, 190, 190);
    const pos = terrainGeo.attributes.position as THREE.BufferAttribute;
    const hash = (x: number, y: number) => {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };
    const smooth = (x: number, y: number) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      return (
        hash(xi, yi) * (1 - u) * (1 - v) +
        hash(xi + 1, yi) * u * (1 - v) +
        hash(xi, yi + 1) * (1 - u) * v +
        hash(xi + 1, yi + 1) * u * v
      );
    };
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      let h = 0, amp = 34, freq = 0.0075;
      for (let o = 0; o < 5; o++) {
        h += smooth(x * freq, y * freq) * amp;
        amp *= 0.5; freq *= 2.1;
      }
      const ridge = Math.pow(Math.abs(Math.sin(x * 0.0045)), 1.7) * 26;
      pos.setZ(i, h + ridge);
    }
    terrainGeo.computeVertexNormals();

    // Colour by elevation: valley green, rock, then snow on the tops. A single
    // flat colour is what made the first pass read as a dark blob.
    const cLow = new THREE.Color(0x3b5347);
    const cRock = new THREE.Color(0x6b7183);
    const cSnow = new THREE.Color(0xeaf1f8);
    const colours = new Float32Array(pos.count * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const h = pos.getZ(i);
      const t = Math.min(1, Math.max(0, (h - 6) / 46));
      if (t < 0.72) tmp.copy(cLow).lerp(cRock, t / 0.72);
      else tmp.copy(cRock).lerp(cSnow, (t - 0.72) / 0.28);
      colours[i * 3] = tmp.r; colours[i * 3 + 1] = tmp.g; colours[i * 3 + 2] = tmp.b;
    }
    terrainGeo.setAttribute('color', new THREE.BufferAttribute(colours, 3));

    const terrain = new THREE.Mesh(
      terrainGeo,
      new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0.02, flatShading: true }),
    );
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -14;
    world.add(terrain);

    // --- Ocean
    const oceanGeo = new THREE.PlaneGeometry(5200, 5200, 60, 60);
    const ocean = new THREE.Mesh(
      oceanGeo,
      new THREE.MeshStandardMaterial({ color: 0x2a5a80, roughness: 0.12, metalness: 0.78 }),
    );
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.set(0, -90, -1900);
    world.add(ocean);

    // --- Globe
    // The globe is the payoff frame, so it has to read as Earth rather than as a
    // grey ball. Continents come from the same value noise as the terrain,
    // sampled in lat/long — no texture, no extra payload.
    const globeGeo = new THREE.SphereGeometry(120, 96, 96);
    const gpos = globeGeo.attributes.position as THREE.BufferAttribute;
    const gcol = new Float32Array(gpos.count * 3);
    const cOcean = new THREE.Color(0x1d5c8c);
    const cShelf = new THREE.Color(0x2f7ba6);
    const cLand = new THREE.Color(0x4f7c4a);
    const cSand = new THREE.Color(0xa8946a);
    const cIce = new THREE.Color(0xe6f0f7);
    const gv = new THREE.Vector3();
    for (let i = 0; i < gpos.count; i++) {
      gv.fromBufferAttribute(gpos, i).normalize();
      const lat = Math.asin(Math.max(-1, Math.min(1, gv.y)));
      const lon = Math.atan2(gv.z, gv.x);
      let n = 0, amp = 1, f = 1.5;
      for (let o = 0; o < 4; o++) {
        n += smooth((lon + Math.PI) * f * 2.4, (lat + Math.PI / 2) * f * 2.4) * amp;
        amp *= 0.5; f *= 2.0;
      }
      n /= 1.875;
      const polar = Math.abs(gv.y);
      if (polar > 0.88) tmp.copy(cIce);
      else if (n > 0.54) tmp.copy(cLand).lerp(cSand, Math.min(1, (n - 0.54) * 5));
      else tmp.copy(cOcean).lerp(cShelf, Math.min(1, (n - 0.44) * 8));
      gcol[i * 3] = tmp.r; gcol[i * 3 + 1] = tmp.g; gcol[i * 3 + 2] = tmp.b;
    }
    globeGeo.setAttribute('color', new THREE.BufferAttribute(gcol, 3));

    const globe = new THREE.Mesh(
      globeGeo,
      new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0.06 }),
    );
    globe.position.set(0, 40, -2600);
    globe.rotation.z = 0.41;
    world.add(globe);

    // The main sun rakes the ridges from behind — that backlight is what makes
    // the dawn silhouette — but it leaves the globe's camera-facing side unlit,
    // so its continents washed out to flat grey. A layer-scoped light fixes the
    // globe alone: lights only affect objects sharing a layer, so the mountains
    // keep their backlighting untouched.
    globe.layers.enable(1);
    const globeLight = new THREE.DirectionalLight(0xfff2e2, 2.8);
    globeLight.position.set(-260, 300, 900);
    globeLight.layers.set(1);
    world.add(globeLight);
    // Atmosphere as a fresnel rim. A plain BackSide sphere renders as a disc over
    // the whole planet and washes the continents out; fresnel confines the glow
    // to the limb, which is what actually reads as atmosphere.
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(129, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        blending: THREE.AdditiveBlending,
        uniforms: { glow: { value: new THREE.Color(0x8ecdf2) } },
        vertexShader: `
          varying vec3 vN; varying vec3 vP;
          void main() {
            vN = normalize(normalMatrix * normal);
            vP = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform vec3 glow; varying vec3 vN; varying vec3 vP;
          void main() {
            float rim = 1.0 - abs(dot(normalize(vN), normalize(-vP)));
            gl_FragColor = vec4(glow, pow(clamp(rim, 0.0, 1.0), 3.2) * 0.95);
          }`,
      }),
    );
    halo.position.copy(globe.position);
    world.add(halo);

    // --- Mist
    const mistCount = 900;
    const mistGeo = new THREE.BufferGeometry();
    const mistPos = new Float32Array(mistCount * 3);
    for (let i = 0; i < mistCount; i++) {
      mistPos[i * 3] = (Math.random() - 0.5) * 800;
      mistPos[i * 3 + 1] = 4 + Math.random() * 30;
      mistPos[i * 3 + 2] = -Math.random() * 2400;
    }
    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));

    const puff = document.createElement('canvas');
    puff.width = puff.height = 64;
    const pctx = puff.getContext('2d')!;
    const grad = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.28)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    pctx.fillStyle = grad;
    pctx.fillRect(0, 0, 64, 64);
    const puffTex = new THREE.CanvasTexture(puff);
    const mist = new THREE.Points(
      mistGeo,
      new THREE.PointsMaterial({
        color: 0xf6ece2,
        map: puffTex,
        size: 34,
        transparent: true,
        opacity: 0.2,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    );
    world.add(mist);

    // --- Flight path
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 46, 340),
      new THREE.Vector3(-38, 30, 90),
      new THREE.Vector3(26, 22, -220),
      new THREE.Vector3(-14, 34, -620),
      new THREE.Vector3(8, 68, -1120),
      new THREE.Vector3(0, 150, -1750),
      new THREE.Vector3(0, 190, -2280),
    ]);

    let raf = 0;
    let smoothed = 0;
    const clock = new THREE.Clock();

    let last = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      // Time-based smoothing, not per-frame. A fixed 0.075 per frame makes the
      // flight run at double speed on a 120Hz display and crawl on a throttled
      // one — the camera's pace must not depend on the refresh rate.
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const t = clock.getElapsedTime();
      smoothed += (progressRef.current - smoothed) * (1 - Math.exp(-dt * 4.5));
      const p = Math.min(0.999, Math.max(0, smoothed));

      const at = curve.getPointAt(p);
      const ahead = curve.getPointAt(Math.min(0.999, p + 0.02));
      camera.position.copy(at);
      camera.position.y += Math.sin(t * 0.7) * 1.1;
      camera.lookAt(ahead.x, ahead.y - 6, ahead.z - 60);

      globe.rotation.y = t * 0.05;
      mist.rotation.y = t * 0.006;
      ocean.position.y = -90 + Math.sin(t * 0.5) * 0.8;

      renderer.render(world, camera);
    };
    frame();

    const onResize = () => {
      if (!mount.clientWidth) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      terrainGeo.dispose();
      oceanGeo.dispose();
      mistGeo.dispose();
      puffTex.dispose();
      world.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  const skip = () => {
    progressRef.current = 1;
    setScene(scenes.length - 1);
    setHeld(false);
    stageRef.current?.scrollIntoView({ block: 'end' });
  };

  return (
    <div style={{ background: '#0b1017' }}>
      <div ref={stageRef} style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}>
        {reduced || webglFailed ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              padding: '0 8vw',
              textAlign: 'center',
              color: '#dfe8f2',
            }}
          >
            <p style={{ maxWidth: '34ch', lineHeight: 1.6, fontSize: '.95rem' }}>
              {webglFailed
                ? 'WebGL is unavailable on this device, so the flight cannot run.'
                : 'Reduced motion is on. A flight has no reduced-motion equivalent, so it is skipped entirely.'}
            </p>
          </div>
        ) : (
          <>
            <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
            {/* Contrast scrim. The flight's brightest frames put near-white snow
                directly under the headline, and Part 7 grades contrast per line
                at the brightest frame that ever passes beneath it. */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background:
                  'linear-gradient(to bottom, rgba(9,13,20,.34) 0%, rgba(9,13,20,0) 26%, rgba(9,13,20,.10) 48%, rgba(9,13,20,.66) 78%, rgba(9,13,20,.88) 100%)',
              }}
            />
          </>
        )}

        {/* Text carried ON the pinned stage — the second half of the ban. */}
        {!reduced && !webglFailed && (
          <div
            style={{
              position: 'absolute',
              insetInlineStart: '6vw',
              bottom: '18%',
              maxWidth: '30rem',
              pointerEvents: 'none',
            }}
          >
            {scenes.map((s, i) => (
              <div
                key={s.title}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  insetInlineStart: 0,
                  bottom: 0,
                  opacity: scene === i ? 1 : 0,
                  transform: scene === i ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 520ms ease, transform 520ms ease',
                }}
              >
                <h2
                  style={{
                    margin: '0 0 .8rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 'clamp(1.7rem, 4.6vw, 3rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#f2f7fc',
                    textWrap: 'balance',
                  }}
                >
                  {s.title}
                </h2>
                <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6, color: 'rgba(230,240,250,.76)', maxWidth: '36ch' }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* An escape hatch. Montfort itself does not give you one; without it a
            scroll-jacked stage is a trap, and shipping the trap to measure it
            would be dishonest to anyone who opens this page. */}
        {!reduced && !webglFailed && (
          <>
            <div
              style={{
                position: 'absolute',
                insetInlineEnd: '6vw',
                bottom: '2.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '.9rem',
                color: 'rgba(230,240,250,.55)',
                fontSize: '.62rem',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                direction: rtl ? 'rtl' : 'ltr',
              }}
            >
              <span>{held ? labels.held : labels.released}</span>
              <button
                onClick={skip}
                style={{
                  pointerEvents: 'auto',
                  background: 'transparent',
                  border: '1px solid rgba(230,240,250,.34)',
                  color: 'rgba(230,240,250,.8)',
                  padding: '.42rem .8rem',
                  fontSize: '.62rem',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: 2,
                }}
              >
                {labels.skip}
              </button>
            </div>
            <div style={{ position: 'absolute', insetInline: 0, bottom: 0, height: 2, background: 'rgba(255,255,255,.12)' }}>
              <div
                id="flight-progress"
                style={{ height: '100%', width: `${scene === 0 ? 6 : ((scene + 1) / scenes.length) * 100}%`, background: '#8fd0f0', transition: 'width 420ms ease' }}
              />
            </div>
          </>
        )}
      </div>

      {footer}
    </div>
  );
}
