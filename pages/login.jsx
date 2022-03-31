import { useState } from "react";
import Head from "next/head";
import { Row, Col, Input, Button, Form, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import _localStorage from "../utils/BrowserLocalstorage";
import { ImageLoader } from "../utils/Utils";
import changeTheme from 'next-dynamic-antd-theme';


const Login = () =>{

  const [form] = Form.useForm();
  const router = useRouter()
  const [isBlock, setisBlock] = useState(false)
  const [loading, setLoading] = useState(false)



  const onFinish = (value) =>{
    console.log(value)
    _localStorage.set('token' ,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV29uZ3NhdGhvcm4iLCJyb2xlX2lkIjoiMiIsImlhdCI6MTUxNjIzOTAyMn0.vDapJQsDXne2Hi1z9ZxUBbsgVMepo6JDR9zyo1LCZRQ')
    router.push('/backoffice/contractor_company_mange')
  }

  return(
    <div className="">
      <Head>
        <title>เข้าสู่ระบบ</title>
      </Head>
      <Row>
        <Col xs={0} sm={10} mg={10} lg={10} xl={15} >
          <img src={ImageLoader("/assets/images/photo_2022-03-24_13-01-06.jpg")} style={{ height: "100vh", width: '100%', objectFit: 'cover' }} />
        </Col>
        <Col xs={24} sm={14} mg={14} lg={14} xl={9} style={{ padding: '5%', marginTop: "-2%", }}>
          <Col style={{ padding: '0 0 15%' }}>
            <img width="50%" src={ImageLoader("/assets/images/logo_PTT.png")}  />
          </Col>
          <h2><b>Sign in</b></h2>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            style={{ width: "100%" }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username !",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                disabled={isBlock || loading}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                disabled={isBlock || loading}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox loading={loading} disabled={isBlock || loading}>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
                loading={loading} disabled={isBlock || loading}
              >
                Log in
              </Button>
            </Form.Item>

            {isBlock ? <h5 className="text-center text-red">ไม่สามารถใช้งานได้ถึง {dateText}</h5> : null}
            {loading ? <h5 className="text-center text-red">กำลังโหลดข้อมูล{pointLoading}</h5> : null}
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login