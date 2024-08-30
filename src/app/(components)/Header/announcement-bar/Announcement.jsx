'use client'
import { useEffect, useState } from "react";
import { tooltipContent } from './announcementContent';
import "./announcement.css";

const Announcement = () => {
  const [statements, setStatements] = useState(tooltipContent.statements);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  useEffect(() => {
    if (statements.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % statements.length);
      }, 5000); // Change message every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [statements]);

  const handleClose = () => {
    setIsVisible(false); // Hide the announcement bar when the cross icon is clicked
  };

  if (!isVisible) return null; // If not visible, return null to hide the component

  return (
    <div className={`w-[100vw] relative bg-[#484556] flex justify-center text-white text-lg p-2 transition-all duration-500 ${fade ? 'fade-in' : 'fade-out'}`}>
      <p className="text-center" dangerouslySetInnerHTML={{ __html: statements[currentMessageIndex].text }}></p>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:text-gray-300"
        onClick={handleClose}
      >
        &times;
      </button>
    </div>
  );
}

export default Announcement;
