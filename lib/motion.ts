/**
 * One answer to "should this move?", for CSS and for JavaScript alike.
 *
 * The footer control writes <html data-motion>, and it has to beat the media
 * query in both directions: a person whose OS says reduce can ask for the full
 * thing here, and a person whose OS says nothing can ask for less. Reading
 * `matchMedia` on its own would ignore the control and make it a decoration,
 * which is worse than not shipping one.
 *
 * Client only. Every caller is inside an effect or an event handler.
 */
export function prefersReducedMotion(): boolean {
  if (typeof document === 'undefined') return false;
  const explicit = document.documentElement.getAttribute('data-motion');
  if (explicit === 'reduce') return true;
  if (explicit === 'full') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Replayed before first paint from the layout. Kept here as the single source
 * of the storage key and the attribute name, and inlined as a string because a
 * module cannot run before hydration.
 */
export const MOTION_BOOT_SCRIPT = `try{var m=localStorage.getItem('motion-pref');if(m==='reduce'||m==='full')document.documentElement.setAttribute('data-motion',m)}catch(e){}`;
