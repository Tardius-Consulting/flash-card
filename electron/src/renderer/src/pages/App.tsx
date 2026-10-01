import React from 'react';
import { Route, Routes } from 'react-router'
import Login from './Login';
import { ElectronAuthGateway } from '../Infrastructure/ElectronAuthGateway';
import SignUp from './SignUp/Index';
import HomeScreem from './Home';
import CardsScreem from './Cards';
import CardScreem from './Card';
import GroupConteiner from './GroupConteiner';
import HomeConteiner from './HomeConteiner';
import { AppProvider } from '../context/app.context';

export default function App() {

  const authGateway = new ElectronAuthGateway()
  return (
    <Routes>
        <Route path='/Login' element={<Login gateway={authGateway}/>}/>
        <Route path='/' element={<AppProvider gateway={authGateway}>
            <HomeConteiner/>
          </AppProvider>
        }>
          <Route index element={<HomeScreem/>}/>
          <Route path=':groupId' element={<GroupConteiner/>}>
            <Route index element={<CardsScreem/>}/>
            <Route path=':CardId' element={<CardScreem/>}/>
          </Route>
        </Route>
        <Route path='/SignUp' element={<SignUp gateway={authGateway}/>}/>
    </Routes>
  );
}
