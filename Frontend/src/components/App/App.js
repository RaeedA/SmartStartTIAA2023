import React from "react";
import './App.css';
import Navbar from '../Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from '../../pages';
import Example from '../../pages/example';

function App() {
    // Contains all the pages in the document and routes to them, more behavior defined in main index
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/example' element={<Example />} />
            </Routes>
        </Router>
    );
}

export default App;
