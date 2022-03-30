import { Layout , Divider , Dropdown , Menu , Space , Tooltip} from 'antd'
import { MenuFoldOutlined , MenuUnfoldOutlined , DownOutlined , UserOutlined , SettingOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import _localStorage from '../../utils/BrowserLocalstorage';

const { Header } = Layout

const CustomHeader = ({CollapsedToggle , collapsed}) => {
  const router = useRouter()


  const Logout = () => {
    _localStorage.remove('token')
    router.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        แก้ไขข้อมูลส่วนตัว
      </Menu.Item>
      <Menu.Item onClick={Logout} key="1">
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          height: "48px",
          lineHeight: "48px",
          background: "transparent",
        }}
      />
      <Header
        className="headers__drop__shadow"
        style={{
          padding: "0px",
          height: "48px",
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
            src="/assets/images/PTT Public Company Limited.svg"
            width={120}
            height={60}
            alt="ptt-logo"
          />
          <span
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            PTT SSHE Application
          </span>
          <Divider type="vertical" />
          <span
            onClick={CollapsedToggle}
            style={{ color: "white", fontSize: "1.2rem", paddingLeft: "0px" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>

        {/* Right Navbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
            marginRight : '1.5%' , 
            color : 'white' ,
            fontSize : '1.1rem',
            marginTop :  '1.1rem'
          }}
        > 
          <Space direction='horizontal'>
            <Tooltip title="Backoffice">
              <p style={{ cursor : 'pointer' }}><SettingOutlined /></p>
            </Tooltip>
            <Dropdown  overlay={menu} trigger={['click']}>
                <p style={{ textAlign : 'center' , cursor : 'pointer'}} onClick={e => e.preventDefault()}>
                  <UserOutlined/> Administrator <DownOutlined />
                </p>
            </Dropdown>
          </Space>
        </div>
    
      </Header>
    </>
  );
}

export default CustomHeader