import { Layout , Divider , Dropdown , Menu , Space , Tooltip , Typography} from 'antd'
import { MenuFoldOutlined , MenuUnfoldOutlined , DownOutlined , UserOutlined , SettingOutlined , FileSearchOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import _localStorage from '../../utils/BrowserLocalstorage';
import { ImageLoader } from "../../utils/Utils";
import Themeswitch from "../Themeswitch";
import Config from "../../config";
import Rootmenu from "../../config/menu";
import { useDispatch , useSelector } from 'react-redux';
import { handleLogout } from '../../redux/reducers/authenticate';

const { Text, Link } = Typography;

const { Header } = Layout

const CustomHeader = ({CollapsedToggle , collapsed , currpath , breakpoints}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userData = useSelector(({auth}) => auth.userData)
  
  const Logout = () => {

    _localStorage.remove('token')
    _localStorage.remove('refresh_token')

    //** Clear userData redux */
    dispatch(handleLogout())

    router.push(Config.NO_AUTH_PAGE)
  }

  const ToggleSideRedirect = (mode) =>{
      router.push(Rootmenu[mode].redirectPage)
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Themeswitch/>
      </Menu.Item>
      <Menu.Item key="1">
        แก้ไขข้อมูลส่วนตัว
      </Menu.Item>
      <Menu.Item onClick={Logout} key="2">
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          height: "60px",
          lineHeight: "48px",
          background: "transparent",
        }}
      />
      <Header
        className="headers__drop__shadow"
        style={{
          padding: "0px",
          height: "60px",
          lineHeight: "48px",
          width: "100%",
          zIndex: "100",
          right: "0px",
          position: "fixed",
          top: "0",
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <img
            src={ImageLoader("/assets/images/PTT Public Company Limited.svg")}
            width={120}
            height={60}
            alt="ptt-logo"
          />
            {breakpoints.indexes > 2 &&
                <div style={{ display : 'flex' , flexDirection : 'column'}}>
                  <Text
                    style={{
                        margin : 0,
                        fontWeight: "bolder",
                        fontSize: "1.2rem",
                    }}
                  > 
                  <span style={{ color : '#7CFC00' , marginRight : '3px'}}>SSHE</span>
                  <span style={{ color : 'white' , fontStyle : 'italic'}}>AI</span>
                  </Text>
                </div>
            }

          <Divider style={{color : "white" }} type="vertical" />
          <Text
            onClick={CollapsedToggle}
            style={{ fontSize: "1.2rem", paddingLeft: "0px" , color : 'white' }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Text>
        </div>

        {/* Right Navbar */}
        <div
          style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
              marginRight : '1.5%' ,
              fontSize : '0.95rem',
              marginTop : '1.1rem',
              color : 'white',
              fontWeight : 'bold'
          }}
        > 
          <Space direction='horizontal'>
                <Tooltip title={'Frontoffice'}>
                  <p onClick={() => ToggleSideRedirect('Frontoffice')} style={{ cursor : 'pointer' }}> <img src={ImageLoader(`/assets/sshe.png`)} width={40} height={40} alt="ptt-logo"/> </p>
                </Tooltip>

              <Tooltip title={'Backoffice'}>
                  <p onClick={() => ToggleSideRedirect('Backoffice')} style={{ cursor : 'pointer' }}> <img src={ImageLoader(`/assets/backoffice.png`)} width={40} height={40} alt="ptt-logo"/> </p>
              </Tooltip>

              <Tooltip title={'คู่มือ'}>
                  <p onClick={() => ToggleSideRedirect('Backoffice')} style={{ cursor : 'pointer' }}> <img src={ImageLoader(`/assets/manual.png`)} width={40} height={40} alt="ptt-logo"/> </p>
              </Tooltip>

            <Dropdown  overlay={menu} trigger={['click']}>
                <p style={{ textAlign : 'center' , cursor : 'pointer'}} onClick={e => e.preventDefault()}>
                  <UserOutlined/> {userData.e_mail} <DownOutlined />
                </p>
            </Dropdown>
          </Space>
        </div>
    
      </Header>
    </>
  );
}

export default CustomHeader