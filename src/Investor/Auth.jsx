// InvestorRegistrationForm.js
import React from 'react';
import { Form, Input, Button, Typography, Card, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { asyncInvestorRegister } from '../store/actions/userAction';

const { Title } = Typography;

export const InvestorRegistrationForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleSubmit = async(values) => {
    await dispatch(asyncInvestorRegister(values))
    
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
              <Input placeholder="Enter your User ID" className="p-2 border rounded" />
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



// export const InvestorLoginForm = () => {
//   const [form] = Form.useForm();
//   const dispatch = useDispatch();

//   const openNotification = (type, message) => {
//     notification[type]({
//       message,
//       placement: 'topRight',
//       duration: 3,
//     });
//   };

//   const handleSubmit = (values) => {
//     dispatch(asyncUserLogin(values))
//       .then(() => {
//         form.resetFields();
//         openNotification('success', 'Login successful');
//       })
//       .catch(() => {
//         openNotification('error', 'Failed to login');
//       });
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
//         <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
//           User Login
//         </Title>
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//         >
//           <Form.Item
//             label="User ID"
//             name="userId"
//             rules={[{ required: true, message: 'Please input your User ID!' }]}
//           >
//             <Input placeholder="Enter your User ID" />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//             hasFeedback
//           >
//             <Input.Password placeholder="Enter your password" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };


