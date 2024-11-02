// src/pages/UserPage.js

import React, { useState } from 'react';
import styles from './UserPage.module.css';
import { useAuth } from '../context/AuthContext';

const UserPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pharmacies, setPharmacies] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
    const { search } = useAuth();

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/search/shops?medicine=${searchTerm}`);
            const text = await response.text();
            console.log('SeeResponse:', text);
            alert("Not Found!! Please check Medicine name");

            const data = JSON.parse(text);
            console.log('Parsed Data:', data);

            setPharmacies(data.pharmacies || []);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const handlePharmacyClick = async (id, pharmacy) => {
        try {
            console.log("pharmacy", pharmacy);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/search/pharmacy/${id}/details`);
            const data = await response.json();
            console.log('Pharmacy Details:', data);

            setSelectedPharmacy(data);
            setIsModalOpen(true); // Open the modal
        } catch (err) {
            console.error('Error fetching pharmacy details:', err);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPharmacy(null);
    };

    return (
        <div className={styles.userPage}>
            <h2>Search for Medicines</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter medicine name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <h3>Nearby Pharmacies:</h3>
            {pharmacies.length > 0 ? (
                <ul>
                    {pharmacies.map((pharmacy, index) => (
                        <li
                            key={index}
                            onClick={() => handlePharmacyClick(pharmacy.id, pharmacy)}
                            style={{ cursor: 'pointer' }}
                        >
                            <span>{pharmacy.name}</span> - <span>{pharmacy.address}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pharmacies found.</p>
            )}

            {/* Modal for pharmacy details */}
            {isModalOpen && selectedPharmacy && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>×</button>
                        <h3>{selectedPharmacy.pharmacy.pharmacyName}</h3>
                        <p><strong>Address:</strong> {selectedPharmacy.pharmacy.addressLine1}</p>
                        <p>
                        <strong>Coordinates:</strong>
                        {selectedPharmacy.pharmacy.coordinates && selectedPharmacy.pharmacy.coordinates.coordinates ? (
                            <a
                                href={`https://www.google.com/maps?q=${selectedPharmacy.pharmacy.coordinates.coordinates[0]},${selectedPharmacy.pharmacy.coordinates.coordinates[1]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Lat: {selectedPharmacy.pharmacy.coordinates.coordinates[1]}, Lon: {selectedPharmacy.pharmacy.coordinates.coordinates[0]}
                            </a>
                        ) : (
                            'N/A'
                        )}
                    </p>
                        <h4>Available Medicines:</h4>
                        <ul>
                            {selectedPharmacy.MedicineNames.map((medicine, index) => (
                                <li key={index}>
                                    <strong>{medicine}</strong> - Quantity: {selectedPharmacy.Medicinequantity[index]}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPage;


// src/pages/UserPage.js

// import React, { useState, useEffect } from 'react'; // Import useEffect
// import styles from './UserPage.module.css'; // Ensure the path is correct
// import { useAuth } from '../context/AuthContext'; // Custom Auth context

// const UserPage = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [pharmacies, setPharmacies] = useState([]); // Use correct state name
//     const { search } = useAuth(); // Destructure search from AuthContext
    
//     useEffect(() => { // Correct placement of useEffect
//         const fetchPharmacies = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/search/shops?medicine=${search}`);
                
//                 const text = await response.text(); // Log raw response
//                 console.log('Response:', text);

//                 const data = JSON.parse(text); // Parse JSON
//                 console.log('Parsed Data:', data); // Log parsed data
                
//                 // Ensure 'pharmacies' array is correctly extracted
//                 setPharmacies(data.pharmacies || []);
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//             }
//         };

//         if (search) { // Only fetch if there is a search term
//             fetchPharmacies();
//         }
//     }, [search]); // Run this effect whenever `search` changes

//     const handleSearch = async (e) => {
//         e.preventDefault();

//         // If you want to use searchTerm for searching
//         if (!searchTerm) {
//             console.warn('Please enter a medicine name.');
//             return;
//         }

//         // You may also want to handle the search term here if necessary
//     };

//     return (
//         <div className={styles.userPage}>
//             <h2>Search for Medicines</h2>
//             <form onSubmit={handleSearch}>
//                 <input
//                     type="text"
//                     placeholder="Enter medicine name"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                  <button type="submit" className={styles.searchButton}>Search</button>
//             </form>

//             <h3>Nearby Pharmacies:</h3>
//             {pharmacies.length > 0 ? (
//                 <ul>
//                     {pharmacies.map((pharmacy, index) => (
//                         <li key={index}>
//                             <span>{pharmacy.name}</span> - <span>{pharmacy.address}</span>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No pharmacies found.</p>
//             )}
//         </div>
//     );
// };

// export default UserPage;
