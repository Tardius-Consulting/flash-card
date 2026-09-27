import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import { ElectronAuthGateway } from '../Infrastructure/ElectronAuthGateway';

export default function App() {

  const authGateway = new ElectronAuthGateway()
  return (
    <Routes>
      <Route path='/' element={<Login gateway={authGateway}/>}/>
    </Routes>
  );
}
