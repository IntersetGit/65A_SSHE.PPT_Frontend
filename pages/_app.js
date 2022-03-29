
import { ConfigProvider } from 'antd'
import Head from 'next/head';
import AppLayout from '../components/Layout'
// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"  />
      </Head>
      <ConfigProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ConfigProvider>
    </>
  )
}

export default MyApp
