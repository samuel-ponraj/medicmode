import React, { useState } from 'react';
import './Dashboard.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import CreatePost from './createpost/CreatePost'; 
import ReviewPost from './reviewpost/ReviewPost'; 
import BlogDetail from './../blogdetail/BlogDetail';
import UserTable from './users/UserTable';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import EditPost from './editpost/EditPost';
import CreateCourse from './createcourse/CreateCourse';
import ReviewCourse from './reviewcourse/ReviewCourse';
import EditCourse from './editcourse/EditCourse'
import Events from './events/Events';
import ReviewEvent from './reviewevent/ReviewEvent';
import EditEvent from './editevent/EditEvent';

const Dashboard = ({userEmail , loading, setLoading}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  return (
    <div className={`admin-blog-container`}>
      <div className={`admin-blog ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className={`sidebar larger-screen`}>
          <div className="sidebar-options">
            <div className="left-arrow">
              <h2>Dashboard</h2> 
            </div>
				<ul>
					<Link to="users" className='hover' style={{marginTop:'10px'}} onClick={() => setSidebarOpen(false)} ><li>User List</li></Link>
					<li className='list-heading'>Blogs</li>
						<ul>
							<Link className='hover' to="create-post" onClick={() => setSidebarOpen(false)} ><li>New Blog</li></Link>
							<Link className='hover' to="review-post" onClick={() => setSidebarOpen(false)} ><li>Review Blog</li></Link>	
						</ul>
					<li className='list-heading'>Courses</li>
						<ul>
							<Link className='hover' to="create-course" onClick={() => setSidebarOpen(false)} ><li>New Course</li></Link>
							<Link className='hover' to="review-course" onClick={() => setSidebarOpen(false)} ><li>Review Course</li></Link>
						</ul>
          <li className='list-heading'>Events</li>
            <ul>
							<Link className='hover' to="events" onClick={() => setSidebarOpen(false)} ><li>New Event</li></Link>
              <Link className='hover' to="review-event" onClick={() => setSidebarOpen(false)} ><li>Review Event</li></Link>
						</ul>
				</ul>
          </div>
        </div>
        <div className={`sidebar smaller-screen ${sidebarOpen ? '' : 'collapsed'}`}>
          <div className="left-arrow">
            <h2>Dashboard</h2> 
            <KeyboardDoubleArrowLeftIcon 
              className="left-arrow-icon" 
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <ul>
					<Link to="users" className='hover' style={{marginTop:'10px'}} onClick={() => setSidebarOpen(false)} ><li>User List</li></Link>
					<li className='list-heading'>Blogs</li>
						<ul>
							<Link className='hover' to="create-post" onClick={() => setSidebarOpen(false)} ><li>Create Post</li></Link>
							<Link className='hover' to="review-post" onClick={() => setSidebarOpen(false)} ><li>Review Post</li></Link>	
						</ul>
					<li className='list-heading'>Courses</li>
						<ul>
							<Link className='hover' to="create-course" onClick={() => setSidebarOpen(false)} ><li>Create Course</li></Link>
							<Link className='hover' to="review-course" onClick={() => setSidebarOpen(false)} ><li>Review Course</li></Link>
						</ul>
          <li className='list-heading'>Events</li>
            <ul>
							<Link className='hover' to="events" onClick={() => setSidebarOpen(false)} ><li>Create Event</li></Link>
              <Link className='hover' to="review-event" onClick={() => setSidebarOpen(false)} ><li>Review Event</li></Link>
						</ul>
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
            <Route path="/" element={<Navigate to="review-post" replace />} />
            <Route path="create-post" element={<CreatePost userEmail={userEmail}/>} />
            <Route path="review-post" element={<ReviewPost  loading={loading} setLoading={setLoading}/>} />
			      <Route path="create-course" element={<CreateCourse />} />
            <Route path="review-course" element={<ReviewCourse loading={loading} setLoading={setLoading}/>} />
            <Route path="review-post/edit-post" element={<EditPost />} />
            <Route path="review-course/edit-course" element={<EditCourse />} />
            <Route path="review-post/:postId" element={<BlogDetail />} />
            <Route path="users" element={<UserTable loading={loading} setLoading={setLoading}/>} />
            <Route path="events" element={<Events loading={loading} setLoading={setLoading}/>} />
            <Route path="review-event" element={<ReviewEvent loading={loading} setLoading={setLoading}/>} />
            <Route path="review-event/edit-event" element={<EditEvent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
