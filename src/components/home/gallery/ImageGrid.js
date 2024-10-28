// ImageGallery.js
import React from 'react';
import './ImageGrid.css'
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import 'lightgallery.js/dist/css/lightgallery.css'; 
import bg1 from '../../../assets/bg1.jpg';
import bg2 from '../../../assets/bg2.jpg';
import bg3 from '../../../assets/bg3.jpg';

const images = [
  {
    src: bg1,
    thumbnail: bg1,
    title: 'Image 1',
  },
  {
    src: bg1,
    thumbnail: bg1,
    title: 'Image 1',
  },
  {
    src: bg2,
    thumbnail: bg2,
    title: 'Image 2',
  },
  {
    src: bg2,
    thumbnail: bg2,
    title: 'Image 2',
  },
  {
    src: bg3,
    thumbnail: bg3,
    title: 'Image 3',
  },
  {
    src: bg3,
    thumbnail: bg3,
    title: 'Image 3',
  },
  {
    src: bg3,
    thumbnail: bg3,
    title: 'Image 3',
  },
  {
    src: bg3,
    thumbnail: bg3,
    title: 'Hello',
  },
  // Add more images as needed
];

const ImageGrid = () => {
  return (
    <LightgalleryProvider  >
    <div className='image-gallery' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {images.map((image, index) => (
        <LightgalleryItem 
         
          key={index}
          group="group1"
          src={image.src}
          thumb={image.thumbnail}
          subHtml={`<h4>${image.title}</h4>`} 
          
        >
          <img src={image.thumbnail} alt={image.title} style={{ borderRadius: '5px' }} />
        </LightgalleryItem>
      ))}
    </div>
  </LightgalleryProvider>
  );
};

export default ImageGrid;
