import React, { useState } from 'react';
import './Dashboard.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import CreatePost from './createpost/CreatePost'; 
import ReviewPost from './reviewpost/ReviewPost'; 
import BlogDetail from './../blogdetail/BlogDetail';
import UserTable from './users/UserTable';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`admin-blog-container`}>
      <div className={`admin-blog ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
          <div className="left-arrow">
            <h2>Dashboard</h2> 
            <KeyboardDoubleArrowLeftIcon 
              className="left-arrow-icon" 
              onClick={() => setSidebarOpen(false)} 
            />
          </div>
          <ul>
            <Link to="create-post"><li>Create Post</li></Link>
            <Link to="review-post"><li>Review Post</li></Link>
            <Link to="users"><li>User List</li></Link>
          </ul>
        </div>
        <div className="admin-main">
          <div className="right-arrow">
            <KeyboardDoubleArrowRightIcon 
              className="right-arrow-icon" 
              onClick={() => setSidebarOpen(true)} 
            />
            <h2>Dashboard</h2>
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="create-post" replace />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="review-post/" element={<ReviewPost />} />
            <Route path="review-post/:postId" element={<BlogDetail />} />
            <Route path="users" element={<UserTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
