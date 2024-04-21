import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './NavBarOptions/SignIn.component';
import SignUp from './NavBarOptions/SignUp.component';
import RenderPhotos from './LandingPage/RenderPhotos.component';
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
                    <Route path="/" element={<RenderPhotos />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </main>
    )
}