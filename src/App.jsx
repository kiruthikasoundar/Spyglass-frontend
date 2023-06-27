import React from 'react';
import { Provider } from 'react-redux';
import store from './api/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button, Box} from '@material-ui/core';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import CreateGoal from './components/createGoal';
import Goals from './components/MyGoals';

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Box>
        <head>
          
          <style>
            {`
            body {
              margin: 0;
              padding: 0;
              background: url('https://clickup.com/images/v2/features/bg_gradient__features_v2.svg') no-repeat center center fixed;
              font-family: Frankfurter;
            }
            `}
          </style>
        </head> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/newgoal" element={<CreateGoal />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
