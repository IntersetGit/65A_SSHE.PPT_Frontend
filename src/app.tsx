import type { Settings as LayoutSettings } from '@ant-design/pro-layout'; //SettingDrawer, BasicLayoutProps
import PageLoading from '@ant-design/pro-layout';
import { isJwtExpired } from 'jwt-check-expiration';
import jwtDecode from 'jwt-decode';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { history, request as requestUmi, RequestConfig } from 'umi';
import type {
  RequestInterceptor,
  RequestOptionsInit,
  ResponseError,
} from 'umi-request';
import Requests from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import JWTCLASS from './jwt';

const JWT = new JWTCLASS();
const __DEV__ = process.env.NODE_ENV === 'development';
const loginPath = '/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  userInfo?: APITypes.UserInfo;
  loading?: boolean;
  getUserInfo?: () => Promise<APITypes.UserInfo | undefined>;
}> {
  const getUserInfo = async (): Promise<APITypes.UserInfo | undefined> => {
    try {
      const _token = JWT.getAccess();
      if (_token) {
        const {
          token,
        }: Partial<{ token: APITypes.UserInfo; exp: number; iat: number }> =
          jwtDecode(_token);
        return token;
      }
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  if (history.location.pathname !== loginPath) {
    const userInfo: APITypes.UserInfo | undefined = await getUserInfo();
    return {
      userInfo,
      getUserInfo,
      settings: defaultSettings,
    };
  }

  return {
    getUserInfo,
    settings: defaultSettings,
  };
}

//** ===== API CONFIGURATION ===== **/

namespace API {
  export interface LoginResult {
    items: Partial<{ access: string; refresh: string }>;
  }
}

const errorHandler = (error: ResponseError) => {
  console.log('HTTP ERROR', error);
};

const requestInterceptor: RequestInterceptor = (url, options) => {
  return {
    url,
    options: merge(cloneDeep(options), {
      headers: { Authorization: `Bearer ${JWT.getAccess()}` },
    }),
  };
};

const { cancel } = Requests.CancelToken.source();
let refreshTokenRequest: Promise<API.LoginResult> | null = null;

const responseInterceptor = async (
  response: Response,
  options: RequestOptionsInit,
) => {
  const accessTokenExpired = response.status == 401 || 403;
  // if(JWT.getAccess()) {
  //   console.log(isJwtExpired(JWT.getAccess()))
  // }
  if (isJwtExpired(JWT.getAccess())) {
    try {
      if (!refreshTokenRequest) {
        refreshTokenRequest = JWT.refreshAccessToken(JWT.getRefresh());
      }
      const res = await refreshTokenRequest;
      if (!res) throw new Error();
      if (res.items.access) JWT.setAccess(res.items.access);
      if (res.items.refresh) JWT.setRefresh(res.items.refresh);
      return requestUmi(
        response.url,
        merge(cloneDeep(options), {
          headers: { Authorization: `Bearer ${res.items.access}` },
        }),
      );
    } catch (err) {
      JWT.removeAllJWT();
      cancel('Session time out.');
      throw err;
    } finally {
      refreshTokenRequest = null;
    }
  }

  return response;
};

const API_PATH = {
  DEVELOPMENT: 'http://localhost:8000/api/',
  PRODUCTION: 'https://sshe.hrconnext.co/api/',
};

export const request: RequestConfig = {
  prefix: __DEV__ ? API_PATH.DEVELOPMENT : API_PATH.PRODUCTION,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler,
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
};

/* ===================================== */

// Comment เพราะ ไม่ได้ใช้ Build-in Layout
// export const layout : RunTimeLayoutConfig = ({initialState , setInitialState}) =>{
//   console.log(initialState?.settings)
//   return {
//     rightContentRender: () => (<> TEST </>),
//     footerRender: () => (<> TEST </>),
//     menuDataRender : undefined,
//     ...initialState?.settings,
//     childrenRender(children, props) {
//         if(initialState?.loading) return <PageLoading/>
//         return (
//           <>
//             <ConfigProvider locale={enUS}>
//               {children}
//               <SettingDrawer
//                 disableUrlParams
//                 enableDarkTheme
//                 settings={initialState?.settings}
//                 onSettingChange={(settings) => {
//                   setInitialState((preInitialState) => ({
//                     ...preInitialState,
//                     settings,
//                   }));
//                 }}
//               />
//             </ConfigProvider>
//           </>
//         )
//     },
//   }
// }

// const layout = ({children}: { children: ReactChild}) => <><ConfigProvider locale={enUS}> {children} </ConfigProvider></>;
// export default layout
