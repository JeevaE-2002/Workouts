import React, { useEffect, useState } from "react";
import "./sample.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Country, State, City } from "country-state-city";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("Community Name is required")
    .matches(/^[A-Za-z\s]+$/, "Community Name must contain only letters")
    .test(
      "no-leading-space",
      "Community Name cannot start with a space",
      (value) => !value?.startsWith(" ")
    ),
  lastName: Yup.string()
    .required("Community Name is required")
    .matches(/^[A-Za-z\s]+$/, "Community Name must contain only letters")
    .test(
      "no-leading-space",
      "Community Name cannot start with a space",
      (value) => !value?.startsWith(" ")
    ),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^\+\d{12}$/, "Phone number must be 10 digits long"),

  email: Yup.string()
    .required("Email ID is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .test(
      "no-leading-space",
      "Email ID cannot start with a space",
      (value) => !value?.startsWith(" ")
    ),
  city: Yup.array()
    .min(1, "At least one city must be selected")
    .of(Yup.string().required("City name is required")),
  state: Yup.string()
    .required("State is required"),
    // .test(
    //   "no-leading-space",
    //   "State cannot start with a space",
    //   (value) => !value?.startsWith(" ")
    // ),
  country: Yup.string()
    .required("Country is required"),
    // .test(
    //   "no-leading-space",
    //   "Country cannot start with a space",
    //   (value) => !value?.startsWith(" ")
    // ),
});

const AddCityAdmin = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyNiwiZmlyc3ROYW1lIjoiTW9oYW4iLCJsYXN0TmFtZSI6Ikt1bWFyIiwicm9sZUlkIjoxLCJlbWFpbCI6Im1vaGFuQG1haWwuY29tIiwidXNlclBhc3N3b3JkIjoiJDJiJDEwJEVrbThJQi9wWC9UVXc4eElrMnlxWmVSSlYubkhkc25kdy81ZUYzbWwvMFNpRUVLd2d0ZTVlIiwicGhvbmVOdW1iZXIiOiIzNDU2Nzg5MTIyIiwidXNlckNyZWF0ZWRPbiI6IjIwMjQtMTEtMjJUMTE6NDE6MDguMDAwWiIsInVzZXJVcGRhdGVkT24iOiIyMDI0LTExLTIyVDExOjQxOjA4LjAwMFoiLCJEZXZpY2VUb2tlbiI6bnVsbCwiZ2VuZGVyIjoibWFsZSIsImNpdHkiOiJCZW5nYWx1cnUiLCJzdGF0ZSI6Ikthcm5hdGFrYSIsInN0YXR1c0lkIjoyLCJpbWFnZSI6IiIsImNvdW50cnkiOm51bGwsImlzVmVyaWZpZWQiOjEsImlhdCI6MTczNjIzMzI4NywiZXhwIjoxNzM4ODI1Mjg3fQ.sBCxE68jg42rq9_tvgmQ1gQ9YRTcnKFj2oSsMKR34WU";
  const navigate = useNavigate();
  const params = useParams();
