import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const CustomMenu = () => {
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0, fontSize: "0.8rem" }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          จัดการผู้ใช้ระบบ
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          จัดการข้อมูลบริษัทผู้รับเหมา
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          จัดการข้อมูลผู้ใช้นอก AD
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          จัดการข้อมูลโครงการ
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />}>
          จัดการข้อมูลกิจกรรม
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Test Dropdown Menu">
          <Menu.Item key="6">option1</Menu.Item>
          <Menu.Item key="7">option2</Menu.Item>
          <Menu.Item key="8">option3</Menu.Item>
          <Menu.Item key="9">option4</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}

export default CustomMenu