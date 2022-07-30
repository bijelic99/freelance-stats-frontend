import Navbar from '../components/navbar/Navbar'
import '../styles/globals.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar/>
      <ToastContainer/>
      <main className='mt-2 mx-2'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
