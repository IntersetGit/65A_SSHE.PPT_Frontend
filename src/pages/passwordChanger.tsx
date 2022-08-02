import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { useState } from 'react';

const PassWordChanger = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState<{
    isError: boolean;
    message: string;
  }>({ isError: false, message: '' });

  const onFinish = (values: { password: string; confirmpassword: string }) => {
    const regexPattern =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;

    setLoading(true);

    if (regexPattern.test(values.password)) {
      if (values.password === values.confirmpassword) {
        setIsPasswordMismatch({ isError: false, message: '' });
      } else {
        setIsPasswordMismatch({ isError: true, message: 'Password Mismatch' });
      }
    } else {
      setIsPasswordMismatch({
        isError: true,
        message: 'คุณตั้งรหัสผ่านใหม่ไม่ตรงตามเงื่อนไข',
      });
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
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
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '1px 17px 57px 0px rgba(0,0,0,0.75)',
            padding: '20px',
          }}
        >
          <Col style={{ padding: '5% 0 5% 0' }}>
            <img width="40%" src={'/assets/images/logo_PTT.png'} />
          </Col>
          {isPasswordMismatch.isError && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                justifyItems: 'center',
                width: '100%',
                backgroundColor: 'red',
                color: '#fff',
                padding: '5px',
                fontSize: '1.1rem',
                borderRadius: '10px',
              }}
            >
              {isPasswordMismatch.message}
            </div>
          )}
          <h3 style={{ fontWeight: 'bold' }}>First time change Password</h3>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              name="password"
              label="Password"
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
              />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Please confirm your password!' },
              ]}
              name="confirmpassword"
              label="Confirm Password"
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                }}
                type="primary"
                htmlType="submit"
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default PassWordChanger;
