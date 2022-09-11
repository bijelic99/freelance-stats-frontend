import Link from 'next/link'
import Search from './Search'
import { useContext } from 'react'
import { UserManagementContext } from '../../contexts/userManagementContext'

export default function Navbar() {
  const { isLoggedIn, user, logout } = useContext(UserManagementContext)

  return (
    <>
      <div className='mx-2 py-4 px-8 flex flex-row justify-between content-center my-1 items-center'>
        <div><Link href='/'><a><h1><b>Freelance</b> stats</h1></a></Link></div>
        {
          isLoggedIn && <>
            <div><Search /></div>
            <div className='flex flex-row gap-x-2'>
              <div className=""><Link href='/dashboard/create'><a>Create dashboard</a></Link></div>
              <div className=""><Link href='/dashboard'><a>Open dashboard</a></Link></div>
              <div className=""><Link href={`/user/${user.id}`}><a>{user.username}</a></Link></div>
              <div className=""><button onClick={logout}>Log out</button></div>
            </div>
          </>
        }
      </div>
      <div className='w-auto border-2 border-black rounded-md mx-2' />
    </>
  )
}