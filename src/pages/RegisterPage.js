import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from '../styles/Auth.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [rePassword, setRePassword] = useState(''); // Separate state for re-enter password
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== rePassword) {
      setError('Passwords do not match.'); // Check for password match
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    if (profilePicture) data.append('profilePicture', profilePicture);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.status === 201) navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Admin Registration</h2>
      <form onSubmit={handleRegister} className={styles.authForm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="rePassword" // Different name for the re-enter password field
          placeholder="Re-Enter Password"
          value={rePassword} // Use rePassword state
          onChange={(e) => setRePassword(e.target.value)} // Set rePassword state
          required
        />
        <input
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <button type="submit">Register</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
