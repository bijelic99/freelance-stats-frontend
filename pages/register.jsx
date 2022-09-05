import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import useUserApiService from '../hooks/useUserApiService'

export default function Register() {
  const [submited, setSubmited] = useState(false)
  const [error, setError] = useState()
  const router = useRouter()
  const { checkIfUsernameExists, register } = useUserApiService()

  const onSubmit = useCallback(async (e)=>{
    setSubmited(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    const {repeatPassword, ...newUser} = Object.fromEntries(formData.entries())
    if(repeatPassword !== newUser.password) {
      setError("Passwords dont match")
      setSubmited(false)
      return
    }

    if(await checkIfUsernameExists(newUser.username)) {
      setError("Username taken")
      setSubmited(false)
      return
    }

    return await register(newUser).then(response => {
      if(response?.errors) {
        setError(response.errors[0])
        setSubmited(false)
        return
      }
      else {
        e.target.reset()
        router.push('/login')
      }
    })

    

  }, [setSubmited, setError])

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="mt-8 mx-auto lg:w-1/3 border border-black rounded-md shadow-md flex flex-col gap-1 p-2">
        <form className='flex flex-col gap-2' onSubmit={onSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" className="border p-1" />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" className="border p-1" />
          <label htmlFor="repeatPassword">Repeat password:</label>
          <input type="password" name="repeatPassword" id="repeatPassword" className="border p-1" />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" className="border p-1" />
          <label htmlFor="firstName">First name:</label>
          <input type="text" name="firstName" id="firstName" className="border p-1" />
          <label htmlFor="lastName">Last name:</label>
          <input type="text" name="lastName" id="lastName" className="border p-1" />
          <label htmlFor="birthDate">Birth date:</label>
          <input type="date" name="birthDate" id="birthDate" className="border p-1" />
          <button type="submit" className="border p-1" disabled={submited}>Register</button>
        </form>
        {error && <div className='text-red-800'>{error}</div>}
        <Link href="/login">Already have an account</Link>
      </div>
    </>
  )
}
