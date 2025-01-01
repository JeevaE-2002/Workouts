import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  const [formValues, setFormValues] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    field8: "",
    field9: "",
    field10: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
  };

  return (
    <div className="form-container">
      <form className="grid-form" onSubmit={handleSubmit}>
        {Object.keys(formValues).map((field, index) => (
          <div className="form-field" key={index}>
            <label htmlFor={field}>{`Field ${index + 1}`}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={formValues[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
