import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useUserApiService } from '../hooks/useUserApiService'

export default function Login() {
  const [submited, setSubmited] = useState(false)
  const [error, setError] = useState()
  const router = useRouter()
  const { login } = useUserApiService()

  const onSubmit = useCallback(async (e) => {
    setSubmited(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    const credentials = Object.fromEntries(formData.entries())

    return await login(credentials).then(user => {
      e.target.reset()
      router.push('/')
      setSubmited(false)
    })
      .catch(err => {
        setSubmited(false)
        setError("Wrong credentials")
      })

  }, [setSubmited, setError])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="mt-8 mx-auto lg:w-1/3 border border-black rounded-md shadow-md flex flex-col gap-1 p-2">
        <form className='flex flex-col gap-2' onSubmit={onSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" className="border p-1" />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" className="border p-1" />
          <button type="submit" className="border p-1" disabled={submited}>Login</button>
        </form>
        {error && <div className='text-red-800'>{error}</div>}
        <Link href="/register">Dont have an account yet</Link>
      </div>
    </>
  )
}
