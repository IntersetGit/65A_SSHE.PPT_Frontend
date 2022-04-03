
import { ConfigProvider } from 'antd'
import Head from 'next/head';
import AppLayout from '../components/Layout'
import { ThemeContext } from "../components/Themeswitch";
import _localStorage from "../utils/BrowserLocalstorage";
import Config from "../config";
import Theme from "../components/Themeswitch/Theme";

import { Provider } from 'react-redux';
import { store } from '../redux/store'

const GetthemeColor = () =>{
    if (!_localStorage.get('theme')) _localStorage.set('theme',Config.DEFAULT_THEME)
    return _localStorage.get('theme')
}

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
            <ThemeContext.Provider value={GetthemeColor()}>
                <Theme/>
                  <AppLayout>
                    <Component {...pageProps} />
                  </AppLayout>
            </ThemeContext.Provider>
        </Provider>
      </ConfigProvider>
    </>
  )
}

export default MyApp
