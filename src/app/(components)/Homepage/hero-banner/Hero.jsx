'use client'
import { useEffect, useState } from 'react';
import './HeroBanner.css'
import Heroskeleton from './skeleton';
const Hero = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [fixedHeight, setFixedHeight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 1000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setFixedHeight(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);
  return (
    <>
    {!showBanner ? (
      <Heroskeleton />
    ) : (
      <>
        <div style={{height: fixedHeight ? '830px' : 'auto',}}>
          <a href=''>
            <div className="desktop-banner-img" id="Banner-desk" data-blink-loader></div>
          </a>
        </div>
        <div>
          <a href=''>
            <div className="mobile-banner-img" id="Banner-mob" data-blink-loader></div>
          </a>
        </div>
      </>
    )}
  </>
  )
}

export default Hero