/**
 * Marks <html> as JS-capable as early as possible, before the rest of the
 * document parses — pairs with the `html:not(.js) [data-motion-reveal]`
 * override in `./no-js.css`. Render as the first child of <head> in the
 * target project's root layout (e.g. Next.js App Router's
 * `app/layout.tsx`):
 *
 *   <html lang="en">
 *     <head>
 *       <NoJsGuardScript />
 *       ...
 *     </head>
 *     <body>{children}</body>
 *   </html>
 *
 * Deliberately not a client component ("use client" components still hydrate
 * after the full document parses, too late for this) — it has to render as
 * plain, synchronous markup that runs while the browser is still parsing
 * <head>, independent of React hydration.
 */
export function NoJsGuardScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: "document.documentElement.classList.add('js')",
      }}
    />
  );
}
