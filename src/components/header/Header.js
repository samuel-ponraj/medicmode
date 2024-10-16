import React from 'react'
import './Header.css'
import headerlogo from '../../assets/logos/medicmode-logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useState } from 'react';



const Header = ({ handleOpen, logged, handleLogout, userEmail }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); 


  return (
    <div className="navbar">
          <div className="nav-images">
          <Link to="/" onClick={() => setIsMenuOpen(false)}><img className='headerlogo' src={headerlogo} alt="" /></Link>
              <a href="https://www.facebook.com/medicmodeofficial" target="_blank" rel="noreferrer"><FacebookIcon className='social-icon'/></a>
              <a href="https://www.instagram.com/medicmode/" target="_blank" rel="noreferrer"><InstagramIcon className='social-icon'/></a>
              <a href="https://www.linkedin.com/company/medicmode-llp/" target="_blank" rel="noreferrer"><LinkedInIcon className='social-icon'/></a>
          </div>
          <div className="nav-links">
            <div className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
              <ul>
                <Link to="/" onClick={() => setIsMenuOpen(false)}><li>HOME</li></Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}><li>ABOUT</li></Link>
                <Link to="/courses" onClick={() => setIsMenuOpen(false)}><li>COURSES</li></Link>
                <Link to="/blog" onClick={() => setIsMenuOpen(false)}><li>BLOG</li></Link>
                <Link to="/careers" onClick={() => setIsMenuOpen(false)}><li>CAREERS</li></Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}><li>CONTACT</li></Link>
                {userEmail === 'admin@medicmode.com' && 
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}><li>DASHBOARD</li></Link>}
              </ul>
            </div>
            <div className="account">
              {logged ? <button className='login-register-btn' onClick={handleLogout}>LOGOUT</button>
              : <button className='login-register-btn' onClick={handleOpen}>LOGIN</button>}
            </div>
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
          
    </div>
  )
}

export default Header