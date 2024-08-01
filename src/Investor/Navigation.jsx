// components/Navbar.js
import React from 'react';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogout } from '../store/actions/userAction'; // Ensure correct import

const Navbar = () => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user); // Select authentication status from state
  const navigate = useNavigate();

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  // Function to handle link clicks and close the drawer
  const handleLinkClick = () => {
    onClose();
  };

  // Async function to handle logout
  const handleLogout = async () => {
    try {
      await dispatch(asyncLogout()); // Ensure asyncLogout is properly configured
      // Optionally navigate to login or home page after logout
      console.log('Logged out successfully.');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed w-full z-10 bg-gradient-to-r from-orange-500 via-white to-green-500 text-white px-4 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="/icon.png" alt="Logo" className="h-12" /> {/* Increased height */}
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-gray-800">Home</Link>
        <Link to="/about" className="hover:text-gray-800">About</Link>
        <Link to="/services" className="hover:text-gray-800">Services</Link>
        <Link to="/contact" className="hover:text-gray-800">Contact</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        visible={visible}
        className="bg-gradient-to-r from-orange-500 via-white to-green-500" // Match the background
      >
        <Menu mode="vertical">
          <Menu.Item key="1">
            <Link to="/investor/dashboard" onClick={handleLinkClick}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about" onClick={handleLinkClick}>About</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/services" onClick={handleLinkClick}>Services</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          </Menu.Item>
          {isAuth && ( // Conditional rendering of Logout menu item
            <Menu.Item key="5" onClick={handleLogout} className="flex items-center">
              <LogoutOutlined className="mr-2" />
              Logout
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
    </div>
  );
};

export default Navbar;
