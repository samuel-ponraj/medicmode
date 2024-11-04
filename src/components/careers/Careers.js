import React from 'react'
import './Careers.css'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Careers = ({setLoading}) => {

  setLoading (false)

  return (
   <div className='careers-container'>
    <Helmet>
        <title>Medic Mode - Careers</title>
        <meta name="description" content="Join our team! Explore career opportunities at Medic Mode." />
        <meta name="keywords" content="Careers, Jobs, Medic Mode, Emergency Medical Professionals" />
        <meta property="og:title" content="Medic Mode - Careers" />
        <meta property="og:description" content="We currently do not have any openings, but we will be recruiting soon. Explore our other pages for more information." />
        {/* <meta property="og:image" content="URL_TO_YOUR_IMAGE" /> */}
        <meta property="og:url" content="https://medicmode.com/careers" />
        <meta property="og:type" content="website" />
      </Helmet>
    <div className='careers'>
        <h1>Careers</h1>
        <h2>We currently do not have any openings, but we will be recruiting soon. In the meantime, feel free to explore our other pages.</h2>
        <div >
            <Link to='/courses'><button>Courses</button></Link>
            <Link to='/blog'><button>Blogs</button></Link>
        </div> 
    </div>
</div>

  )
}

export default Careers