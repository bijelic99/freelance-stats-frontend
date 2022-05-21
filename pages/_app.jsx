import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar/>
      <main className='mt-2 mx-2'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
