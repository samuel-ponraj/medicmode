import React, { useEffect, useState } from 'react';
import './Courses.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';  
import 'swiper/css/pagination';  
import header1 from '../../assets/course/header1.jpg';
import header2 from '../../assets/course/header2.jpg';
import header3 from '../../assets/course/header3.jpg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import trainer from '../../assets/trainers/trainer.jpg';
import Rating from '@mui/material/Rating';
import { db } from '../../firebase'; // Import your Firebase configuration
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'; // Import Firestore functions
import { Link } from 'react-router-dom';

const Courses = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchCourses(); // Fetch courses on component mount
  }, []);

  const [courses, setCourses] = useState([]); // State to hold courses
  const value = 4;
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  // Function to fetch courses from Firestore
  const fetchCourses = async () => {
    try {
      const coursesCollection = collection(db, 'courses'); // Reference to your 'courses' collection
      const q = query(coursesCollection, where('approved', '==', 'yes'), orderBy('dateCreated', 'desc')); // Create a query
      const querySnapshot = await getDocs(q); // Get documents using the query
      
      // Map docs to an array
      const coursesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
      setCourses(coursesList); // Set courses in state
    } catch (error) {
      console.error("Error fetching courses: ", error); // Handle errors
    }
  };

  const handleShowMore = () => {
    setVisibleCourses((prevVisible) => prevVisible + 4); // Show 4 more courses each time
  };

  const capitalizeFirstLetter = (mode) => {
	return mode
	  .split(',')
	  .map(item => item.trim()) // Trim any extra whitespace
	  .map(item => item.charAt(0).toUpperCase() + item.slice(1)) // Capitalize first letter
	  .join(', '); // Join them back with a comma and space
  };

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  // Filter the courses based on selected mode and price
  const filteredCourses = courses.filter(course => {
    const modeMatches = selectedMode ? course.mode.includes(selectedMode) : true;
    const priceMatches = selectedPrice ? course.priceDetail === selectedPrice : true;
    return modeMatches && priceMatches; // Only return courses that match both mode and price filters
  });

  return (
    <div className='course-container'>
      <div className="course-header">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, Pagination]} 
        >
          <SwiperSlide><img src={header1} alt="Background 1" className="course-swiper-image" /></SwiperSlide>
          <SwiperSlide><img src={header2} alt="Background 2" className="course-swiper-image" /></SwiperSlide>
          <SwiperSlide><img src={header3} alt="Background 3" className="course-swiper-image" /></SwiperSlide>
        </Swiper>
      </div>
      <div className="courses">
        <div className="course-heading">
          <h1>Our Courses</h1>
          <div className="course-search">
            <h3>Search</h3>
            <div className="search-container">
				<select onChange={handleModeChange}>
					<option value="" disabled>Select Course Mode</option>
					<option value="">All Modes</option>
					<option value="online">Online</option>
					<option value="offline">Offline</option>
				</select>
				<select onChange={handlePriceChange}>
					<option value="" disabled>Select Price</option>
					<option value="">All Prices</option>
					<option value="Paid">Paid</option>
					<option value="Free">Free</option>
				</select>
			</div>
          </div>
        </div>
        <div className="course-main">
		<div className="course-list-wrapper">
            {filteredCourses.slice(0, visibleCourses).map((course) => (
				
              <div className="course-list" key={course.id} data-aos="fade-up">
				 <Link to={`/courses/${course.id}`} target="_blank" rel="noopener noreferrer">
					<img src={course.thumbnail} alt={course.courseTitle} />
					<h3>{course.courseTitle}</h3>
					<div className="course-category">
					<p>{capitalizeFirstLetter(course.mode)} | {course.priceDetail}</p>
					<p className="duration">
						<AccessTimeIcon style={{ fontSize: '15px', marginRight: '5px' }} /> 
						{`${course.duration.hours}:${course.duration.minutes} h`}
					</p>
					</div>
					<Rating name="read-only" value={value} readOnly style={{ marginTop: '10px' }} />
				</Link>
              </div>
            ))}
          </div>
          {visibleCourses < filteredCourses.length && (
            <div className="button-container">
				<button onClick={handleShowMore} className="show-more-button">
				Show More
				</button>
		  	</div>
          )}
        </div>
      </div>

      <div className="our-trainers">
        <h1>Meet Our Trainers</h1>
        <div className="trainers-container">
          <div className="trainer">
            <img src={trainer} alt="Trainer 1" className="trainer-image" />
            <h3>Samuel Ponraj</h3>
            <p>Web Development Instructor</p>
          </div>
          <div className="trainer">
            <img src={trainer} alt="Trainer 2" className="trainer-image" />
            <h3>Jane Smith</h3>
            <p>Paramedic Trainer</p>
          </div>
          <div className="trainer">
            <img src={trainer} alt="Trainer 3" className="trainer-image" />
            <h3>Michael Johnson</h3>
            <p>Emergency Instructor</p>
          </div>
          <div className="trainer">
            <img src={trainer} alt="Trainer 4" className="trainer-image" />
            <h3>John Doe</h3>
            <p>Paramedic Instructor</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
