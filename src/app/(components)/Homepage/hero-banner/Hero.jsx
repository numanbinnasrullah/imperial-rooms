'use client'
import { useEffect } from 'react';
import './HeroBanner.css';
import Image from 'next/image';

const Hero = () => {
  useEffect(() => {
    const lazyLoadBanners = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const banner = entry.target;
          const imgSrc = banner.getAttribute('data-src');
          if (imgSrc) {
            banner.style.backgroundImage = `url(${imgSrc})`;
            observer.unobserve(banner); // Stop observing once the image is loaded
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
          <div
            className="desktop-banner-img"
            id="Banner-desk"
            data-src="/Desktop.png"
          ></div>
        </a>
      </div>

      <div className="banner-wrapper">
        <a href=''>
          <div
            className="mobile-banner-img"
            id="Banner-mob"
            
          >
            <Image data-src="/mobile.png" width={500} height={500}></Image>
          </div>
        </a>
      </div>
    </>
  );
};

export default Hero;
