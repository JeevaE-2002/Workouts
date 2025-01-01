import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './LatLong.css'; 

const mapContainerStyle = {
  height: "500px",
  width: "100%"
};

const initialCenter = {
  lat: 9.5692,
  lng: 78.0557
};

const LatLong = () => {
  const [locality, setLocality] = useState({ latitude: null, longitude: null });
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(10); 
  const [showMap, setShowMap] = useState(false); 
  console.log(locality);
  
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocality({ latitude: lat, longitude: lng });
  };

  // Function to handle "Your Location" click
  const handleYourLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenter({ lat, lng });
          setZoom(15);
          setLocality({ latitude: lat, longitude: lng });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      
      <button 
        onClick={() => setShowMap(true)} 
        className="select-map-button"
      >
        Select From Map
      </button>

      
      {showMap && (
        <div 
          className="map-popup-container"
          onClick={() => setShowMap(false)}
        >
          <div 
            className="map-popup-inner"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowMap(false)} 
              className="map-popup-close-button"
            >
              &times;
            </button>

            {/* Map */}
            <LoadScript googleMapsApiKey="AIzaSyBGzK5REYl1icyJd-Bgu4A6Af9vbH-y1FM">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={zoom}
                onClick={handleMapClick}
              >
                
                {locality.latitude && locality.longitude && (
                  <Marker position={{ lat: locality.latitude, lng: locality.longitude }} />
                )}

                
                <div
                  className="your-location-button"
                  onClick={handleYourLocation}
                >
                  📍 Your Location
                </div>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      )}

     
      {locality.latitude && locality.longitude && (
        <div>
          <h3>Selected Location:</h3>
          <p>Latitude: {locality.latitude}</p>
          <p>Longitude: {locality.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default LatLong;
