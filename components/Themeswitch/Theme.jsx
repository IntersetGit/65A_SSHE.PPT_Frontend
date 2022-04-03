import {useContext, useEffect} from "react";
import {ThemeContext} from "./index";
import changeTheme from "next-dynamic-antd-theme";


const Theme = () =>{
    const Themeval = useContext(ThemeContext)

    useEffect(() =>{
        changeTheme(Themeval)
    },[Themeval])

    return (<></>)
}

export default Theme