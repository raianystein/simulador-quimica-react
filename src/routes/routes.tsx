import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import MenuPage from '../pages/MenuPage';
import SimulationPage from '../pages/SimulationPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/menu' element={<MenuPage />} />
      <Route path='/simulation/perfect-gas-law' element={<SimulationPage />} />
    </Routes>
  );
};