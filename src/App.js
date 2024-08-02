import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrescriptionForm from './components/PrescriptionForm';
import PrescriptionList from './components/PrescriptionList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-prescription" element={<PrescriptionForm/>} />
        <Route path="/patient/:patientId/prescriptions" element={<PrescriptionList/>} />
        </Routes>
    </Router>
  );
};

export default App;

