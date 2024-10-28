// ImageGrid.js
import React, { useEffect } from 'react';
import './ImageGrid.css'
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';


const ImageGrid = () => {
  useEffect(() => {
    // Initialize Fancybox on component mount
    Fancybox.bind('[data-fancybox]', {
      Carousel: {
        infinite: false,
      },
    });

    return () => {
      // Cleanup: Unbind Fancybox on component unmount
      Fancybox.destroy();
    };
  }, []);

  const images = [
    { id: 1, src: 'https://lipsum.app/id/60/1600x1200', thumb: 'https://lipsum.app/id/60/200x150' },
    { id: 2, src: 'https://lipsum.app/id/61/1600x1200', thumb: 'https://lipsum.app/id/61/200x150' },
    { id: 3, src: 'https://lipsum.app/id/62/1600x1200', thumb: 'https://lipsum.app/id/62/200x150' },
    { id: 4, src: 'https://lipsum.app/id/63/1600x1200', thumb: 'https://lipsum.app/id/63/200x150' },
    { id: 5, src: 'https://lipsum.app/id/64/1600x1200', thumb: 'https://lipsum.app/id/64/200x150' },
    { id: 5, src: 'https://lipsum.app/id/64/1600x1200', thumb: 'https://lipsum.app/id/64/200x150' },
    { id: 5, src: 'https://lipsum.app/id/64/1600x1200', thumb: 'https://lipsum.app/id/64/200x150' },
    { id: 5, src: 'https://lipsum.app/id/64/1600x1200', thumb: 'https://lipsum.app/id/64/200x150' },
    { id: 5, src: 'https://lipsum.app/id/64/1600x1200', thumb: 'https://lipsum.app/id/64/200x150' },
  ];

  return (
    <div className='image-gallery' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {images.map((image) => (
        <a key={image.id} data-fancybox="gallery" href={image.src}>
          <img
            alt=""
            src={image.thumb}
            width="350"
            height="auto"
            style={{ margin: '5px', borderRadius: '5px' }}
          />
        </a>
      ))}
    </div>
  );
};

export default ImageGrid;
