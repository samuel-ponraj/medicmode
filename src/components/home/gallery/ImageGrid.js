import React, { useEffect, useState } from 'react';
import './ImageGrid.css';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { db } from '../../../firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from Firestore on component mount
    const fetchImages = async () => {
      try {
        const galleryRef = collection(db, 'gallery'); // Reference to the 'gallery' collection
        const gallerySnapshot = await getDocs(galleryRef); // Get all documents in the collection
        const imagesArray = gallerySnapshot.docs.map(doc => ({
          id: doc.id, // Use Firestore document ID as the key
          ...doc.data() // Spread the document data
        }));
        setImages(imagesArray); // Set the images state with fetched dat
      } catch (error) {
        console.error("Error fetching images from Firestore: ", error);
      }
    };

    fetchImages(); // Call the fetch function

    // Initialize Fancybox
    Fancybox.bind('[data-fancybox="gallery"]', {
      Carousel: {
        infinite: false,
      },
    });

    return () => {
      // Cleanup: Unbind Fancybox on component unmount
      Fancybox.destroy();
    };
  }, []);

  return (
    <div
      className="image-gallery"
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {images.map((image) => (
        <div key={image.id}  className="image-wrapper">
          
          <a
            data-fancybox="gallery"
            href={image.carouselImages[0]} // First image in the carousel
            data-caption={image.caption}
          >
            <img
              alt=""
              src={image.thumbnail} 
              className="gallery-thumbnail"
            />
          </a>
          <div className="gallery-caption">
            {image.caption}
          </div>
          {image.carouselImages.slice(1).map((carouselImage, index) => (
            // eslint-disable-next-line
            <a
              key={index}
              data-fancybox="gallery"
              href={carouselImage} // Remaining carousel images
              style={{ display: 'none' }} // Hidden for Fancybox
              data-caption={image.caption}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
