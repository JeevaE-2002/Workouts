import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function DatePickers() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB'); // Format: "dd/mm/yyyy"

  const [selectedDate, setSelectedDate] = useState(""); // Initialize with an empty string
    
  const dateInputRef = useRef(null);    

  useEffect(() => {
    // Log today's date when the component mounts
    console.log("Today's Date:", formattedDate);
  }, []); // Empty dependency array ensures this only runs once

  const handleClick = () => {
    // Trigger the click event on the hidden date input to open the calendar
    dateInputRef.current.showPicker();
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    
    // Log the selected date when it changes
    console.log("Selected Date:", newDate);
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      {/* Hidden date input with a reference */}
      <input
        type="date"
        ref={dateInputRef}
        value={selectedDate}
        onChange={handleDateChange}
        style={{ display: 'none' }} // Hide the date input field
      />

      {/* Button to show "Hello" if a date is selected, or "Today" if not */}
      <Button variant="contained" onClick={handleClick}>
        {selectedDate ? selectedDate : "Today"}
      </Button>
    </Box>
  );
}

export default DatePickers;
