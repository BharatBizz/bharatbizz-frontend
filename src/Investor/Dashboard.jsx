import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Form, Input, message, Pagination } from 'antd';
import { motion } from 'framer-motion';
import { ArrowUpOutlined, HistoryOutlined, MoneyCollectOutlined, TeamOutlined,ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { asyncInvestorDeposit,asyncFetchHistory, asyncRequestWithdrawalAmount, asyncGetReferredUsers, asyncCurrentInvestor, asyncSaveSelectedPackage, asyncFetchActivePackages, asyncLogout } from '../store/actions/userAction';
import { Table, Spin, Alert } from 'antd'; // Import Ant Design components
import { BiDollar, BiLogOut, BiWallet } from 'react-icons/bi';
import { BsWallet2 } from 'react-icons/bs';
import { GoPackage } from 'react-icons/go';
import { IoLogOutOutline, IoWalletOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import {  Typography } from 'antd';
import { TiUserOutline } from 'react-icons/ti';
import { MdAccountBalanceWallet, MdEmail, MdLocationOn, MdPerson, MdPhone } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

const { Title, Text } = Typography;

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

const mobileCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.1 }
};

const icons = [
  { icon: <ArrowUpOutlined className="text-xl" />, title: 'Deposit', path: '/deposit' },
  { icon: <HistoryOutlined className="text-xl" />, title: 'View History', path: '/view-history' },
  { icon: <BiDollar className="text-xl" />, title: 'Request Withdrawal', path: '/request-withdrawal' },
  { icon: <TeamOutlined className="text-xl" />, title: 'Team', path: '/team' },
  { icon: <BsWallet2 className="text-xl" />, title: 'Wallet', path: '/wallet' },
  { icon: <GoPackage className="text-xl" />, title: 'Active Packages', path: '/active-packages' },
  { icon: <CgProfile className="text-xl" />, title: 'Profile', path: '/profile' },
  { icon: <GoPackage className="text-xl" />, title: 'Choose Package', path: '/choose-package' },
  { icon: <TeamOutlined className="text-xl" />, title: 'More Options', path: '/more' },
];


