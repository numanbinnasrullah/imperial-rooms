'use client'
import { useEffect, useState } from "react";
import{tooltipContent} from './announcementContent';
import "./announcement.css";


const Announcement = () => {
    const [statements, setStatements] = useState(tooltipContent.statements);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [fade, setFade] = useState(true);
    

  useEffect(() => {
    if (statements.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % statements.length);
      }, 5000); // Change message every 10 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [statements]);

  return (
    <div className={`relative bg-[#484556] text-white text-lg p-3 mx-auto transition-all duration-500 ${fade ? 'fade-in' : 'fade-out'}`}>
    <p className="text-center" dangerouslySetInnerHTML={{ __html: statements[currentMessageIndex].text }}></p>
  </div>
  );
}
 
export default Announcement