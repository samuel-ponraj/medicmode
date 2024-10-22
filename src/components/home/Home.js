import React from 'react';
import './Home.css';
import bg1 from '../../assets/bg1.jpg';
import bg2 from '../../assets/bg2.jpg';
import bg3 from '../../assets/bg3.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Core Swiper styles
import { Autoplay, Navigation, Pagination } from 'swiper/modules';  
import 'swiper/css/navigation';  
import 'swiper/css/pagination';  
import { Link } from 'react-router-dom';

const Home = () => {
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
            delay: 2000,
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
        <Link to="/blog" ><button className='explore-btn'>Explore more</button></Link>
        
      </div>
    </div>
  );
};

export default Home;
