// InvestorRegistrationForm.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Card, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { asyncCurrentInvestor, asyncInvestorLogin, asyncInvestorRegister, asyncResetPassword, asyncSendForgetLink, asyncUpdateProfile } from '../store/actions/userAction';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const generateUserId = () => {
  const prefix = 'BBZ';
  const randomNumber = crypto.getRandomValues(new Uint32Array(1))[0] % 10000; // Generates a random 4-digit number
  return `${prefix}${randomNumber.toString().padStart(6, '0')}`;
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await dispatch(asyncInvestorLogin(values, navigate));
      form.resetFields();
      openNotification('success', 'Login successful!');
    } catch (error) {
      openNotification('error', 'Login failed! Please try again.');
    } finally {
      setLoading(false);
    }
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
            <div className="flex justify-end mb-4">
              <Link to="/forget-password" className="text-blue-600 hover:underline text-sm">
                Forget Password?
              </Link>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};


export const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
          await dispatch(asyncSendForgetLink({ email }));
      } catch (err) {
          setError('Error sending reset link. Please try again.');
      } finally {
          setLoading(false);
      }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
                  <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-semibold mb-1">Email Address</label>
                          <input
                              type="email"
                              id="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                              required
                          />
                      </div>
                      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                      <button
                          type="submit"
                          className={`w-full bg-blue-500 text-white px-4 py-2 rounded focus:outline-none ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
                              } transition duration-200`}
                          disabled={loading}
                      >
                          {loading ? 'Submitting...' : 'Submit'}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
};


export const ResetPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleResetPassword = async (e) => {
      e.preventDefault();
      if (password.length < 8) {
          toast.error('Password must be at least 8 characters long.');
          return;
      }

      setLoading(true);
      try {
          await dispatch(asyncResetPassword(id, password));
          setLoading(false);
          setPassword(''); // Clear the input field
      } catch (error) {
          setLoading(false);
      }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
              <h2 className="text-3xl font-semibold mb-4 text-center text-gray-900">Reset Password</h2>

              <form onSubmit={handleResetPassword}>
                  <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          New Password:
                      </label>
                      <input
                          type="password"
                          id="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          value={password}
                          placeholder='Minimum 8 characters'
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>

                  <button
                      type="submit"
                      className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                  >
                      {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
              </form>
          </div>
      </div>
  );
};


export const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (isAuth) {
      dispatch(asyncCurrentInvestor(user._id));
    }
  }, [dispatch, isAuth, user._id]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        userId: user.userId,
        referredByUserID: user.referredByUserID,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        location: user.location,
      });
    }
  }, [user, form]);

  const handleUpdateProfile = async (values) => {
    try {
      await dispatch(asyncUpdateProfile(user._id, values));
  
    } catch (error) {
    console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="mt-[100px] w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          className="space-y-4"
        >
          <Form.Item
            label="User ID"
            name="userId"
            rules={[{ required: true, message: 'Please input your User ID!' }]}
          >
            <Input placeholder="Enter your User ID" disabled />
          </Form.Item>
          <Form.Item
            label="Referred By User ID"
            name="referredByUserID"
          >
            <Input placeholder="Enter referred by User ID" disabled />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Enter your email" type="email" />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
          >
            <Input placeholder="Enter your location" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};




