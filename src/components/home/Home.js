import React, { useEffect, useState } from 'react';
import './Home.css';
import bg1 from '../../assets/home/bg1.jpg';
import bg2 from '../../assets/home/bg2.jpg';
import bg3 from '../../assets/home/bg3.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Core Swiper styles
import { Autoplay, Navigation, Pagination } from 'swiper/modules';  
import 'swiper/css/navigation';  
import 'swiper/css/pagination';  
import CountUp from 'react-countup';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SchoolIcon from '@mui/icons-material/School';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import InsightsIcon from '@mui/icons-material/Insights';
import doctor from '../../assets/home/doctor.webp'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    VerticalTimeline,
    VerticalTimelineElement,
  } from "react-vertical-timeline-component";
  import "react-vertical-timeline-component/style.min.css";
  import { FaCalendarAlt } from "react-icons/fa";
  import { db } from '../../firebase'; // Make sure this path is correct
import { collection, getDocs } from 'firebase/firestore';
import { HashLink } from 'react-router-hash-link';
import ImageGrid from './gallery/ImageGrid';
import Aos from 'aos';
import skill from '../../assets/home/skill.png'
import online from '../../assets/home/online.png'
import workshop from '../../assets/home/workshop.png'
import seminar from '../../assets/home/seminar.png'
import 'swiper/css/effect-coverflow';
import Testimony from './testimony/Testimony';


const Home = () => {

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [events, setEvents] = useState([]);
  

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventSnapshot = await getDocs(eventsCollection);
        
        const eventList = eventSnapshot.docs
          .map(doc => {
            const eventData = doc.data();
            
            // Format date based on the data type
            const formattedDate = typeof eventData.date === 'string' 
              ? new Date(eventData.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : eventData.date.toDate().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

            return {
              id: doc.id,
              ...eventData,
              date: formattedDate,
            };
          })
          // Filter for approved events only
          .filter(event => event.approved === true); // Assuming approved is a string

        setEvents(eventList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      <div className='swiper'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, Pagination]} 
        >
          <SwiperSlide><img src={bg1} alt="Background 1" className="swiper-image" /></SwiperSlide>
          <SwiperSlide><img src={bg2} alt="Background 2" className="swiper-image" /></SwiperSlide>
          <SwiperSlide><img src={bg3} alt="Background 3" className="swiper-image" /></SwiperSlide>
        </Swiper>
      </div>
      <div className="intro-text">
        <h1>Welcome to Medic <span style={{color: 'var(--orange)'}}>Mode</span></h1>
        <HashLink smooth to="#services">
          <button className="explore-btn">Explore more</button>
        </HashLink>
      </div>


{/* ***************** About Us *********************/}
  

{/* ***************** Services *********************/}

      <div className="services-container" id='services'>
		    <h1 >Why Choose <span style={{color:'var(--orange)'}}>M</span>edic<span style={{color:'var(--orange)'}}>M</span>ode?</h1>
			<p style={{width:'60%'}}>We provide expert paramedic services, led by certified professionals with a proven record in clinical governance, ensuring adherence to international standards.</p>
			<div style={{display:'flex', alignItems:'center'}} className='services-content'>
        <div className="services services-col1" >
			<div className="service" data-aos="fade-right">
				<div>
				<img src={skill} alt="" />
				</div>
				<div>
				<h3>Skill-Based Training</h3>
				<p>Hands-on training across essential skills, from soft skills to technical and leadership abilities.</p>
				</div>
			</div>
			
			<div className="service" data-aos="fade-right">
				<div>
				<img src={workshop} alt="" /> {/* Add your placeholder image here */}
				</div>
				<div>
				<h3>Educational Workshops</h3>
				<p>Interactive workshops offering real-world knowledge and collaborative learning.</p>
				</div>
			</div>

			<div className="service" data-aos="fade-right">
				<div>
				<img src={online} alt="" /> {/* Add your placeholder image here */}
				</div>
				<div>
				<h3>Online Courses</h3>
				<p>Explore a variety of self-paced online courses designed for different learning styles, covering foundational concepts to advanced techniques.</p>
				</div>
			</div>

			<div className="service" data-aos="fade-right">
				<div>
				<img src={seminar} alt="" /> {/* Add your placeholder image here */}
				</div>
				<div>
				<h3>Seminars</h3>
				<p>Engaging sessions focused on discussion, problem-solving, and peer support.</p>
				</div>
			</div>
			</div>
			<div className='services-col2'>
				<img src={doctor} alt="" data-aos="zoom-in"/>
			</div>
			</div>
      </div>



{/* ***************** statistics *********************/}

      <div className="statistics">
        <h1>Knowledge Shared by Our <span style={{ color: 'var(--orange)' }}>Expert Faculties</span></h1>
            <div className="stat-items">
                <div className="stat-item">
              <LocalLibraryIcon style={{fontSize:'40px', color:'var(--orange)'}}/>
                  <h2>
                  <CountUp end={1700} duration={3} enableScrollSpy scrollSpyOnce />+
                  </h2>
                  <p>Satisfied Learners</p>
                </div>
                <div className="stat-item">
              <SchoolIcon style={{fontSize:'40px', color:'var(--orange)'}}/>
                  <h2>
                  <CountUp end={10} duration={3} enableScrollSpy scrollSpyOnce />+
                  </h2>
                  <p>Courses Offered</p>
                </div>
                <div className="stat-item">
              <WatchLaterIcon style={{fontSize:'40px', color:'var(--orange)'}}/>
                  <h2>
                  <CountUp end={100} duration={3} enableScrollSpy scrollSpyOnce />+
                  </h2>
                  <p>Hours of Content</p>
                </div>
                <div className="stat-item">
              <InsightsIcon style={{fontSize:'40px', color:'var(--orange)'}}/>
                  <h2>
                  <CountUp end={5} duration={3} enableScrollSpy scrollSpyOnce />+
                  </h2>
                  <p>Years of Excellence</p>
                </div>
            </div>
        </div>

{/* ***************** events *********************/}

      {events.map((event) => (
        event.approved && ( // Only render if the event is approved
          <div className="events-container" key={event.id}> {/* Ensure each container has a unique key */}
            <h1>Upcoming <span style={{ color: 'var(--orange)' }}>Events</span></h1>
            <VerticalTimeline>
              <VerticalTimelineElement
                key={event.id} // Use event.id for the key
                date={event.date}
                iconStyle={{ background: "#0A4044", color: "#fff" }}
                contentStyle={{ background: "var(--light-green)" }}
                icon={<FaCalendarAlt />}
              >
                <h3 className="vertical-timeline-element-title" style={{ fontSize: '23px', marginBottom: '8px' }}>
                  {event.title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle" style={{ color: 'var(--orange)', display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon /> {event.location}
                </h4>
                <p>{event.description}</p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        )
      ))}

{/* ***************** Testimony *********************/}

	  <div className="testimony-container">
		  <h1>What <span style={{ color: 'var(--orange)' }}>People Say</span> About Medicmode</h1>
      <div className="slider">
        <Testimony />
      </div>
	  </div>


{/* ***************** Gallery *********************/}

      <div className="gallery-container">
        <h1>Gallery</h1>
          <ImageGrid />
      </div>


    </div>
  );
};

export default Home;
