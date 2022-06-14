import type { BasicLayoutProps } from "@ant-design/pro-layout"
import React from "react"


export interface HeaderTitlePropsType {
  logo?: string,
  title?: string,
  props?: BasicLayoutProps
}


const HeaderTitle: React.FC<HeaderTitlePropsType> = (props) =>{
  return (
    <>
      <div style={{
        display : 'flex'
      }}>
        <img src={props?.props?.logo?.toString()} alt={'logo'} width={120} height={60}/>
        <div style={{
          fontSize : '1.3rem',
          fontWeight : 'bolder',
          width : '100px'
        }}>
          <span style={{ color : '#7CFC00' , marginRight : '3px' }}>SSHE</span>
          <span style={{ color : 'white' , fontStyle : 'italic' , marginRight : '3px' }}>AI</span>
        </div>
      </div>
    </>
  )
}

export default HeaderTitle