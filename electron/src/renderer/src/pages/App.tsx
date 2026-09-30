import React from 'react';
import { Route, Routes } from 'react-router'
import Login from './Login';
import { ElectronAuthGateway } from '../Infrastructure/ElectronAuthGateway';
import SignUp from './SignUp';
import HomeScreem from './Home';
import CardsScreem from './Cards';
import CardScreem from './Card';
import GroupConteiner from './GroupConteiner';
import HomeConteiner from './HomeConteiner';

const SharedHomeRoutes = () => (
  <>
    <Route index element={<HomeScreem/>}/>
    <Route path=':groupId' element={<GroupConteiner/>}>
      <Route index element={<CardsScreem/>}/>
      <Route path=':CardId' element={<CardScreem/>}/>
    </Route>
  </>
);

export default function App() {

  const authGateway = new ElectronAuthGateway()
  const home = <HomeConteiner gateway={authGateway}/>
  return (
    <Routes>
        <Route path='/Login' element={<Login gateway={authGateway}/>}/>
        <Route path='/' element={home}>
          {SharedHomeRoutes()}
        </Route>
        <Route path='/home' element={home}>
          {SharedHomeRoutes()}
        </Route>
        <Route path='/SignUp' element={<SignUp/>}/>
    </Routes>
  );
}
