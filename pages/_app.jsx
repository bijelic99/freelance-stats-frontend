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
import useChartMetadata from '../hooks/useChartMetadata';
import useSources from '../hooks/useSources';
import { ChartMetadataContext } from '../contexts/chartMetadataContext';
import { SourcesContext } from '../contexts/sourcesContext';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <NoSSR>
        <UserManagementContext.Provider value={useUser()}>
          <Navbar />
          <ToastContainer />
          <main className='mt-2 mx-2'>
            <ChartMetadataContext.Provider value={useChartMetadata()}>
              <SourcesContext.Provider value={useSources()}>
                <Component {...pageProps} />
              </SourcesContext.Provider>
            </ChartMetadataContext.Provider>
          </main>
        </UserManagementContext.Provider>
      </NoSSR>
    </>
  )
}

export default MyApp
