'use client'
import { useEffect, useState } from 'react';
import './HeroBanner.css';

const Hero = () => {
  const [isDesktopLoaded, setDesktopLoaded] = useState(false);
  const [isMobileLoaded, setMobileLoaded] = useState(false);

  useEffect(() => {
    const desktopImg = new Image();
    const mobileImg = new Image();

    desktopImg.src = '/Desktop.png';
    mobileImg.src = '/mobile.png';

    desktopImg.onload = () => setDesktopLoaded(true);
    mobileImg.onload = () => setMobileLoaded(true);
  }, []);

  return (
    <>
      <div>
        <a href=''>
          <div className="desktop-banner-img" id="Banner-desk">
            {!isDesktopLoaded && <div className="skeleton-loader"></div>}
            {isDesktopLoaded && (
              <div
                style={{
                  backgroundImage: `url('/Desktop.png')`,
                }}
              ></div>
            )}
          </div>
        </a>
      </div>

      <div>
        <a href=''>
          <div className="mobile-banner-img" id="Banner-mob">
            {!isMobileLoaded && <div className="skeleton-loader"></div>}
            {isMobileLoaded && (
              <div
                style={{
                  backgroundImage: `url('/mobile.png')`,
                }}
              ></div>
            )}
          </div>
        </a>
      </div>
    </>
  );
};

export default Hero;
