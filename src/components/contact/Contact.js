import React, { useState } from 'react'
import './Contact.css'
import bgImage from '../../assets/contact/header.jpg'
import serviceIcon from '../../assets/contact/serviceIcon.png'
import { toast, Toaster } from 'sonner';
import emailjs from 'emailjs-com';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

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

  const contacts = [
    {
    name: 'Jabez - Founder & CEO',
    phone: '+91 95519 43040',
    email: 'jabez@medicmode.com'
    },
    {
      name: 'Praisy Abigail - COO',
      phone: '+91 73584 56059',
      email: 'praisyabigail@medicmode.com'
    },
    {
      name: 'Sivanesh - CFO',
      phone: '+91 82206 86855',
      email: 'sivanesh@medicmode.com'
    }
  ]

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
              <img src={serviceIcon} alt="" className='addr-image'/>
              <p>Services available in <br />Chennai, Bangalore, Hyderabad, Mangalore, Coimbatore & Trichy</p>
              <div className='contact-icon' style={{marginTop:'8px'}}>
                  <PhoneIcon />
                  <p>For Support and Enquiry: <a href="mailto:contact@medicmode.com">contact@medicmode.com</a></p>
              </div>
            </div>
            {contacts.map((contact) => (
              <div className="addr">
              <h3 style={{color:'var(--orange)', marginBottom:'15px'}}>{contact.name}</h3>
                <div className='contact-icon'>
                  <PhoneIcon />
                  <p>{contact.phone}</p>
                </div>
                <div className='contact-icon'>
                  <MailOutlineIcon />
                  <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                </div>
            </div>
            ))}
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