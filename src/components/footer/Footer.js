import React from 'react'
import './Footer.css'
import logo from '../../assets/logos/medicmode-logo-white-slogan.png'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-container">
        <div className='footer'>
            <div className="footer-logo">
                <img src={logo} alt="" />
            </div>
            <div className="quick-links">
                <h3>QUICK LINKS</h3>
                    <ul>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/blog">Blogs</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
            </div>
            <div className="footer-courses">
                <h3>TRENDING COURSES</h3>
                    <ul>
                        <li><Link to="/courses/rjgImlEWz8M6XC5YFBBA">CPR, AED, and First Aid Course</Link></li>
                        <li><Link to="/courses/XeUaPbTF3tDhGyGwWGGF">DCAS Exam Preparatory Crash Course</Link></li>
                        <li><Link to="/courses/z0sGkATVpmoOfu3wg50S">Essentials of ECG - Crash Course</Link></li>
                    </ul>
            </div>
            <div className="address">
                <h3>GET IN TOUCH</h3>
                <div className="footer-address">
                    <p><span style={{marginRight: '8px'}}><MailOutlineIcon /></span><a href="mailto:contact@medicmode.com">contact@medicmode.com</a></p>
                    <p><span style={{marginRight: '8px'}}><PhoneIcon/></span>+91 95519 43040</p>
                </div>
            </div>
            
        </div>
        <p style={{textAlign: 'center', paddingBottom: '20px', fontSize:'13px'}}>© 2024 Medic Mode. All rights reserved.</p>
    </div>
  )
}

export default Footer