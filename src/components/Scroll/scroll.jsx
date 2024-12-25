import React, { useEffect, useRef } from "react";
import "./Scroll.css";

const Scroll = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      scrollAmount += 1;
      if (scrollAmount >= scrollElement.scrollWidth / 2) {
        scrollAmount = 0; // Reset scroll when halfway through
      }
      scrollElement.style.transform = `translateX(${-scrollAmount}px)`;
    };

    const interval = setInterval(autoScroll, 20); // Adjust speed here

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="scroll-wrapper">
      <div className="scroll-container" ref={scrollRef}>
        <div className="scroll-item">Item 1</div>
        <div className="scroll-item">Item 2</div>
        <div className="scroll-item">Item 3</div>
        <div className="scroll-item">Item 4</div>
        <div className="scroll-item">Item 5</div>
        <div className="scroll-item">Item 6</div>
        {/* Duplicate items for seamless scrolling */}
        <div className="scroll-item">Item 1</div>
        <div className="scroll-item">Item 2</div>
        <div className="scroll-item">Item 3</div>
        <div className="scroll-item">Item 4</div>
        <div className="scroll-item">Item 5</div>
        <div className="scroll-item">Item 6</div>
      </div>
    </div>
  );
};

export default Scroll;
