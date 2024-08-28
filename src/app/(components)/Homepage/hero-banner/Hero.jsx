'use client'
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import './HeroBanner.css';

const Hero = () => {
  const desktopLoader = useRef(null);
  const mobileLoader = useRef(null);

  useEffect(() => {
    const desktopAnimation = lottie.loadAnimation({
      container: desktopLoader.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'path-to-your-lottie-json-file.json' // Replace with the path to your Lottie JSON file
    });

    const mobileAnimation = lottie.loadAnimation({
      container: mobileLoader.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'path-to-your-lottie-json-file.json' // Replace with the path to your Lottie JSON file
    });

    return () => {
      desktopAnimation.destroy();
      mobileAnimation.destroy();
    };
  }, []);

  return (
    <>
      <div>
        <a href=''>
          <div className="desktop-banner-img" id="Banner-desk" data-blink-loader>
            <div className="loader" ref={desktopLoader}></div>
          </div>
        </a>
      </div>

      <div>
        <a href=''>
          <div className="mobile-banner-img" id="Banner-mob" data-blink-loader>
            <div className="loader" ref={mobileLoader}></div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Hero;
