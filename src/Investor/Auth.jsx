// InvestorRegistrationForm.js
import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Card, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { asyncInvestorLogin, asyncInvestorRegister } from '../store/actions/userAction';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const generateUserId = () => {
  const prefix = 'BHARATBIZZ';
  const randomNumber = crypto.getRandomValues(new Uint32Array(1))[0] % 10000; // Generates a random 4-digit number
  return `${prefix}${randomNumber.toString().padStart(4, '0')}`;
};

export const InvestorRegistrationForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = generateUserId();
    form.setFieldsValue({ userId });
  }, [form]);

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleSubmit = async (values) => {
    try {
      await dispatch(asyncInvestorRegister(values));
      form.resetFields();
      openNotification('success', 'Investor registered successfully');
    } catch (error) {
      openNotification('error', 'Failed to register investor');
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="shadow-lg rounded-lg"
      >
        <Card bordered={false} className="p-5">
          <Title level={2} className="text-center mb-6">
            Investor Registration
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="User ID"
              name="userId"
              rules={[{ required: true, message: 'Please input your User ID!' }]}
            >
              <Input placeholder="Enter your User ID" className="p-2 border rounded" readOnly />
            </Form.Item>

            <Form.Item
              label="Referred By (USER ID)"
              name="referredByUserID"
              rules={[{ required: true, message: 'Please input Referred By (User ID)!' }]}
            >
              <Input placeholder="Enter referred by (User ID)" className="p-2 border rounded"  />
            </Form.Item>
            <Form.Item
              label="Email ID"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
            >
              <Input placeholder="Enter your Email ID" className="p-2 border rounded" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" className="p-2 border rounded" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-4">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};




export const InvestorLoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleSubmit = async (values) => {
    
      await dispatch(asyncInvestorLogin(values,navigate));
      form.resetFields();
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <Card bordered={false} className="bg-transparent">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-gray-800 text-center mb-6"
          >
            User Login
          </motion.h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
          >
            <Form.Item
              label="User ID"
              name="userId"
              rules={[{ required: true, message: 'Please input your User ID!' }]}
            >
              <Input
                placeholder="Enter your User ID"
                className="py-2 px-4 text-sm text-gray-800 rounded-lg border border-gray-300"
                prefix={<UserOutlined className="text-gray-500" />}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              hasFeedback
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-4 text-sm text-gray-800 rounded-lg border border-gray-300"
                prefix={<LockOutlined className="text-gray-500" />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};