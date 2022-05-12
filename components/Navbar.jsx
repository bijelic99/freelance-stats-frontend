import Head from 'next/head'
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
        <div className='mx-2 py-4 px-8 flex flex-row justify-between content-center my-1'>
            <div><Link href='/'><a><h1><b>Freelance</b> stats</h1></a></Link></div>
            <div><input className='w-96 border-2 border-black rounded-md px-2 py-1' type={'text'}/></div>
            <div className='flex flex-row gap-x-2'>
                <div className=""><Link href='/dashboard/create'><a>Create dashboard</a></Link></div>
                <div className=""><Link href='/dashboard'><a>Open dashboard</a></Link></div>
                <div className=""><Link href='/user'><a>User</a></Link></div>
            </div>
        </div>
        <div className='w-auto border-2 border-black rounded-md mx-2'/>
    </>
  )
}