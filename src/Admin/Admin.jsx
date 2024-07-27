import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Row, Col, Typography, Divider, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncAdminLogin, asyncAdminRegister } from '../store/actions/adminAction';

const { Title, Text } = Typography;

export const AdminRegistrationForm = () => {
    const [form] = Form.useForm();
    const [isAdmin, setIsAdmin] = useState(true);
    const dispatch = useDispatch(); // Call useDispatch at the top
  
    const handleSubmit = async(values) => {
      console.log('Registration form submitted:', { ...values, isAdmin });
      // Now you can use dispatch to send actions
       await dispatch(asyncAdminRegister({ ...values, isAdmin }));
    };
  
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Registration Form</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ isAdmin }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="Enter your username" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  hasFeedback
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item name="isAdmin" valuePropName="checked">
                  <Checkbox onChange={(e) => setIsAdmin(e.target.checked)}>Is Admin</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ marginTop: '16px' }}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };

export const AdminLoginForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const handleSubmit = async(values) => {
      console.log('Login form submitted:', values);
      await dispatch(asyncAdminLogin({...values},navigate))
    };
  
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Login Form</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  hasFeedback
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ marginTop: '16px' }}>
                Log In
              </Button>
            </Form.Item>
            <Row justify="space-between">
              <Col>
                <Link to="/admin/forgetpassword">Forgot password?</Link>
              </Col>
              <Col>
                <Text>Don't have an account? <Link to="/admin/registration">Register here</Link></Text>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  };