//   const numericId = parseInt(params.id);
  const numericId = 563;
  console.log(numericId, "numericId");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState([]);
  const [Image, setImage] = useState(null);
  const [cityAdmin, setCityAdmin] = useState([]);

  console.log(selectedState, "state  1");
  console.log(selectedCity, "city  1");
  console.log(selectedCountry, "country  1");

  // Fetch all countries on component mount
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  // Fetch states based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const allStates = State.getStatesOfCountry(selectedCountry ? selectedCountry.isoCode : null);
      setStates(allStates);
      // setSelectedState(null); // Reset selectedState when country changes
      setCities([]); // Reset cities when country changes
    }
  }, [selectedCountry]);

  // Fetch cities based on selected state
  useEffect(() => {
    if (selectedState) {
      const allCities = City.getCitiesOfState(
       selectedCountry ? selectedCountry.isoCode : null,
        selectedState ? selectedState.isoCode : null
      );
      setCities(allCities);
      // setSelectedCity(null); // Reset selectedCity when state changes
    }
  }, [selectedState, selectedCountry]);

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: [],
    state: "",
    country: "",
  });

  console.log(initialValues, "InitialValues");
  console.log(initialValues.phoneNumber, "InitialValues-city");

  // Fetch cities based on selected state
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const allCities = City.getCitiesOfState( selectedCountry ? selectedCountry.isoCode : null, selectedState ? selectedState.isoCode : null);
      setCities(allCities);
      // setSelectedCity([]); // Reset selectedCity when state changes
    } else {
      setCities([]); // Clear cities if dependencies are missing
    }
  }, [selectedState, selectedCountry]);

  useEffect(() => {
    const fetchData = async () => {
      if (numericId) {
        try {
          const response = await axios.get(
            `https://demo.emeetify.com:81/jauntapp/user/getUserById/${numericId}`,
            {
              headers: {
                token: token,
              },
            }
          );

          const data = response.data.data[0];
          setCityAdmin(data);
          console.log(data, "data");
        } catch (err) {
          console.log(err, "error");
          if (!err.response.data.status) {
            toast.error(err.response.data.message, {
              position: "top-center",
              autoClose: 3000,
            });
          }
        }
      }
    };
    fetchData();
  }, [numericId, token]);


  const fetchList = () =>{

    if (Object.keys(cityAdmin).length > 0) {
      // Find the selected country
      const userCountry = countries.find(
        (country) => country?.name === cityAdmin?.userCountry
      );
      setSelectedCountry(userCountry);
      console.log(userCountry, "userCountry");
      

      // Find the selected state
      const userState = userCountry
        ? State.getStatesOfCountry(userCountry ? userCountry?.isoCode : null).find(
            (state) => state?.name === cityAdmin?.userState
          )
        : null;
      // const updateCountry =
      setSelectedState(userState);
      console.log(userState, "userState");

      // Find the selected cities
      const userCities = userState
        ? City?.getCitiesOfState(userCountry ? userCountry?.isoCode : null,userState ? userState?.isoCode : null).filter((city) => cityAdmin?.userCity?.includes(city?.name))
        : [];
      setSelectedCity(userCities);
      console.log(userCities, "userCities");
      

      const formattedPhoneNumber = cityAdmin?.phoneNumber?.startsWith("+")
        ? cityAdmin.phoneNumber.replace("+", "").trim()
        : cityAdmin.phoneNumber;

      let fdata = {
        ...initialValues,
        firstName: cityAdmin.firstName || "",
        lastName: cityAdmin.lastName || "",
        email: cityAdmin.email || "",
        phoneNumber: `${"+" + formattedPhoneNumber}` || "",
        // city: [cityAdmin?.userCity] || [],
        city: Array.isArray(cityAdmin.userCity)
          ? cityAdmin.userCity
          : [cityAdmin.userCity],
        state: cityAdmin.userState || "",
        country: cityAdmin.userCountry || ""
      };

      setInitialValues(fdata);
    }
}


