import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Use Router for wrapping the app
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import About from './components/about/About';
import Courses from './components/courses/Courses';
import Careers from './components/careers/Careers';
import Contact from './components/contact/Contact';
import Blogs from './components/blogs/Blogs';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Modal } from '@mui/material';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Dashboard from './components/admin/Dashboard';
import BlogDetail from './components/blogdetail/BlogDetail';
import CreatePost from './components/admin/createpost/CreatePost';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when the pathname changes
    }, [pathname]);

    return null; // This component does not render anything
};

// Protected Route Component
const ProtectedRoute = ({ element, logged, email }) => {
    if (!logged) {
        return <Navigate to="/" />; // Redirect to home if not logged in
    }
    if (email !== "admin@medicmode.com") {
        return <Navigate to="/" />; // Redirect to home if not admin
    }
    return element; // Allow access if logged in and is admin
};

function App() {
    const [open, setOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [logged, setLogged] = useState(false);
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState(''); // Store user email

    const style = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1400,
        bgcolor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflowY: 'auto',
        padding: '100px 20px 20px',
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsSignUp(false);
        setError('');
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('loggedUser');
        if (storedEmail) {
            setUserEmail(storedEmail);
            setLogged(true); // Set logged state if user is found in localStorage
        }
    }, [setLogged]);

    const handleLogout = () => {
        setLogged(false);
        localStorage.removeItem('loggedUser');
        setUserEmail('');
        window.location.reload();
    };

    return (
        <Router>
            <div className="App">
                <ScrollToTop />
                <header>
                    <Header handleOpen={handleOpen} logged={logged} handleLogout={handleLogout} userEmail={userEmail} />
                </header>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/blog" element={<Blogs userEmail={userEmail} logged={logged}/>} />
                        <Route path="/blog/create-post" element={<CreatePost />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} logged={logged} email={userEmail} />} />
                        <Route path="/blog/:postId" element={<BlogDetail />} />
                    </Routes>
                </main>
                <footer>
                    <Footer />
                </footer>
                <div className="float">
                    <WhatsAppIcon style={{ fontSize: '25px', color: 'white' }} />
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {isSignUp ? (
                            <Signup
                                error={error}
                                setError={setError}
                                setIsSignUp={setIsSignUp}
                                handleClose={handleClose}
                            />
                        ) : (
                            <Login
                                setLogged={setLogged}
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                                setIsSignUp={setIsSignUp}
                                error={error}
                                setError={setError}
                                setUserEmail={setUserEmail} // Pass down the setter for userEmail
                            />
                        )}
                    </Box>
                </Modal>
            </div>
        </Router> 
    );
}

export default App;
