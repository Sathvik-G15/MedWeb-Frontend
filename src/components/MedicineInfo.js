// src/components/MedicineInfo.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MedicineInfo.css';

const MedicineInfo = ({ medicine }) => {
    return (
        <div className="medicine-info">
            <h2>{medicine.name}</h2>
            <p><strong>Available at:</strong> {medicine.pharmacyName}</p>
            <p><strong>Quantity:</strong> {medicine.quantity}</p>
            <p><strong>Address:</strong> {medicine.address}</p>
            <p><strong>Contact:</strong> {medicine.contact}</p>
        </div>
    );
};

MedicineInfo.propTypes = {
    medicine: PropTypes.shape({
        name: PropTypes.string.isRequired,
        pharmacyName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        contact: PropTypes.string.isRequired,
    }).isRequired,
};

export default MedicineInfo;
