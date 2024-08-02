// src/components/PrescriptionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrescriptionList = ({ patientId }) => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`https://shielded-beach-02064-bf50e65a75d1.herokuapp.com/api/prescriptions/patient/${patientId}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

  return (
    <div>
      <h2>Prescriptions</h2>
      {prescriptions.map((prescription) => (
        <div key={prescription._id}>
          <p>Diagnosis: {prescription.diagnosis}</p>
          <p>Medicines: {prescription.medicines.join(', ')}</p>
          <p>Lab Tests: {prescription.labTests.join(', ')}</p>
          <p>Status: {prescription.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionList;