useEffect(() => {
    fetchList()
},[cityAdmin])


  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("Submitting", values);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "city") {
        formData.append(key, values[key]);
      } else if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    });

    formData.append("Image", Image);

    // Log FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    if (numericId) {
      formData.append("userId", numericId);
    }

    const url = "https://demo.emeetify.com:81/jauntapp/user/registerCityAdmin";
    const url2 = "https://demo.emeetify.com:81/jauntapp/user/updateCityAdmin";

    try {
      if (numericId) {
        const jsonData = {
          ...values,
          Image,
          userId: numericId,
        };
        const response = await axios.put(url2, jsonData, {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });

        const data = response.data;
        console.log(data, "put data");

        if (data.status) {
          toast.success("CityAdmin Updated successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/CityAdmin");
          }, 2000);
        }
      } else {
        const response = await axios.post(url, formData, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);

        if (response.data.status) {
          console.log("Created Successfully");
          toast.success("CityAdmin Created Successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/CityAdmin");
          }, 4000);
        }
      }
    } catch (err) {
      console.log(err, "error");
      if (!err.response.data.status) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  const handleback = () => {
    navigate("/CityAdmin");
    navigate(
      numericId ? `/CityAdmin/viewCityAdmin/${numericId}` : "/CityAdmin"
    );
  };

  return (
    <div className="add-city-bg">
      <ToastContainer />
      <button className="add-city-icon" onClick={handleback}>
        <i>
          <ArrowBackIcon />
        </i>
        <p>{numericId ? "Update City Admin" : "Add City Admin"} </p>
      </button>
      <div className="add-city-container">
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, setFieldTouched, isValid, dirty, values }) => (
            <Form
              onKeyDown={(event) => {
                if (event.key === "Enter" && !(isValid && dirty)) {
                  event.preventDefault();
                }
              }}
            >
              <div className="cityAdmin-form">
                <div>
                  <p>
                    First Name<span>*</span>
                  </p>
                  <Field
                    name="firstName"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    className="add-cityAdmin-field"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error-cityAdmin"
                  />
                </div>
                <div>
                  <p>
                    Last Name<span>*</span>
                  </p>
                  <Field
                    name="lastName"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    className="add-cityAdmin-field"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error-cityAdmin"
                  />
                </div>
                <div>
                  <p>
                    Email Address<span>*</span>
                  </p>
                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    className="add-cityAdmin-field"
                    // InputProps={numericId ? { readOnly: true } : undefined}
                    disabled={numericId}

                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-cityAdmin"
                  />
                </div>

                <div>
                  <p className="city-ph">
                    Phone Number<span>*</span>
                  </p>
                  <PhoneInput
                    country={"in"}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={(value) =>
                      setFieldValue("phoneNumber", `${"+" + value}`)
                    }
                    onBlur={() => {
                      setFieldTouched("phoneNumber");
                    }}
                    inputClass="add-cityAdmin-phone"
                    // inputProps={numericId ? { readOnly: true } : {}}
                    disabled={numericId}

                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error-cityAdmin error-cityAdmin-ph"
                  />
                </div>

                <div>
                  <p>
                    Country<span>*</span>
                  </p>
                  <Autocomplete
                    className="add-cityAdmin-down add-city-co"
                    options={countries}
                    value={selectedCountry}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => {
                      setFieldValue("country", value ? value.name : "");
                      setSelectedCountry(value);

                      numericId && setSelectedState(null) && setSelectedCity([])
                    }}
                    onBlur={() => {
                      setFieldTouched("country");
                    }}
                    renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            // readOnly: numericId, 
                          }}
                        />
                      )}
                    //   disabled={numericId}

                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error-cityAdmin"
                  />
                </div>
                <div>
                  <p>
                    State<span>*</span>
                  </p>
                  <Autocomplete
                    className="add-cityAdmin-down"
                    options={states}
                    value={selectedState}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => {
                      setFieldValue("state", value ? value.name : "");
                      setSelectedState(value);

                      numericId && setSelectedCity([])
                    }}
                    onBlur={() => {
                      setFieldTouched("state");
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                    disabled={!selectedCountry}
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="error-cityAdmin"
                  />
                </div>
                <div>
                  <p>
                    City<span>*</span>
                  </p>
                  <Autocomplete
                    multiple
                    className="add-cityAdmin-down"
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    value={selectedCity}
                    onChange={(e, value) => {
                      setSelectedCity(value); // Update selectedCity as an array
                      setFieldValue(
                        "city",
                        value.map((item) => item.name)
                      ); // Set field value as an array of city names
                    }}
                    onBlur={() => {
                      setFieldTouched("city");
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                    disabled={!selectedState}
                  />

                  <ErrorMessage
                    name="city"
                    component="div"
                    className="error-cityAdmin"
                  />
                </div>
              </div>
              <div className="add-city-container-btn">
                <button className="add-city-cancel" onClick={handleback}>
                  Cancel
                </button>
                <button type="submit" className="add-city-submit">
                  {numericId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCityAdmin;
