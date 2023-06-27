import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import GoogleIcon from '@mui/icons-material/Google';

const Home = () => {
  const history = useNavigate();

  const handleLogin = () => {
    history.push('/dashboard');
  };

  return (
    <div>
      <h1 align="center">Welcome to Spyglass</h1>
        <h2 align="center">A financial goal planner to help you achieve your dreams.</h2>
        <h3 align="center">Save one day every week. Guaranteed.</h3>
            <div className="cta-button" align="center">
                <Button disabled={false}
                      color='inherit'
                      size="large"
                      variant='outlined'
                      startIcon={<GoogleIcon />}  onClick={() => {window.location.replace('${import.meta.env.VITE_API_URI}/signin')}}     
                >
                Login
                </Button>  
            </div>
        <h3 align="center">This application is in {import.meta.env.VITE_MODE} Mode</h3>
    </div>
  );
};

export default Home;
