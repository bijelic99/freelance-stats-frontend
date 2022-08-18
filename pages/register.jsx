import Head from 'next/head'
import Link from 'next/link'

export default function Register() {
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
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" className="border p-1" />
          <label htmlFor="firstName">First name:</label>
          <input type="text" name="firstName" id="firstName" className="border p-1" />
          <label htmlFor="lastName">Last name:</label>
          <input type="text" name="lastName" id="lastName" className="border p-1" />
          <label htmlFor="birthDate">Birth date:</label>
          <input type="date" name="birthDate" id="birthDate" className="border p-1" />
          <button type="submit" className="border p-1">Register</button>
        </form>
        <Link href="/login">Already have an account</Link>
      </div>
    </>
  )
}
