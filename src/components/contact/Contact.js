import React, { useState } from 'react'
import './Contact.css'
import bgImage from '../../assets/contact/header.jpg'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import serviceIcon from '../../assets/contact/serviceIcon.png'
import { toast, Toaster } from 'sonner';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const templateParams = {
      fullName,
      mobile,
      email,
      message,
    };

    // Replace these with your own EmailJS service ID, template ID, and user ID
    const SERVICE_ID = 'service_jbddplr';
    const TEMPLATE_ID = 'template_5oi23ne';
    const USER_ID = '8gfCpUiFRvZQNHCt0';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then((response) => {
        toast.success('Message sent successfully!', {
          duration: 3000 
        });
        // Reset form fields
        setFullName('');
        setMobile('');
        setEmail('');
        setMessage('');
      }, (error) => {
        toast.error('Failed to send enquiry. Please try again.', {
          duration: 3000 
        });
      });
  };

  return (
    <div className="contact-container">
       <Toaster position="top-center" richColors /> 
      <div className="contact">
      <img src={bgImage} alt="" width='100%' />
      <div className="contact-text">
        <div className="contact-heading">
          <h1>GET IN TOUCH WITH US</h1>
          <p>Your thoughts and inquiries are important to us! Don't hesitate to contact our team for assistance or to share your ideas.</p>
        </div>
        <div className="contact-info">
          <div className="contact-address">
            <div className="addr">
              <MailOutlineIcon className='addr-icon' style={{color:'var(--orange)'}}/>
              <p>contact@medicmode.com</p>
              <p>hr@medicmode.com</p>
            </div>
            <div className="addr">
              <PhoneIcon className='addr-icon' style={{color:'var(--orange)'}}/>
              <div style={{display:'flex', alignItems:'center'}}><p style={{marginRight:'8px'}}>Founder & CEO:</p><p>+91 95519 43040</p></div>
              <div style={{display:'flex', alignItems:'center'}}><p style={{marginRight:'8px'}}>CFO:</p><p>+91 73584 56059</p></div>
              <div style={{display:'flex', alignItems:'center'}}><p style={{marginRight:'8px'}}>COO:</p><p>+91 82206 86855</p></div>
            </div>
            <div className="addr">
              <img src={serviceIcon} alt="" className='addr-image'/>
              <p>Services available in <br />Chennai, Bangalore, Hyderabad, Mangalore, Coimbatore & Trichy</p>
              
            </div>
        </div>
        <div className="contact-form">
            <h1>Connect with Us</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Write a message..."
              rows="3"
              style={{ resize: 'vertical', width: 'auto' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button className='enquiry-btn' type="submit">Submit</button>
          </form>
        </div>
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default Contact