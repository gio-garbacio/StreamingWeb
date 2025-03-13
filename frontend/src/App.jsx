import React from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Sinopse from './pages/Sinopse/Sinopse'
import Historico from './pages/Historico/Historico';

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path='/player/:id' element={<PrivateRoute><Player /></PrivateRoute>} />
                <Route path="/sinopse/:id" element={<Sinopse key={window.location.pathname} />} />
                <Route path="/historico" element={<Historico />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
