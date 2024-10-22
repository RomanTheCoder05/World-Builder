// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search';
import Files from './components/Files';
import NarrativeBuilder from './components/NarrativeBuilder';
import DragAndDropDemo from './components/DragAndDropDemo';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/files" element={<Files />} />
            <Route path="/narrative-builder" element={<NarrativeBuilder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
