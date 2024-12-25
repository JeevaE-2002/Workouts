import React from 'react';
import Sidebar from './Sidebar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();

  const handleChange = () => {
    navigate('/dashboard/addCommunity');
  };
  return (
    <Sidebar active={0}>
      <div>
        <h1>Welcome to the Manage Communities Page</h1>
        <p>This is the main content area.</p>
      </div>

      <br />
      <Button onClick={handleChange} color='primary' variant="contained">Primary Button</Button>
    </Sidebar>
  );
};

export default Dashboard;
