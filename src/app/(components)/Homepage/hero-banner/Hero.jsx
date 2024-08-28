'use client'
import { useEffect, useState } from 'react';
import './HeroBanner.css';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lazyLoadBanners = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const banner = entry.target;
          const imgSrc = banner.getAttribute('data-src');
          if (imgSrc) {
            banner.style.backgroundImage = `url(${imgSrc})`;
            observer.unobserve(banner); // Stop observing once the image is loaded
            setTimeout(() => {
              setIsLoading(false); // Hide skeleton after 1 second
            }, 1000);
          }
        }
      });
    };

     const observer = new IntersectionObserver(lazyLoadBanners, {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.1
    });

    const banners = document.querySelectorAll('[data-src]');
    banners.forEach(banner => observer.observe(banner));

    return () => {
      banners.forEach(banner => observer.unobserve(banner));
    };
  }, []);

  return (
    <>
      <div className="banner-wrapper">
        <a href=''>
          <div className={`desktop-banner-img ${isLoading ? 'loading' : ''}`} id="Banner-desk" data-src="/Desktop.png">
            {isLoading && <div className="skeleton-loader"></div>}
          </div>
        </a>
      </div>

      <div className="banner-wrapper">
        <a href=''>
          <div className={`mobile-banner-img ${isLoading ? 'loading' : ''}`} id="Banner-mob" data-src="/mobile.png">
            {isLoading && <div className="skeleton-loader"></div>}
          </div>
        </a>
      </div>
    </>
  );
};

export default Hero;
