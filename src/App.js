import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Use Router for wrapping the app
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import About from './components/about/About';
import Courses from './components/courses/Courses';
// import Drawer from './components/admin/Drawer'
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
import { toast, Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import CourseDetail from './components/coursedetail/CourseDetail';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when the pathname changes
    }, [pathname]);

    return null; // This component does not render anything
};

// Protected Route Component
const ProtectedRoute = ({ element, logged, userEmail }) => {
   
    if (!logged) {
        return <Navigate to="/" />;
    }
   
    return React.cloneElement(element, { userEmail });
};

function App() {
    const [open, setOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [logged, setLogged] = useState(false);
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState(''); 

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
        setTimeout(() => {
            window.location.reload();
        }, 3000); 
        toast.success('Logout successful!', {
            duration: 3000 
        });
    };

 

    return (
        <Router>
            <div className="App">
            <HelmetProvider>
            <Toaster position="top-center" richColors/>
                <ScrollToTop />
                <header>
                    <Header handleOpen={handleOpen} logged={logged} handleLogout={handleLogout} userEmail={userEmail} />
                </header>
                <main className="main-content">
                <Routes> 
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<CourseDetail userEmail={userEmail} handleOpen={handleOpen} logged={logged}/>} />
                    <Route path="/blog/" element={<Blogs userEmail={userEmail} logged={logged} handleOpen={handleOpen}/>} />
                    <Route path="/blog/create-post" element={
                        <ProtectedRoute 
                        element={ <CreatePost />} logged={logged} userEmail={userEmail}>                                       
                         </ProtectedRoute>} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} logged={logged} userEmail={userEmail} />} />
                    <Route path="/blog/:postId" element={<BlogDetail userEmail={userEmail} handleOpen={handleOpen} logged={logged}/>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
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
                </HelmetProvider>
            </div>
        </Router> 
    );
}

export default App;
