import React, { useState, useEffect } from 'react';
import './decor.css';

const Decoration = () => {
  const fullText = `"Technology has become an integral part of our daily lives, transforming the way we communicate, work, and learn. From smartphones to artificial intelligence, these advancements have brought convenience and efficiency, connecting people across the globe in ways once unimaginable."`;

  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 50); // Adjust speed by changing the delay (50ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
        <div className="decor-main">
        <p className="typing-effect">{displayedText}</p>
        </div>
    </div>
  );
};

export default Decoration;
