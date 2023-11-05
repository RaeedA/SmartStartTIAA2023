import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from '../../pages';
import Example from '../../pages/example';
import GamePage from '../../pages/gamePage';

function App() {
    // Contains all the pages in the document and routes to them, more behavior defined in main index
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/example' element={<Example />} />
                <Route path='/game' element={<GamePage />} />
            </Routes>
        </Router>
    );
}

export default App;
