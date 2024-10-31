import React from 'react'
import aboutheader from '../../assets/about/header-image.png'
import './About.css'
import logo from '../../assets/logos/medicmode-logo-slogan.png'
import vision from '../../assets/about/vision.png'
import mission from '../../assets/about/mission.png'
import book from '../../assets/about/open-book.png'
import teaching from '../../assets/about/teaching.png'
import mentorship from '../../assets/about/mentorship.png'
import research from '../../assets/about/research-and-development.png'
import jabez from '../../assets/about/Jabez.jpg'
import praisy from '../../assets/home/praisy.jpg'
import sivanesh from '../../assets/home/sivanesh.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';



const About = () => {

	
AOS.init({
    duration: 1200, // Animation duration
    // Whether animation should happen only once - while scrolling down
});


  return (
	<div className="about-container">
		<div className="about-header">
			<img src={aboutheader} alt="" />
			<div className='about-header-title'>
				<h1 data-aos="fade-down">About Us</h1>
				<p  data-aos="fade-up">Empowering paramedics and first responders with innovative training, research, and community-focused initiatives to create a safer, more prepared India.</p>
			</div>
		</div>

		<div className="journey">
			<h1 >Our Journey in <span style={{color:'var(--orange)'}}>Life-Saving Service</span></h1>
			<div className="journey-content">
				<div className="journey-content-text">
					<p>Medicmode LLP is a pioneering paramedic-led organisation dedicated to the welfare, development, and ongoing education of paramedics and healthcare professionals across India. With a focus on accessible, high-quality training, we believe that learning does not end with formal education. Instead, we view continuing education as essential for equipping paramedics with the knowledge and skills necessary to provide exemplary care in an ever-evolving field.</p>
				</div>
				<div className="journey-content-image">
					<img src={logo} alt="" />
				</div>
			</div>
		</div>

		<div className="our-vision-container">
            <div className="our-vision">
                <div className="vision-image">
                    <img src={vision} alt="Vision placeholder" />
                </div>
                <div className="vision-content" data-aos="fade-left">
                    <h1>Our <span style={{color:'var(--orange)'}}>vision</span></h1>
                    <p>We envision an India where EMS leadership is paramedic-led and fueled by research, innovation, and simulation. Our long-term vision is to transform emergency medical services into a progressive, research-driven field that values ongoing skill development and promotes paramedics as leaders within the EMS structure. At Medicmode, we’re actively building a robust EMS ecosystem that is powered by quality training and collaboration, empowering paramedics and first responders to make a lifesaving impact on every scene.</p>
                </div>
            </div>
        </div>


		<div className="our-mission-container">
            <div className="our-mission">
                <div className="mission-content"  data-aos="fade-right">
                    <h1>Our <span style={{color:'var(--orange)'}}>Mission</span></h1>
                    <p>Our mission is to elevate paramedic and EMS standards in India by providing comprehensive, affordable, and accessible education. We are committed to supporting paramedics at all stages of their careers, offering a pathway to continual improvement that empowers them to deliver critical, time-sensitive care in emergencies. Beyond individual training, our goal is to create a culture where trained paramedics work alongside informed lay responders, building a future EMS system that is resilient and community-focused.</p>
                </div>
                <div className="mission-image">
                    <img src={mission} alt="Vision placeholder" />
                </div>
            </div>
        </div>


		<div className="whatwedo-container">
			<div className="whatwedo">
			<div className="whatwedo-header">
				<h1>What <span style={{color:'var(--orange)'}}>We Do</span></h1>
				<p style={{fontWeight:'400'}}>Medicmode offers a suite of services tailored for paramedics, healthcare workers, and the broader community</p>
			</div>
			<div className="whatwedo-content">
				<div className="whatwedo-item"  data-aos="flip-up">
					<div>
						<img src={book} alt="" />
					</div>
					<div>
						<h2>Paramedic and Healthcare Education</h2>
						<p>Our curriculum extends beyond foundational training, with specialised courses designed for continued professional development in emergency medicine. Our programs include both online and offline formats, making advanced learning accessible to paramedics across India.</p>
					</div>
				</div>
				<div className="whatwedo-item" data-aos="flip-up">
					<div>
						<img src={teaching} alt="" />
					</div>
					<div>
						<h2>First Responder and CPR Training</h2>
						<p>We believe that the future of EMS lies in creating empowered lay first responders who can deliver essential, initial care in emergency situations. Our community-centred approach is realised through CPR and first aid courses offered in schools, colleges, and industrial setups. Our “Chennai Knows CPR” initiative embodies this mission by training thousands in lifesaving skills across Chennai, creating a safer and more prepared community. We are proud to have been among the first organisations in Chennai, and the second in Tamil Nadu, to conduct CPR and first aid training for the transgender community, fostering inclusivity in EMS training.</p>
					</div>
              </div>
              <div className="whatwedo-item" data-aos="flip-up" >
					<div>
						<img src={research} alt="" />
					</div>
					<div>
						<h2>Research and EMS Development</h2>
						<p>Research is central to our mission. We aim to drive EMS forward in India by encouraging a research-focused approach, fostering collaboration, and providing platforms for EMS professionals to engage with emerging practices and technologies.</p>
					</div>
              </div>
              <div className="whatwedo-item" data-aos="flip-up">
			  	<div>
					<img src={mentorship} alt="" />
				</div>
				<div>
					<h2>Career Guidance and Mentorship</h2>
					<p>Our commitment goes beyond training; we support paramedics in achieving fulfilling careers within EMS. Through career guidance, mentorship, and continuous educational content on platforms like YouTube and Instagram, we provide paramedics with the tools they need to advance professionally and navigate their paths with confidence.</p>
				</div>
              </div>
			</div>
			</div>
		</div>

		<div className="community-container">
			<div className="community">
				<h1>The Need for <span style={{color:'var(--orange)'}}>Community Training</span></h1>
				<p>India’s rapid population growth and diverse geography pose unique challenges to EMS. The average ambulance response time is approximately 20 minutes in urban areas and can extend to 40 minutes in rural regions. In response, we focus on first responder training at an affordable cost, enabling community members to step in and administer initial care before EMS arrival. This “bridging care” approach ensures that essential help is available, regardless of location, and underscores our belief that empowered communities play a vital role in emergency response.</p>
			</div>
		</div>

		<div className="commitment-container">
			<div className="commitment">
				<h1>Our <span style={{color:'var(--orange)'}}>Commitment</span></h1>
				<p>India’s rapid population growth and diverse geography pose unique challenges to EMS. The average ambulance response time is approximately 20 minutes in urban areas and can extend to 40 minutes in rural regions. In response, we focus on first responder training at an affordable cost, enabling community members to step in and administer initial care before EMS arrival. This “bridging care” approach ensures that essential help is available, regardless of location, and underscores our belief that empowered communities play a vital role in emergency response.</p>
			</div>
		</div>

		<div className="leadership-container">
			<div className="leadership">
				<h1>Our <span style={{color:'var(--orange)'}}>Leadership</span></h1>
				<div className='leader'>
					<img src={jabez} alt="" />
					<div className="leader-content"  data-aos="zoom-in">
						<h1>Jabez - Founder & CEO</h1>
						<p>Medicmode was founded in 2018 by Jabez during the first year of his undergraduate studies, marking the beginning of an enduring commitment to advancing paramedic education and professional standards in India. Mr. Jabez is currently a lecturer, course coordinator, and paramedic at AJ Institute of Medical Sciences in Mangalore, holding an M.Sc. in Trauma Care Management from Sriher and a B.Sc. in Accident and Emergency Care Technology from Sundaram Medical Foundation. This blend of rigorous academic training and practical expertise in emergency care underpins his role.</p>
						<p>Throughout his career, numerous awards have recognized his contributions to the field. These include the Best Poster Award at EMCON 2018, Runner-Up at SEPICON 2018, SAPCON 2018, FORUM 2020, and the Resuscitation Summit 2023, as well as the Winner award for Poster Presentation at EMCON 2022. These distinctions underscore a dedication to advancing EMS practices and sharing knowledge within the medical community.</p>
						<p>In his role as Founder and CEO of Medicmode, Jabez remains devoted to elevating EMS education and fostering the professional development of paramedics in India. Innovative projects have been led under his guidance, including a prehospital care reporting (PCR) app prototype and the development of a prone-position CPR mannequin, both contributing to enhanced EMS practices. His extensive experience organizing paramedic conferences has reinforced a commitment to strengthening the EMS community through collaboration and shared expertise.</p>
						<p>Experience has also been gained across a range of disciplines, including simulation-based training, prehospital care workshops, and the training of numerous laypersons in CPR and first aid. This background, along with substantial involvement in media and research, aligns with Medicmode’s mission to transform the future of EMS in India through quality training, research, and strong professional support.</p>
					</div>
				</div>
				<div className='leader'>
					<img src={praisy} alt="" />
					<div className="leader-content" data-aos="zoom-in">
						<h1>Praisy Abigail - COO</h1>
						<p>Ms. Praisy Abigail, COO of Medicmode, is a highly skilled and dedicated professional with a strong background in trauma and disaster management. She completed both her undergraduate and postgraduate degrees in Trauma Care Management at Sri Ramachandra Institute of Higher Education and Research, where she was awarded the prestigious Shri Arjun Singh Gold Medal for outstanding academic performance. She further specialized in Disaster Management with a postgraduate diploma from Indira Gandhi Open University and is currently pursuing an MBA in Hospital Management.</p>
						<p>Presently serving as an Assistant Professor at Malla Reddy University in Hyderabad, Ms. Praisy previously held a lecturer position at Panimalar Medical College and Hospital, where she also contributed as a paramedic. Her achievements include winning first prize in the Bright Young Speaker competition at SAPCON 2019, as well as presenting papers and posters at numerous conferences. She has participated as faculty in a wide range of workshops and has been instrumental in organizing paramedic conferences.</p>
						<p>With a keen interest in disaster management and extensive experience in training laypersons in CPR and first aid, Ms. Praisy brings both expertise and a commitment to excellence to her role at Medicmode. Her contributions play a crucial role in driving Medicmode’s mission to elevate EMS education and practice in India.</p>
					</div>
				</div>
				<div className='leader'>
					<img src={sivanesh} alt="" />
					<div className="leader-content" data-aos="zoom-in" >
						<h1>Sivanesh - CFO</h1>
						<p>Mr. Sivanesh, CFO of Medicmode, is a licensed paramedic with the Dubai Corporation of Ambulance Service (DCAS) and brings exceptional dedication to his role. After completing his B.Sc. in Accident and Emergency Care at Sundaram Medical Foundation, where he gained around three years of clinical experience, he advanced his career internationally, first working with Response Plus Medic in Dubai and now contributing his expertise to DCAS.</p>
						<p>Passionate about EMS research, training, and development, Mr. Sivanesh has actively contributed to the EMS field through conference presentations and poster sessions. His notable contributions include developing the “CLAP” mnemonic for dispatchers at Sundaram Medical Foundation, enhancing emergency response procedures. He has trained numerous people with CPR and First Aid skills. His unwavering dedication to Medicmode’s growth since its inception has been invaluable, reflecting his commitment to elevating EMS education and practice.</p>
					</div>
				</div> 
			</div> 
		</div>
		
	</div>
  )
}

export default About