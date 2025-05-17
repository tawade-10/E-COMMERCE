import React, { useState, useEffect, useRef } from 'react';
import { bannersList } from '../utils';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = bannersList.length;
  const slideInterval = useRef(null);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Autoplay functionality
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(slideInterval.current);
    };
  }, [totalSlides]);

  return (
    <div
      style={{
        position: 'relative',
        width: '95%',
       // maxWidth: '800px',
        margin: 'auto',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {bannersList.map((banner) => (
          <div
            key={banner.id}
            style={{
              minWidth: '100%',
              boxSizing: 'border-box',
              position: 'relative',
              backgroundColor: banner.backgroundColor,
              height: '400px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: 'black',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '20px',
                borderRadius: '5px',
                textAlign: 'center',
              }}
            >
              <h5 style={{ margin: '0 0 10px 0' }}>{banner.title}</h5>
              <h6 style={{ margin: '0 0 10px 0' }}>{banner.subtitle}</h6>
              <p style={{ margin: 0 }}>{banner.description}</p>
            <Link className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover: bg-gray-800'
            to="/products"
            >Shop Now</Link>
            </div>
            <div className='w-full flex justify-center lg:w-1/2 p-4'><img src={banner?.image} alt="" /></div>
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '10px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          fontSize: '18px',
          borderRadius: '50%',
          zIndex: 1,
        }}
      >
        &#10094;
      </button>
      <button
        onClick={goToNextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          fontSize: '18px',
          borderRadius: '50%',
          zIndex: 1,
        }}
      >
        &#10095;
      </button>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {bannersList.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              height: '10px',
              width: '10px',
              margin: '0 5px',
              display: 'inline-block',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: currentIndex === index ? '#000' : '#ccc',
            }}
          >
          </span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
