import React from 'react'
import './Careers.css'
import { Link } from 'react-router-dom'

const Careers = ({setLoading}) => {

  setLoading (false)

  return (
   <div className='careers-container'>
    <div className='careers'>
        <h1>We currently do not have any openings, but we will be recruiting soon. In the meantime, feel free to explore our other pages.</h1>
        <div >
            <Link to='/courses'><button>Courses</button></Link>
            <Link to='/blog'><button>Blogs</button></Link>
        </div> 
    </div>
</div>

  )
}

export default Careers