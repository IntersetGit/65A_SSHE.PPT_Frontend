import type { Settings as LayoutSettings  } from "@ant-design/pro-layout"; //SettingDrawer, BasicLayoutProps
import PageLoading from "@ant-design/pro-layout";
import defaultSettings from "../config/defaultSettings";
// import type { RunTimeLayoutConfig } from "umi";
// import { ConfigProvider } from "antd";
// import enUS from 'antd/lib/locale/en_US';
// import type { ReactChild } from "react";




export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
}> {
  return {
    settings : defaultSettings
  }
}

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