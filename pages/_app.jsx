import Navbar from '../components/Navbar'
import '../styles/globals.css'

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
