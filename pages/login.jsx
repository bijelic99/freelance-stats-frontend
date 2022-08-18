import Head from 'next/head'
import Link from 'next/link'

export default function Login() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="mt-8 mx-auto lg:w-1/3 border border-black rounded-md shadow-md flex flex-col gap-1 p-2">
        <form className='flex flex-col gap-2'>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" className="border p-1" />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" className="border p-1" />
          <button type="submit" className="border p-1">Login</button>
        </form>
        <Link href="/register">Dont have an account yet</Link>
      </div>
    </>
  )
}
