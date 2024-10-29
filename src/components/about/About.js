import React from 'react'
import './About.css'
import logo from '../../assets/logos/medicmode-logo-slogan.png'
import jabez from '../../assets/faculties/Jabez.jpg'

const About = () => {
  return (
	
    <div className='about-container'>
        <div className="about1">
          <div className="about1-col1">
            <h1>Our Journey in <span style={{color:'var(--orange)'}}>Life-Saving Service</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nesciunt, enim totam voluptate alias deleniti consequuntur illo perspiciatis. Dolor soluta aliquid dolores quam non rerum atque est enim doloribus quod? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis exercitationem ducimus obcaecati cum soluta perspiciatis, autem in ex cumque, magnam dolorum omnis molestiae consequatur consectetur cupiditate et laboriosam facere neque.</p>
          </div>
          <div className="about1-col2">
            <img src={logo} alt="" />
          </div>
        </div>
		<div className="about2">
			<img src={jabez} alt="" />
			<div className="about2-col1">
				<h1>Our Vision</h1>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nesciunt, enim totam voluptate alias deleniti consequuntur illo perspiciatis. Dolor soluta aliquid dolores quam non rerum atque est enim doloribus quod? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis exercitationem ducimus obcaecati cum soluta perspiciatis, autem in ex cumque, magnam dolorum omnis molestiae consequatur consectetur cupiditate et laboriosam facere neque.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nesciunt, enim totam voluptate alias deleniti consequuntur illo perspiciatis. Dolor soluta aliquid dolores quam non rerum atque est enim doloribus quod? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis exercitationem ducimus obcaecati cum soluta perspiciatis, autem in ex cumque, magnam dolorum omnis molestiae consequatur consectetur cupiditate et laboriosam facere neque.</p>
			</div>
		</div>
    </div>
  )
}

export default About