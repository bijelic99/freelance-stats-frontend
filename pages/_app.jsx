import Navbar from '../components/navbar/Navbar'
import '../styles/globals.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserManagementContext } from '../contexts/userManagementContext';
import RouteGuard from '../components/RouteGuard';
import NoSSR from 'react-no-ssr';
import { createContext, useState } from 'react';
import useUser from '../hooks/useUser';

function MyApp({ Component, pageProps }) {
  const userManagementObj = useUser()

  return (
    <>
      <NoSSR>
        <UserManagementContext.Provider value={userManagementObj}>
          <Navbar />
          <ToastContainer />
          <main className='mt-2 mx-2'>
            <Component {...pageProps} />
          </main>
        </UserManagementContext.Provider>
      </NoSSR>
    </>
  )
}

export default MyApp
