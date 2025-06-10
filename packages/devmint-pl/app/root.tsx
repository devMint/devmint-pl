import { href, isRouteErrorResponse, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import { twMerge } from 'tailwind-merge'
import stylesheet from './root.css?url'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'icon', href: '/favicon.svg' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const isActive = ({ isActive }: { isActive: boolean }) =>
    twMerge(`text-theme-black hover:text-primary-dark`, isActive && 'text-primary-dark')

  return (
    <>
      <header className="mx-auto mb-12 mt-12 flex w-full max-w-[660px] flex-col items-start pl-4 pr-4">
        <div className="flex items-end">
          <h1 className="font-logo text-theme-black text-6xl font-black">devMint</h1>
          <img className="w-[26px]" alt="devMint" src="/favicon.svg" />
        </div>

        <nav>
          <ul className="flex flex-row justify-center gap-4">
            <li className="lowercase">
              <NavLink className={isActive} to={href('/')}>
                Home
              </NavLink>
            </li>
            <li className="lowercase">
              <NavLink className={isActive} to={href('/about')}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="min-h-[calc(100vh-280px)]">
        <Outlet />
      </main>
      <footer className="text-theme-black flex h-[100px] items-center justify-center gap-[4px]">
        <NavLink className="flex flex-row items-center justify-center gap-[4px]" to={href('/')}>
          <span className="text-theme-black font-logo hover:text-primary font-black">devMint</span>
          <img className="w-[18px]" alt="devMint" src="/favicon.svg" />
        </NavLink>
      </footer>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
