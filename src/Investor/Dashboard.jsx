import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, message, Pagination } from 'antd';
import { motion } from 'framer-motion';
import { ArrowUpOutlined, HistoryOutlined, MoneyCollectOutlined, TeamOutlined,ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { asyncInvestorDeposit,asyncFetchHistory } from '../store/actions/userAction';
import { Table, Spin, Alert } from 'antd'; // Import Ant Design components

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  }),
};

const hoverVariants = {
  initial: { scale: 1, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', rotate: 0 },
  hover: { 
    scale: 1.1, 
    boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.25)', 
    rotate: 3,
    transition: { 
      duration: 0.4,
      ease: 'easeOut'
    }
  },
};

export const InvestorDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const cards = [
    { title: 'Deposit', icon: <ArrowUpOutlined />, description: 'Add funds to your account', path: '/deposit' },
    { title: 'View History', icon: <HistoryOutlined />, description: 'Check your transaction history', path: '/view-history' },
    { title: 'Request Withdrawal', icon: <MoneyCollectOutlined />, description: 'Request to withdraw funds', path: '/withdraw' },
    { title: 'Your Team Members', icon: <TeamOutlined />, description: 'View and manage your team', path: '/team' },
    { title: 'More Options', icon: <TeamOutlined />, description: 'Explore additional options', path: '/more' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover="hover"
            className="bg-white p-4 rounded-lg flex flex-col items-center text-center cursor-pointer"
            onClick={() => handleCardClick(card.path)}
          >
            <Card bordered={false} className="w-full h-full flex flex-col items-center">
              <motion.div
                className="text-3xl mb-3 text-indigo-600"
                variants={hoverVariants}
              >
                {card.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-1 text-gray-800">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600">
                {card.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};



  
const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 150,
        damping: 20,
      },
    },
  };
  
  export const Deposit = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const onFinish = async(amount) => {
      setLoading(true);
      await dispatch(asyncInvestorDeposit(amount,user?.userId))
      setTimeout(() => {
        setLoading(false);
        message.success(`Deposit of Rs ${amount.amount} was successful!`);
        form.resetFields();
      }, 2000);
    };
  
    const handleBackClick = () => {
      navigate(-1); // Navigate back to the previous page
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="mb-4 flex justify-between items-center">
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              Back
            </Button>
            <h2 className="text-2xl font-semibold text-center text-gray-800">Deposit Money</h2>
          </div>
          <Form
            form={form}
            name="deposit"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="amount"
              label="Deposit Amount"
              rules={[
                { required: true, message: 'Please enter an amount' },
                { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter a valid amount' },
              ]}
            >
              <Input prefix="Rs" placeholder="Enter amount" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block size="large">
                Deposit
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </div>
    );
  };
  


  export const ViewHistory = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { history, loading, error, pagination } = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (user) {
            dispatch(asyncFetchHistory(user.userId, currentPage, pageSize));
        }
    }, [dispatch, user, currentPage, pageSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => {
                const date = new Date(text);
                return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error.message} type="error" />;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Transaction History</h1>
            <Table
                dataSource={history}
                columns={columns}
                rowKey="_id"
                pagination={false}
            />
            <Pagination
                current={pagination.page}
                pageSize={pagination.limit}
                total={pagination.total}
                onChange={handlePageChange}
                className="mt-4"
            />
        </div>
    );
};