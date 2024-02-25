import Link from 'next/link'
import { login, signup } from './actions'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md">
      <Link
        href="/"
        className="absolute flex items-center px-4 py-2 text-sm no-underline rounded-md left-8 top-8 text-foreground bg-btn-background hover:bg-btn-background-hover group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <form
        className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground"
        action={login}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
        <button className="px-4 py-2 mb-2 bg-green-700 rounded-md text-foreground">
          Login
        </button>
        <button
          formAction={signup}
          className="px-4 py-2 mb-2 border rounded-md border-foreground/20 text-foreground"
        >
          Sign Up
        </button>
        {searchParams?.message && (
          <p className="p-4 mt-4 text-center bg-foreground/10 text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