const MobileCardView = ({ onCardClick }) => {
  return (
    <>
     <div className="pt-[20px] pb-10 p-4 bg-gradient-to-b from-black via-gray-800 to-gray-500 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
       
        {icons.map((item, index) => (
          <motion.div
            key={index}
            variants={mobileCardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="mt-[18px] flex flex-col items-center justify-center p-6 cursor-pointer bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={() => {
              if (item.path === '/logout') {
                onCardClick(); // Call the logout handler
              } else {
                onCardClick(item.path);
              }
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shadow-md">
              {item.icon}
            </div>
            <span className="text-sm text-black">{item.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
    </>
    
  );
};


export const InvestorDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    await dispatch(asyncLogout(navigate));
  };

  const isMobile = window.innerWidth <= 640; // Adjust this breakpoint as needed

  const cards = [
    { title: 'Deposit', icon: <ArrowUpOutlined />, description: 'Add funds to your account', path: '/deposit' },
    { title: 'View History', icon: <HistoryOutlined />, description: 'Check your transaction history', path: '/view-history' },
    { title: 'Request Withdrawal', icon: <MoneyCollectOutlined />, description: 'Request to withdraw funds', path: '/request-withdrawal' },
    { title: 'Your Team Members', icon: <TeamOutlined />, description: 'View and manage your team', path: '/team' },
    { title: 'Wallet', icon: <BsWallet2 />, description: 'View Your Wallet', path: '/wallet' },
    { title: 'Active Packages', icon: <GoPackage />, description: 'View Active Packages', path: '/active-packages' },
    { title: 'Profile', icon: <CgProfile />, description: 'View or Update Profile', path: '/profile' },
    { title: 'Choose Package', icon: <GoPackage />, description: 'Select your preferred investment package', path: '/choose-package' },
    { title: 'More Options', icon: <TeamOutlined />, description: 'Explore additional options', path: '/more' },
    { title: 'Logout', icon: <IoLogOutOutline />, description: 'Logout from your account', path: '/logout' },
  ];

  return (
    <>
      {isMobile ? (
        <>
        <ProfileCard/>

        <MobileCardView onCardClick={handleCardClick} />
        </>
      ) : (
        <div className="flex flex-col p-6 bg-gray-100 min-h-screen">
        <ProfileCard/>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl mx-auto">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover="hover"
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center text-center cursor-pointer"
                onClick={() => card.path === '/logout' ? handleLogout() : handleCardClick(card.path)}
              >
                <Card bordered={false} className="w-full h-full flex flex-col items-center">
                  <motion.div
                    className="text-3xl mb-3 text-indigo-600 flex justify-center items-center"
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
      )}
    </>
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
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
    const onFinish = async (values) => {
      const amount = values.amount;
  
      setLoading(true);
  
      try {
        await dispatch(asyncInvestorDeposit(amount, user?.userId));
        message.success(`Deposit of Rs ${amount} was successful!`);
        form.resetFields();
      } catch (error) {
        message.error('Deposit failed. Please try again.');
      } finally {
        setLoading(false);
      }
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
                { validator: (_, value) => {
                  if (value < 2500) {
                    return Promise.reject('Amount must be at least Rs 2500');
                  }
                  return Promise.resolve();
                }}
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
        const fetchHistory = async () => {
            if (user) {
                try {
                    await dispatch(asyncFetchHistory(user.userId, currentPage, pageSize));
                } catch (error) {
                    console.error('Failed to fetch history:', error);
                }
            }
        };

        fetchHistory();
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




export const Wallet = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
const navigate=useNavigate()
    const handleAddMoney = () => {
        navigate('/deposit')
    };

    const handleViewTransactions = () => {
        navigate('/view-history')
    };

    const handleWithdraw = () => {

navigate('/withdraw')    };

    return (
        <div className="p-6 bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                <h1 className="text-4xl font-bold mb-6 text-blue-600">Wallet Balance</h1>
                <p className="text-3xl font-semibold text-gray-800 mb-8">₹{user?.wallet ?? '0.00'}</p>
                <div className="space-y-4">
                    <Button type="primary" block size="large" onClick={handleAddMoney} className="hover:bg-blue-700">
                        Add Money
                    </Button>
                    <Button type="default" block size="large" onClick={handleViewTransactions} className="hover:bg-gray-200">
                        View Transactions
                    </Button>
                    <Button type="danger" block size="large" onClick={handleWithdraw} className="hover:bg-red-700">
                        Withdraw
                    </Button>
                </div>
            </div>
        </div>
    );
};



const Modal = ({ isVisible, title, content, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="p-4">
          <p>{content}</p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};



export const Package = () => {
  const dispatch = useDispatch();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(asyncCurrentInvestor(token));
  }, [dispatch, token]);

  const packages = [
    2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 750000, 1000000
  ];

  const handlePackageSelect = (amount) => {
    if (user?.wallet >= amount) {
      setModalContent({
        title: 'Confirm Package Selection',
        content: `Are you sure you want to choose the package of ₹${amount.toLocaleString()}?`,
        onConfirm: () => handlePackageConfirmation(amount),
      });
      setIsModalVisible(true);
    } else {
      setModalContent({
        title: 'Insufficient Funds',
        content: `You need at least ₹${amount.toLocaleString()} to select this package.`,
        onConfirm: () => setIsModalVisible(false),
      });
      setIsModalVisible(true);
    }
  };

  const handlePackageConfirmation = async (amount) => {
    try {
      await dispatch(asyncSaveSelectedPackage(user?.userId, amount, user?.referredByUserID));
      setSelectedPackage(amount);
      setIsModalVisible(false);
    } catch (error) {
      setModalContent({
        title: 'Error',
        content: 'There was an error processing your request. Please try again later.',
        onConfirm: () => setIsModalVisible(false),
      });
      setIsModalVisible(true);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl mb-6 flex items-center">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="text-blue-600"
        >
          Back
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Choose an Investment Package</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your current wallet balance: <span className="font-semibold text-blue-600">₹{user?.wallet?.toLocaleString()}</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {packages.map((amount, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 ${
              selectedPackage === amount ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'
            } border ${
              user?.wallet >= amount ? 'hover:border-blue-500' : 'opacity-60 cursor-not-allowed'
            }`}
            onClick={() => handlePackageSelect(amount)}
          >
            <p className={`text-2xl font-semibold mb-2 ${
              selectedPackage === amount ? 'text-blue-600' : 'text-gray-800'
            }`}>
              ₹{amount.toLocaleString()}
            </p>
            <p className={`text-lg ${
              selectedPackage === amount ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {selectedPackage === amount ? 'Selected' : user?.wallet >= amount ? 'Select' : 'Insufficient Funds'}
            </p>
          </div>
        ))}
      </div>
      <Modal
        isVisible={isModalVisible}
        title={modalContent.title}
        content={modalContent.content}
        onConfirm={modalContent.onConfirm}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};  





const ProfileCard = () => {
  const { user, isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!isAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-400 to-purple-500 text-white text-lg font-semibold">
        Please log in to view your profile.
      </div>
    );
  }

  const handleUpdateClick = () => {
    navigate('/profile');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <Card className="w-full max-w-lg md:max-w-2xl bg-white rounded-xl shadow-xl transform transition-all hover:shadow-2xl mt-12">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
          <Avatar
            size={120}
            icon={<FaUser />}
            className="mb-6 md:mb-0 bg-gradient-to-r from-sky-400 to-sky-500 text-white"
          />
          <div className="flex flex-col items-center md:items-start w-full">
            <Title level={2} className="text-center md:text-left mb-4 text-blue-600 font-bold">
              Welcome, {user.firstName}!
            </Title>
            <Title level={4} className="text-center md:text-left mb-4 text-blue-600">
              Profile Information
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="flex items-center space-x-2">
                <MdPerson className="text-blue-600" />
                <Text strong className="text-gray-600">User ID:</Text>
                <Text className="text-gray-800">{user.userId}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MdPerson className="text-blue-600" />
                <Text strong className="text-gray-600">Referred By:</Text>
                <Text className="text-gray-800">{user.referredByUserID}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MdPerson className="text-blue-600" />
                <Text strong className="text-gray-600">First Name:</Text>
                <Text className="text-gray-800">{user.firstName}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MdPerson className="text-blue-600" />
                <Text strong className="text-gray-600">Last Name:</Text>
                <Text className="text-gray-800">{user.lastName}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MdPhone className="text-blue-600" />
                <Text strong className="text-gray-600">Phone:</Text>
                <Text className="text-gray-800">{user.phone}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MdEmail className="text-blue-600" />
                <Text strong className="text-gray-600 break-keep	">Email:</Text>
                <Text className="text-gray-800 break-keep	">{user.email}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MdLocationOn className="text-blue-600" />
                <Text strong className="text-gray-600">Location:</Text>
                <Text className="text-gray-800">{user.location}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MdAccountBalanceWallet className="text-blue-600" />
                <Text strong className="text-gray-600">Wallet Balance:</Text>
                <Text className="text-gray-800">{user.wallet}</Text>
              </div>
            </div>
            <Button
              type="primary"
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              onClick={handleUpdateClick}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Withdraw = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async () => {
        const withdrawalAmount = parseFloat(amount);
        console.log(withdrawalAmount)
        await dispatch(asyncRequestWithdrawalAmount(user?.userId, withdrawalAmount));

        if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
            Modal.error({
                title: 'Invalid Amount',
                content: 'Please enter a valid amount to withdraw.',
            });
            return;
        }

        if (withdrawalAmount > user.wallet) {
            Modal.error({
                title: 'Insufficient Funds',
                content: `You cannot withdraw more than your available balance of ₹${user.wallet.toLocaleString()}.`,
            });
            return;
        }

        setLoading(true);
        try {
            Modal.success({
                title: 'Withdrawal Request Submitted',
                content: `Your request for ₹${withdrawalAmount.toLocaleString()} has been successfully submitted.`,
            });
            navigate('/investor/dashboard');
        } catch (error) {
            Modal.error({
                title: 'Request Failed',
                content: 'There was an error processing your request. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Request Withdrawal</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Form
                    layout="vertical"
                    onClick={handleSubmit}
                >
                    <Form.Item
                        label="Withdrawal Amount"
                        name="amount"
                        rules={[
                            { required: true, message: 'Please enter the amount to withdraw' },
                            { type: 'number', min: 3, message: 'Amount must be at least Rs 3' },
                        ]}
                    >
                        <Input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount"
                        />
                    </Form.Item>
                    <div className="text-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full"
                        >
                            Submit Request
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};



export const YourTeam = () => {
  const dispatch = useDispatch();
  const { user, team } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(asyncGetReferredUsers(user.userId))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [dispatch, user]);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="loader">Loading...</div></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen"><div className="text-red-500">Error: {error.message}</div></div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Team</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left font-semibold">User ID</th>
              <th className="p-4 text-left font-semibold">First Name</th>
              <th className="p-4 text-left font-semibold">Last Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => (
              <tr key={member.userId} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="p-4">{member.userId}</td>
                <td className="p-4">{member.firstName}</td>
                <td className="p-4">{member.lastName}</td>
                <td className="p-4">{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export const ActivePackages = () => {
  const dispatch = useDispatch();
  const { user, activePackages } = useSelector((state) => state.user);

  useEffect(() => {
      if (user) {
          dispatch(asyncFetchActivePackages(user.userId));
      }
  }, [dispatch, user]);

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Active Packages</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {activePackages?.map((pkg, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                      <p className="text-xl font-semibold text-gray-800">Package Amount</p>
                      <p className="text-2xl font-bold text-blue-600 mb-4">₹{pkg.packageAmount.toLocaleString()}</p>
                      <p className="text-gray-600">Activated At:</p>
                      <p className="text-gray-800">{new Date(pkg.activatedAt).toLocaleDateString()}</p>
                  </div>
              ))}
          </div>
      </div>
  );
};

