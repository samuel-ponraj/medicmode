import React from 'react'
import './Header.css'
import headerlogo from '../../assets/logos/medicmode-logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Hamburger from 'hamburger-react'


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
              <a href="https://www.youtube.com/@medicmode623/" target="_blank" rel="noreferrer"><YouTubeIcon className='social-icon' style={{fontSize: '30px'}}/></a>
          </div>
          <div className="nav-links">
            <div className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
              <ul>
                <Link to="/" onClick={() => setIsMenuOpen(false)}><li>HOME</li></Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}><li>ABOUT US</li></Link>
                <Link to="/courses" onClick={() => setIsMenuOpen(false)}><li>COURSES</li></Link>
                <Link to="/blog" onClick={() => setIsMenuOpen(false)}><li>BLOGS</li></Link>
                <Link to="/careers" onClick={() => setIsMenuOpen(false)}><li>CAREERS</li></Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}><li>CONTACT US</li></Link>
                {userEmail === 'admin@medicmode.com' && 
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}><li>DASHBOARD</li></Link>}
              </ul>
            </div>
            <div className="account">
              {logged ? <button className='login-register-btn' onClick={handleLogout}>LOGOUT</button>
              : <button className='login-register-btn' onClick={handleOpen} >LOGIN</button>}
            </div>
          </div>
          <div className="menu-icon">
            <Hamburger toggled={isMenuOpen} toggle={toggleMenu} rounded  hideOutline={false} size={25}/>
          </div>
          
    </div>
  )
}

export default Header