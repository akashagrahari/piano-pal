import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Homepage from './Homepage';
import PageWrapper from './PageWrapper';

import {
  Container,
} from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GetStarted from './GetStarted';
import { Auth } from 'aws-amplify';
import MainApp from './MainApp';

function App() {
  const [formType, updateFormType] = useState('');
  const [signedIn, updateSignedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  });


  function setToken(tokenString) {
    sessionStorage.setItem('token', tokenString);
  }

  function getToken() {
    return sessionStorage.getItem('token');
  }

  function checkLoginStatus() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('user is authenticated: ', user);
        setToken(user.username);
        updateSignedIn(true);
        updateFormType('signedIn');
      })
      .catch(err => {
        console.log(err);
      });;
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PageWrapper
            signedIn={signedIn}
            getToken={getToken}
            updateSignedIn={updateSignedIn}
            page={
              <Homepage getToken={getToken}></Homepage>
            }>
          </PageWrapper>
        }>
        </Route>
        <Route path='/sign-in' element={
          <PageWrapper
            signedIn={signedIn}
            getToken={getToken}
            updateSignedIn={updateSignedIn}
            page={
              <GetStarted formType={formType || 'signIn'}
                setToken={setToken} getToken={getToken}
                updateSignedIn={updateSignedIn}
              ></GetStarted>
            }>
          </PageWrapper>
        }>
        </Route>
        <Route path='/sign-up' element={
          <PageWrapper
            signedIn={signedIn}
            getToken={getToken}
            updateSignedIn={updateSignedIn}
            page={
              <GetStarted formType={formType || 'signUp'}
                setToken={setToken} getToken={getToken}
                updateSignedIn={updateSignedIn}
              ></GetStarted>
            }>
          </PageWrapper>
        }>
        </Route>
        {signedIn &&
          <Route path='/main' element={
            <PageWrapper
              signedIn={signedIn}
              getToken={getToken}
              updateSignedIn={updateSignedIn}
              page={
                <MainApp getToken={getToken}></MainApp>
              }>
            </PageWrapper>
          }>
          </Route>
        }

      </Routes>
    </BrowserRouter >
  );
}


export default App;
