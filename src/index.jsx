import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './components/pages/auth/login';


ReactDOM.render(
  <div>
    <Routes>
      <Route path="/login" element={<LoginPage />}>
        {isLoggedIn ? (
          <Navigate to="/dashboard" replace={true} />
        ) : (
          <Route path="/" element={<App />} />
        )}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  </div>,
  document.getElementById('root')
);
