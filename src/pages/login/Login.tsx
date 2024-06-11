import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.scss';
import login from '../../common/api/loginApi'

function Login () {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // 检查本地存储中是否存在 token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 模拟验证 token 的过程
      // 这里可以调用一个函数来验证 token 是否有效, 此处简单认为token存在即有效
      // 如果有效，则跳转到主页
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 1000);
    }
  }, [navigate]);

  const onFinish = (values: any) => {
    const { username, password, remember} = values;
    
    // 使用
    login(username, password)
      .then(response => {
        const {code, data, message} = response;
        if(code === 200) {
          messageApi.open({
            type: 'success',
            content: '登录成功!',
            duration: 1,
          });
          if(remember) {
            // 存储用户名和密码
            localStorage.setItem('username', username);
            localStorage.setItem('token', data.token);
          }
          setTimeout(()=>{
            navigate('/home', { replace: true });
          },1000)
        } else {
          messageApi.open({
            type: 'error',
            content: message,
          });
        }
      })
      .catch(error => {
        console.error('登录失败', error);
      });
  };

  return (
    <div className='login-page'>
      {contextHolder}
      <div className="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '用户名不能为空!' }]}
          >
            <Input maxLength={11} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              maxLength={11}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <Button type="link">立即注册!</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;