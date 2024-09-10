import './App.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import AppRoute from './config/route'; // Make sure you're importing this correctly
function App() {
  return (
    <div>
      <AppRoute />
    </div>
  );
}

export default App;
