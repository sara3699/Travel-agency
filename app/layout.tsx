// Root layout exists only to satisfy the App Router. All real markup lives under
// app/[lang] so no route can escape the locale segment. FOUND-01.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
