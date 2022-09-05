import Navbar from '../components/navbar/Navbar'
import '../styles/globals.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenContext } from '../contexts/tokenContext';
import { UserContext } from '../contexts/userContext';
import RouteGuard from '../components/RouteGuard';
import NoSSR from 'react-no-ssr';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  return (
    <>
      <NoSSR>
        <TokenContext.Provider value={{token, setToken}}>
          <UserContext.Provider value={{user, setUser}}>
            <RouteGuard>
              <Navbar />
              <ToastContainer />
              <main className='mt-2 mx-2'>
                <Component {...pageProps} />
              </main>
            </RouteGuard>
          </UserContext.Provider>
        </TokenContext.Provider>
      </NoSSR>
    </>
  )
}

export default MyApp
