import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage.component';
import SignIn from './NavBarOptions/SignIn.component';
import SignUp from './NavBarOptions/SignUp.component';
import './../../src/style.css';

export default function App(){

    return (
        <main style ={{
            backgroundImage: 'linear-gradient(to bottom right, #909090,60%, #5376e5)',
            color: 'white',
            minHeight: '100vh',
        }}>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </main>
    )
}