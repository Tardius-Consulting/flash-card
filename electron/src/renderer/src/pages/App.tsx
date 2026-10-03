import React from 'react';
import { Route, Routes } from 'react-router'
import Login from './Login';
import { ElectronAuthGateway } from '../Infrastructure/ElectronAuthGateway';
import SignUp from './SignUp';
import HomeScreem from './Home/Home';
import CardsScreem from './Home/Group/Group';
import CardScreem from './Home/Group/Card';
import GroupConteiner from './Home/Group';
import HomeConteiner from './Home';
import { AppProvider } from '../context/app.context';
import { ReviewScreem } from './Home/Review';
import { ReviewProvider } from '../context/Review.context';
import { WebReviewRepository } from '../Infrastructure/WebReviewRepository';

export default function App() {

  const authGateway = new ElectronAuthGateway()
  const repository = new WebReviewRepository()

  return (
    <Routes>
      <Route path='/Review/:groupID' element={<ReviewProvider repository={repository}>
          <ReviewScreem/>
        </ReviewProvider>
      }/>
      <Route path='/Login' element={<Login gateway={authGateway}/>}/>
      <Route path='/' element={<AppProvider gateway={authGateway}>
          <HomeConteiner/>
        </AppProvider>
      }>
        <Route index element={<HomeScreem reviewRepository={repository}/>}/>
        <Route path=':groupId' element={<GroupConteiner/>}>
          <Route index element={<CardsScreem/>}/>
          <Route path=':CardId' element={<CardScreem/>}/>
        </Route>
      </Route>
      <Route path='/SignUp' element={<SignUp gateway={authGateway}/>}/>
    </Routes>
  );
}
