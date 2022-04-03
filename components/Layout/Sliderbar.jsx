import { useState } from "react";
import { Layout , Drawer } from "antd";


const {Sider} = Layout;


const Sliderbar = ({ collapsed , collapsedToggle , children , screen}) => {

  const Settings = {
    width : '210px',
    collapsedWidth : '48px'
  }
  
  const Breakpoint = (b) =>{
    // console.log(b)
  }

  return (
    <>
    {screen.indexes > 2 ?
      <>
        <div style={{ 
        width : collapsed ? Settings.collapsedWidth : Settings.width , 
        maxWidth : collapsed ? Settings.collapsedWidth : Settings.width,
        minWidth : collapsed ? Settings.collapsedWidth : Settings.width,
        overflow : 'hidden' , 
        flex : '0 0 48px' , 
        height : '100%' , 
        transition : 'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s'
      }}>{}</div>
      <Sider
        breakpoint={'lg'}
        collapsed={collapsed}
        collapsible
        onCollapse={collapsedToggle}
        width={Settings.width}
        onBreakpoint={Breakpoint}
        collapsedWidth={Settings.collapsedWidth}
        trigger={null}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          paddingTop: "48px",
        }}
        className="site-layout-background"
      >
        {children}
      </Sider>
      </>

      :
      <Drawer placement="left" 
        width={Settings.width} 
        bodyStyle={{padding : '0px'}} 
        closable={false}  
        onClose={collapsedToggle} 
        visible={!collapsed}
      >
        {children}
      </Drawer>
    }
    </>
  );
}

export default Sliderbar