// // src/components/Navbar.js

// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for managing authentication
// import styles from '../styles/Navbar.module.css'; // Correct import


// const Navbar = () => {
//     const { user, logout, profile } = useAuth(); // Get user, logout function, and profile picture filename from context
//     const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
//     const location = useLocation(); // Get current location
//     const navigate = useNavigate();
//     const { add } = useAuth(); // Destructure login from AuthContext
    
//     const handleSearch = (event) => {
//         event.preventDefault();
//         console.log('Searching for:', searchQuery);
//         add(searchQuery);
//     };

//     const handleLogout = () => {
//         logout(); // Call the logout function
//         navigate('/'); // Redirect to home after logout
//     };

//     // Construct the profile picture URL
//     const profilePicturePath = profile
//         ? `${process.env.REACT_APP_API_URL}/uploads/${profile}` // Assuming profile holds the filename
//         : `${process.env.REACT_APP_API_URL}/uploads/Default_pfp.jpg`; // Default profile picture

//     return (
//         <nav className={styles.navbar}>
//             <div className={styles.navbarContent}>
//                 <Link to="/" className={styles.logo}>
//                     <h1>MedWeb</h1>
//                 </Link>
//                 <div className={styles.navLinks}>
//                     {location.pathname === '/login' && (
//                         <>
//                             <Link to="/login">Login</Link>
//                             <Link to="/signup">Signup</Link>
//                         </>
//                     )}

//                     {location.pathname === '/user' && (
//                         <form onSubmit={handleSearch} className={styles.searchForm}>
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 placeholder="Search for medicines..."
//                                 className={styles.searchInput}
//                             />
//                             <button type="submit" className={styles.searchButton}>Search</button>
//                         </form>
//                     )}

//                     {user && (
//                         <div className={styles.userProfile}>
//                             <span className={styles.username}>{user}</span> {/* Display the username */}
//                             <img
//                                 src={profilePicturePath} // Use the constructed URL for the image
              
//                                 className={styles.profileImage}
//                             />
//                             <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
// src/components/Navbar.js

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const { user, logout, profile, add } = useAuth(); // Destructure needed items from AuthContext
    const [searchQuery, setSearchQuery] = useState(''); 
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Searching for:', searchQuery);
        add(searchQuery); // Call add with the search query
    };

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    const profilePicturePath = profile
        ? `${process.env.REACT_APP_API_URL}/uploads/${profile}`
        : `${process.env.REACT_APP_API_URL}/uploads/Default_pfp.jpg`; 

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContent}>
                <Link to="/" className={styles.logo}>
                    <h1>MedWeb</h1>
                </Link>
                <div className={styles.navLinks}>
                    {location.pathname === '/login' && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}

                    {/* {location.pathname === '/user' && (
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for medicines..."
                                className={styles.searchInput}
                            />
                            <button type="submit" className={styles.searchButton}>
                                Search
                            </button>
                        </form>
                    )} */}

                    {user && (
                        <div className={styles.userProfile}>
                            <span className={styles.username}>{user}</span> 
                            <img
                                src={profilePicturePath}
                                alt="Profile"
                                className={styles.profileImage}
                            />
                            <button onClick={handleLogout} className={styles.logoutButton}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
