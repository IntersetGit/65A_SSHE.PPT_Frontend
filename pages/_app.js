
import { ConfigProvider } from 'antd'
import Head from 'next/head';
import AppLayout from '../components/Layout'


import { Provider } from 'react-redux';
import { store } from '../redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>PTT SSHE</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"  />
      </Head>
      <ConfigProvider>
        <Provider store={store}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Provider>
      </ConfigProvider>
    </>
  )
}

export default MyApp
