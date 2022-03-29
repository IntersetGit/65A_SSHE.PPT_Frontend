import '../../styles/AppLayout.module.css'

import { useState , useEffect } from 'react';
import { Layout } from 'antd';
import { UserOutlined , MenuFoldOutlined , MenuUnfoldOutlined} from '@ant-design/icons';

import Sliderbar from './Sliderbar';
import CustomMenu from './CustomMenu';
import CustomHeader from './CustomHeader';
import useBreakpoints from '../../hooks/useBreakpoint';



const { Content ,Footer } = Layout;

const AppLayout = ({children}) =>{
  const [iscollapsed , setcollapsed]  = useState (false)

  const screen = useBreakpoints()

  const CollapsedToggle = () => {
    setcollapsed(!iscollapsed)
  }

  return (
    <>
      <div className={`basicLayout basicLayout-fix-siderbar screen-${screen}`}>
        <Layout hasSider={screen.indexes > 2}>

            <Sliderbar
              collapsed={iscollapsed}
              collapsedToggle={CollapsedToggle}
              screen={screen}
            >

              <CustomMenu/>

            </Sliderbar>
          
          <div className="ant-layout" style={{ position: "relative" }}>

            <CustomHeader collapsed={iscollapsed} CollapsedToggle={CollapsedToggle}/>

            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
              }}
            >
              
              <div
                className="site-layout-background"
                style={{ textAlign: "center" }}
              >
                {children}
              </div>

            </Content>

            <Footer style={{ textAlign: "center" }}>PTT-SSHE Application @ 2022</Footer>
          </div>
        </Layout>
      </div>
    </>
  );
}

export default AppLayout