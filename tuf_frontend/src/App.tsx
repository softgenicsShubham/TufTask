import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './screen/Banner';
import Dashboard from './screen/Dashboard';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
