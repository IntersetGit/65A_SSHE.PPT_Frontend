import JWTCLASS from '@/jwt';
import { EditOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { useState } from 'react';
import { history, request, useModel } from 'umi';
import './index.less';

const JWT = new JWTCLASS();

const Login = () => {
  const [form] = Form.useForm();
  const [forgotpasswordform] = Form.useForm();
  const [isBlock, setisBlock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggleForgotPassword, setForgotPassWord] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.getUserInfo?.();
    console.log(userInfo);
    if (userInfo) {
      await setInitialState((s) => ({ ...s, userInfo: userInfo }));
    }
  };

  const handleCloseForgotPassword = () => {
    setForgotPassWord(!toggleForgotPassword);
  };

  const handleFinish = async () => {
    await forgotpasswordform.validateFields().then(async (values) => {
      console.log(values);
    });
  };

  const onFinish = async (values) => {
    request('provider/login', { method: 'post', data: values })
      .then(async (res) => {
        console.log(res);
        if (res.status_code === 200) {
          JWT.setAccess(res.items.access_token);
          JWT.setRefresh(res.items.refresh_token);

          await fetchUserInfo();

          if (!history) return;
          const { query } = history.location;
          const { redirect } = query;

          history.push(redirect || '/');

          return;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div>
      <img
        src={'/assets/20201209_103528_0353.png'}
        style={{
          height: '100vh',
          width: '100%',
          objectFit: 'cover',
          position: 'absolute',
          zIndex: '-1',
        }}
      />

      <Row>
        <Col
          xs={24}
          sm={14}
          md={14}
          lg={14}
          xl={7}
          style={{
            padding: '3%',
            backgroundColor: 'white',
            marginTop: '10%',
            left: '5%',
            borderRadius: '10px',
          }}
        >
          <div style={{ float: 'right' }}>{/* <ThemeSwitch/> */}</div>
          <Col style={{ padding: '0 0 15%' }}>
            <img width="40%" src={'/assets/images/logo_PTT.png'} />
          </Col>
          <h2>
            <b>Sign in</b>
          </h2>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            style={{ width: '100%' }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username !',
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
                  message: 'Please input your Password!',
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
                <Checkbox disabled={isBlock || loading}>Remember me</Checkbox>
              </Form.Item>
              <Button
                style={{ float: 'right' }}
                type="link"
                onClick={handleCloseForgotPassword}
              >
                Forgot Password
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}
                loading={loading}
                disabled={isBlock || loading}
              >
                Log in
              </Button>
            </Form.Item>
            {/* <Button
              type="default"
              className="login-form-button"
              style={{ width: '100%' }}
              onClick={Bypasser}
              loading={loading}
              disabled={isBlock || loading}
            >
              Bypass (ป้องกัน API ล่มในขณะทดลองเข้า)
            </Button> */}

            {/* {isBlock ? <h5 className="text-center text-red">ไม่สามารถใช้งานได้ถึง {dateText}</h5> : null}
              {loading ? <h5 className="text-center text-red">กำลังโหลดข้อมูล{pointLoading}</h5> : null} */}
          </Form>
        </Col>
        <Modal
          visible={toggleForgotPassword}
          centered
          closable={false}
          className="modal-border-radius"
          footer={[
            <Button key="back" onClick={handleCloseForgotPassword}>
              ยกเลิก
            </Button>,
            <Button
              type="primary"
              key="submit"
              loading={false}
              onClick={handleFinish}
            >
              ลืมรหัสผ่าน
            </Button>,
          ]}
        >
          <p>
            <EditOutlined /> Forgot Password
          </p>

          <Form form={forgotpasswordform}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email !',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default Login;
