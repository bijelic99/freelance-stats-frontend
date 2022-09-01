import Navbar from '../components/navbar/Navbar'
import '../styles/globals.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenContext } from '../contexts/tokenContext';
import { UserContext } from '../contexts/userContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <TokenContext.Provider>
        <UserContext.Provider>
          <Navbar />
          <ToastContainer />
          <main className='mt-2 mx-2'>
            <Component {...pageProps} />
          </main>
        </UserContext.Provider>
      </TokenContext.Provider>
    </>
  )
}

export default MyApp
