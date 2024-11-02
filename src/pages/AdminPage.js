// src/pages/AdminPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/AdminPage.module.css'; // Import the CSS module

const AdminPage = () => {
    const [medicines, setMedicines] = useState([]);
    const [MedicineName, setMedicineName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pharmacyAddress, setPharmacyAddress] = useState('');
    const { user, newUser } = useAuth();
    const [updateId, setUpdateId] = useState(null); // New state for updating

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/medicines?userId=${newUser._id}`);
                setMedicines(response.data);
            } catch (err) {
                setError('Error fetching medicines.');
                console.error('Error fetching medicines:', err);
            }
        };

        const fetchPharmacyDetails = async () => {
            try {
                const userIdentification = user;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/pharmacies?userIdentification=${userIdentification}`);
                const pharmacy = response.data[0];

                if (pharmacy) {
                    setPharmacyAddress(`${pharmacy.addressLine1}`);
                } else {
                    setError('No pharmacy details found.');
                }
            } catch (err) {
                setError('Error fetching pharmacy details.');
                console.error('Error fetching pharmacy details:', err);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchMedicines(), fetchPharmacyDetails()]);
            setLoading(false);
        };

        fetchData();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (updateId) {
            // Update medicine
            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/medicines/update/${updateId}`, {
                    MedicineName,
                    quantity
                });
                setMedicines(medicines.map((medicine) =>
                    medicine._id === updateId ? { ...medicine, MedicineName, quantity } : medicine
                ));
                setUpdateId(null); // Clear the update ID after updating
            } catch (err) {
                setError('Error updating medicine.');
                console.error('Error updating medicine:', err);
            }
        } else {
            // Add new medicine
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/medicines/add`, {
                    user,
                    MedicineName,
                    quantity
                });
                setMedicines([...medicines, response.data.medicine]);
            } catch (err) {
                setError('Error adding medicine.');
                console.error('Error adding medicine:', err);
            }
        }

        // Reset fields after submit
        setMedicineName('');
        setQuantity(0);
    };

    const deleteMedicine = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/medicines/${id}`);
            setMedicines(medicines.filter((medicine) => medicine._id !== id));
        } catch (err) {
            setError('Error deleting medicine.');
            console.error('Error deleting medicine:', err);
        }
    };

    const handleUpdateClick = (medicine) => {
        setUpdateId(medicine._id);
        setMedicineName(medicine.MedicineName);
        setQuantity(medicine.quantity);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.adminPage}>
            <h1 className={styles.header}>Admin Page</h1>
            {error && <p className={styles.error}>{error}</p>}

            <div>
                <h3 className={styles.pharmacyAddress}>Pharmacy Address</h3>
                <p>{pharmacyAddress}</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Medicine Name"
                    value={MedicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.submitButton}>{updateId ? 'Update Medicine' : 'Add Medicine'}</button>
                {updateId && <button type="button" className={styles.cancelButton} onClick={() => setUpdateId(null)}>Cancel</button>}
            </form>

            <h2 className={styles.availableMedicinesHeader}>Available Medicines</h2>
            <ul className={styles.medicineList}>
                {medicines.map((medicine) => (
                    <li key={medicine._id} className={styles.medicineItem}>
                        <span>{medicine.MedicineName} - Quantity: {medicine.quantity}</span>
                        <div className={styles.medicineActions}>
                            <button className={styles.deleteButton} onClick={() => deleteMedicine(medicine._id)}>Delete</button>
                            <button className={styles.updateButton} onClick={() => handleUpdateClick(medicine)}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
