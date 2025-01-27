import React, { useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';

const Profile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ position: 'relative', width: 150, height: 150 }}>
      <Avatar
        src={image || 'https://via.placeholder.com/150'}
        alt="Profile Picture"
        style={{ width: '100%', height: '100%' }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="profile-upload"
      />
      <label htmlFor="profile-upload">
        <IconButton
          component="span"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: 5,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
          }}
        >
          <CameraAlt color="primary" />
        </IconButton>
      </label>
    </div>
  );
};

export default Profile;
