import React, { useState, useEffect } from "react";

const DropdownExample = () => {
  const array1 = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Alice" },
  ];

  const array2 = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Alice" },
  ];

  const [selectedValue1, setSelectedValue1] = useState("");
  const [filteredArray2, setFilteredArray2] = useState(array2);
  const [selectedValue2, setSelectedValue2] = useState(""); 

  console.log(selectedValue1,"selectedvlaue 1")
  console.log(filteredArray2,"filteredArray 2")
  console.log(selectedValue2,"selectedValue -2")

  // Load initial value from localStorage when the component mounts
  useEffect(() => {
    const savedValue = localStorage.getItem("selectedValue1");
    if (savedValue) {
      setSelectedValue1(savedValue);
    }
  }, []);

  const handleChangeDropdown1 = (event) => {
    const value = event.target.value;
    setSelectedValue1(value);

    // Store the selected value in localStorage
    localStorage.setItem("selectedValue1", value);

    // Filter array2 to exclude the selected value
    const selectedItem = array1.find((item) => item.name === value);
    const filtered = array2.filter((item) => item.id !== selectedItem?.id);
    setFilteredArray2(filtered);

    // Reset the second dropdown value
    setSelectedValue2("");
  };

  const handleChangeDropdown2 = (event) => {
    const value = event.target.value;
    setSelectedValue2(value);
  };

  return (
    <div>
      {/* Dropdown for Array 1 */}
      <label htmlFor="dropdown1">Choose a person from Array 1:</label>
      <select id="dropdown1" value={selectedValue1} onChange={handleChangeDropdown1}>
        <option value="" disabled>
          Select an option
        </option>
        {array1.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

        <br />
        <br />
      {/* Dropdown for Array 2 */}
      <label htmlFor="dropdown2">Choose a person from Array 2:</label>
      <select
        id="dropdown2"
        value={selectedValue2}
        onChange={handleChangeDropdown2}
        // disabled={!selectedValue1} 
      >
        <option value="" disabled>
           Select an option
        </option>
        {filteredArray2.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

        <br />
        <br />

      <p>Selected Value from Array 1: {selectedValue1}</p>
      <p>Selected Value from Array 2: {selectedValue2}</p>
    </div>
  );
};

export default DropdownExample;
