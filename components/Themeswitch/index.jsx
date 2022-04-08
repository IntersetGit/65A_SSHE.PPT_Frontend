import { createContext , useContext , useEffect , useState } from "react";
import changeTheme from "next-dynamic-antd-theme";
import { Switch } from 'antd';
import _localStorage from "../../utils/BrowserLocalstorage";

export const ThemeContext = createContext()

const ThemeSwitch = () =>{
    const Themeval = useContext(ThemeContext)
    const [theme , setTheme] = useState('default')

    useEffect(() =>{
        setTheme(Themeval)
    },[Themeval])

    const Changetheme = () =>{
        if (theme === 'default') {
            setTheme('dark')
            changeTheme('dark')
            _localStorage.set('theme' , 'dark')
        }else{
            setTheme('default')
            changeTheme('default')
            _localStorage.set('theme' , 'default')
        }
    }


    return(
        <Switch size={'small'} checked={theme !== 'dark'} style={{ marginTop :  '-1.3rem'}} onClick={Changetheme} checkedChildren="🌞" unCheckedChildren="🌙" />
    )
}

export default ThemeSwitch