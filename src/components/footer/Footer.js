import React from 'react'
import './Footer.css'
import logo from '../../assets/logos/medicmode-logo-white-slogan.png'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                    </ul>
            </div>
            <div className="courses">
                <h3>COURSES</h3>
                    <ul>
                        <li>Course 1</li>
                        <li>Course 2</li>
                        <li>Course 3</li>
                    </ul>
            </div>
            <div className="address">
                <h3>GET IN TOUCH</h3>
                <div className="footer-address">
                    <p><span style={{marginRight: '8px'}}><MailOutlineIcon /></span>contact@medicmode.com</p>
                    <p><span style={{marginRight: '8px'}}><PhoneIcon/></span>9551943040</p>
                    <p style={{lineHeight: '28px'}}><span style={{marginRight: '8px'}}><LocationOnIcon/></span>Four Seson Residense IV, No. 193/1B, <br/> Flat A2, 1st Floor, Anna main road,<br/> Kolapakkam, Chennai: 600128 </p>
                </div>
            </div>
            
        </div>
        <p style={{textAlign: 'center', paddingBottom: '20px'}}>© 2024 Medic Mode. All rights reserved.</p>
    </div>
  )
}

export default Footer