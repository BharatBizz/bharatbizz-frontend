import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { UserAddOutlined, TeamOutlined, DollarOutlined, InfoCircleOutlined, TransactionOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Pagination, Spin, Alert } from 'antd';
import { asyncFetchAllTransactions } from '../store/actions/adminAction';

const { Title } = Typography;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, rotate: 5, transition: { type: 'spring', stiffness: 300 } }
};

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: '24px', textAlign: 'center' }}>
                Dashboard
            </Title>
            <Row gutter={[16, 16]}>
                {/* Register Investor Card */}
                <Col xs={24} sm={12} md={8}>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        onClick={() => handleCardClick('/investor/register')}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card
                            title="Register Investor"
                            bordered={false}
                            style={{ marginBottom: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            cover={<UserAddOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                        >
                            <p>Register new investors to your MLM network and manage their information.</p>
                        </Card>
                    </motion.div>
                </Col>

                {/* More Options Card */}
                <Col xs={24} sm={12} md={8}>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        onClick={() => handleCardClick('/more-options')}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card
                            title="More Options"
                            bordered={false}
                            style={{ marginBottom: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            cover={<TeamOutlined style={{ fontSize: '24px', color: '#52c41a' }} />}
                        >
                            <p>Explore additional features and options available for your MLM business.</p>
                        </Card>
                    </motion.div>
                </Col>

                {/* Financial Overview Card */}
                <Col xs={24} sm={12} md={8}>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        onClick={() => handleCardClick('/financial-overview')}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card
                            title="Financial Overview"
                            bordered={false}
                            style={{ marginBottom: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            cover={<DollarOutlined style={{ fontSize: '24px', color: '#fa541c' }} />}
                        >
                            <p>Get a summary of the financial activities and status of your MLM network.</p>
                        </Card>
                    </motion.div>
                </Col>

                {/* Company Information Card */}
                <Col xs={24} sm={12} md={8}>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        onClick={() => handleCardClick('/company-info')}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card
                            title="Company Information"
                            bordered={false}
                            style={{ marginBottom: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            cover={<InfoCircleOutlined style={{ fontSize: '24px', color: '#eb2f96' }} />}
                        >
                            <p>Learn more about the company, its mission, and its operations.</p>
                        </Card>
                    </motion.div>
                </Col>

                {/* View Transactions Card */}
                <Col xs={24} sm={12} md={8}>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        onClick={() => handleCardClick('/view-transactions')}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card
                            title="View Transactions"
                            bordered={false}
                            style={{ marginBottom: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            cover={<TransactionOutlined style={{ fontSize: '24px', color: '#722ed1' }} />}
                        >
                            <p>View and manage transactions of a particular user.</p>
                        </Card>
                    </motion.div>
                </Col>

                
            </Row>
        </div>
    );
};


export const ViewTransactions = () => {
    const dispatch = useDispatch();
    const { transactions, pagination, loading, error } = useSelector((state) => state.admin);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(asyncFetchAllTransactions(currentPage, pageSize));
    }, [dispatch, currentPage, pageSize]);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
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
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
    ];

    if (loading) return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
    if (error) return <Alert message="Error" description={error.message} type="error" className="my-4" />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Transaction History</h1>
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <Table
                    dataSource={transactions}
                    columns={columns}
                    rowKey="_id"
                    pagination={false} // Disable internal pagination
                    className="rounded-lg overflow-hidden"
                />
            </div>
            <div className="flex justify-end">
                <Pagination
                    current={pagination?.page}
                    pageSize={pagination?.limit}
                    total={pagination?.total}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageChange}
                    showSizeChanger
                    pageSizeOptions={[10, 20, 30]}
                />
            </div>
        </div>
    );
};

