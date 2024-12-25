import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { QRCodeCanvas } from 'qrcode.react'; // Updated import
import './Scanner.css';

const Scanner = () => {
  const [qrValue, setQrValue] = useState('');
  console.log("Maps==>",qrValue);
  

  const validationSchema = Yup.object({
    latitude: Yup.number()
      .required('Latitude is required')
      .min(-90, 'Latitude must be between -90 and 90')
      .max(90, 'Latitude must be between -90 and 90'),
    longitude: Yup.number()
      .required('Longitude is required')
      .min(-180, 'Longitude must be between -180 and 180')
      .max(180, 'Longitude must be between -180 and 180'),
  });

  const handleGenerate = (values) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${values.latitude},${values.longitude}`;
    setQrValue(googleMapsUrl)
  };

  return (
    <div className="scanner-container">
      <h1>Scanner</h1>
      <Formik
        initialValues={{ latitude: '', longitude: '' }}
        validationSchema={validationSchema}
        onSubmit={handleGenerate}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <br />
              <Field
                type="text"
                id="latitude"
                name="latitude"
                placeholder="Enter latitude"
              />
              <ErrorMessage name="latitude" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <br />
              <Field
                type="text"
                id="longitude"
                name="longitude"
                placeholder="Enter longitude"
              />
              <ErrorMessage name="longitude" component="div" className="error" />
            </div>
            <br />
            <button
              type="submit"
              disabled={!(isValid && dirty)}
              className={isValid && dirty ? 'active' : 'disabled'}
            >
              Generate
            </button>
          </Form>
        )}
      </Formik>
      {qrValue && (
        <div className="qr-code-container">
          <h2>QR Code</h2>
          <QRCodeCanvas value={qrValue} size={200} /> {/* Updated usage */}
          <p>
            Scan this QR code to view the location in{' '}
            <a href={qrValue} target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
