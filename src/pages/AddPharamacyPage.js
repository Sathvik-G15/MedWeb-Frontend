import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Modal, Button } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css';
import { useAuth } from '../context/AuthContext';

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const AddPharamacyPage = () => {
  const [formData, setFormData] = useState({
    userIdentification: '',
    pharmacyName: '',
    contactDetails: '',
    addressLine1: '',   // Address line 1
    addressLine2: '',   // Address line 2 (optional)
    city: '',           // City
    state: '',          // State
    zipCode: '',        // Zip code
    country: '',        // Country
    coordinates: '',    // Coordinates as a string for submission
  });
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState([16.5062, 80.648]);
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();
  const mapRef = useRef();
  const { user } = useAuth();

   // Use useEffect to update userIdentification once user is available
   useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        userIdentification: user,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/pharmacies/address`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201){
        navigate('/login');
      } 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        updateLocation(lat, lng);
      },
    });
    return <Marker position={position} />;
  };

  const updateLocation = (lat, lng) => {
    setPosition([lat, lng]);
    setFormData((prev) => ({
      ...prev,
      coordinates: `${lat}, ${lng}`,
    }));
    fetchAddress(lat, lng);
    setShowMap(false);
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
      );
      const address = response.data;
      setFormData((prev) => ({
        ...prev,
        addressLine1: address.display_name || '', // Set addressLine1 directly
        city: address.address?.city || address.address?.town || address.address?.village || '',
        state: address.address?.state || '',
        zipCode: address.address?.postcode || '',
        country: address.address?.country || '',
      }));
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchLocation) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchLocation
        )}&format=json&addressdetails=1`
      );
      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        updateLocation(lat, lon);
        mapRef.current?.setView([lat, lon], 13);
      } else {
        setError('Location not found. Please try another.');
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching location. Please try again.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Admin Registration</h2>
      <form onSubmit={handleRegister} className={styles.authForm}>
        <input
          type="text"
          name="pharmacyName"
          placeholder="Pharmacy Name"
          value={formData.pharmacyName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="contactDetails"
          placeholder="Contact Details"
          value={formData.contactDetails}
          onChange={handleInputChange}
          required
        />
        <div className={styles.locationContainer}>
          <button
            type="button"
            className={styles.locationButton}
            onClick={() => setShowMap(true)}
          >
            Select Location on Map
          </button>
          <input
            type="text"
            name="coordinates"
            placeholder="Coordinates (lat, lng)"
            value={formData.coordinates}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          value={formData.addressLine1}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2 (optional)"
          value={formData.addressLine2}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Register</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>

      <Modal show={showMap} onHide={() => setShowMap(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Search for a location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMap(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddPharamacyPage;
