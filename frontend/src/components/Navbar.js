// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/search" className={styles.navLink}>
            Search
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/files" className={styles.navLink}>
            Files
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/narrative-builder" className={styles.navLink}>
            Narrative Builder
          </Link>
        </li>
        {/* Removed the "Drag and Drop" link */}
      </ul>
    </nav>
  );
}

export default Navbar;
