import '../../styles/AppLayout.module.css'

import { useState , useEffect , useMemo } from 'react';
import { useRouter } from "next/router";
import { Layout } from 'antd';
import Rootmenu from "../../config/menu";

import Sliderbar from './Sliderbar';
import CustomMenu from './CustomMenu';
import CustomHeader from './CustomHeader';
import useBreakpoints from '../../hooks/useBreakpoint';
import LayoutExcluder from '../../utils/LayoutExcluder';
import { ImageLoader } from '../../utils/Utils';

/*
* TODO: ทำตัวเช็ค Authen กับ User_role
* */


const { Content ,Footer } = Layout;

const AppLayout = ({children}) =>{
  const [iscollapsed , setcollapsed]  = useState (false)
  const screen = useBreakpoints()
  const router = useRouter()
  const [currpath,setcurrpath] = useState(router.pathname.split('/')[1])

  /*
  *  This hook for catch if router path name changed
  * */
  useEffect(() =>{
    setcurrpath(router.pathname.split('/')[1])
  },[router.pathname])

  const Menuitems = useMemo(() =>{
    return Rootmenu[currpath]
  } , [currpath])

  /*
    This Hook for catch if Menuitems updated ใช้ สำหรับเช็ค ว่า Login หรือป่าว หรือ Role ผ่านหรือป่าว
  * */
  // useEffect(() =>{
  //   // console.log("Menu items",Menuitems)
  // },[Menuitems])

  const CollapsedToggle = () => {
    setcollapsed(!iscollapsed)
  }

  return (
    <>
    { LayoutExcluder() ? 
        <div className={`basicLayout basicLayout-fix-siderbar screen-${screen}`}>
          <Layout hasSider={screen.indexes > 2 || Menuitems !== undefined}>

            {Menuitems!== undefined&&
                <Sliderbar
                collapsed={iscollapsed}
                collapsedToggle={CollapsedToggle}
                screen={screen}
                >

                <CustomMenu Menuitems={Menuitems}/>

                </Sliderbar>
            }
            
            <div className="ant-layout" style={{ position: "relative" }}>

              <CustomHeader collapsed={iscollapsed} CollapsedToggle={CollapsedToggle} breakpoints={screen} currpath={currpath} />

              <Content
                style={{
                  margin: "24px 16px 0",
                  overflow: "initial",
                }}
              >
                
                <div
                  className="site-layout-background"
                >
                  {children}
                </div>

              </Content>

              <Footer style={{padding : '10px'  , background : 'linear-gradient(to right,#247CB3 0%,#247CB3 80%,#68BE58 100%)' }}>
                <div style={{ color : 'white' , height : '100%' , width : '100%' , display : 'flex' , justifyItems : 'center' , justifyContent : 'space-between' , alignItems : 'center'  }}>
                    <div style={{width : '50%'}}>
                    <img
                        src={ImageLoader(`/assets/white-logo.png`)}
                        width={60}
                        height={30}
                        alt="ptt-logo"
                        style={{marginRight : '2%'}}
                    />
                      บริษัท ปตท. จำกัด (มหาชน)
                    </div>
                    <div>
                      555 ถนนวิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900
                    </div>
                </div>
              </Footer>
            </div>
          </Layout>
        </div>

      :
        <>{children}</>
    }
      
    </>
  );
}

export default AppLayout