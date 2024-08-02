// src/components/PrescriptionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PrescriptionForm = () => {
  const doctorId = '660003da43bd32189c2d1307'; // Hardcoded doctorId
  const [patientId, setPatientId] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', daysOfTreatment: '' }]);
  const [diagnosis, setDiagnosis] = useState('');
  const [providerType, setProviderType] = useState('');

  const handleMedicinesChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', daysOfTreatment: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://shielded-beach-02064-bf50e65a75d1.herokuapp.com/api/prescription/createPrescription/${doctorId}`, {
        patientId,
        medicines,
        diagnosis,
        providerType,
      });
      console.log(response.data);
      alert('Prescription created/updated successfully');
    } catch (error) {
      console.error('Error creating/updating prescription:', error);
      alert('Failed to create/update prescription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Patient ID:</label>
        <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
      </div>
      {medicines.map((medicine, index) => (
        <div key={index}>
          <div>
            <label>Medicine Name:</label>
            <input
              type="text"
              value={medicine.name}
              onChange={(e) => handleMedicinesChange(index, 'name', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Dosage:</label>
            <input
              type="text"
              value={medicine.dosage}
              onChange={(e) => handleMedicinesChange(index, 'dosage', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Days of Treatment:</label>
            <input
              type="text"
              value={medicine.daysOfTreatment}
              onChange={(e) => handleMedicinesChange(index, 'daysOfTreatment', e.target.value)}
              required
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={addMedicine}>
        Add Medicine
      </button>
      <div>
        <label>Diagnosis:</label>
        <input type="text" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
      </div>
      <div>
        <label>Provider Type:</label>
        <input type="text" value={providerType} onChange={(e) => setProviderType(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PrescriptionForm;
