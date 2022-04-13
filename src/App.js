import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Homepage from './Homepage';
import PageWrapper from './PageWrapper';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GetStarted from './GetStarted';
import { Auth } from 'aws-amplify';
import { useNavigation } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: '',
      signedIn: false,
    }
    this.authenticate();
    if (this.getToken()) {
      this.state.signedIn = true;
    }
  }

  getFormType() {
    return sessionStorage.getItem('formType');
  }

  updateFormType() {
    if (this.getToken()) {
      sessionStorage.setItem('formType', 'signedIn');
    }
  }

  setToken(tokenString) {
    sessionStorage.setItem('token', tokenString);
  }

  getToken() {
    const tokenString = sessionStorage.getItem('token');
    return tokenString;
  }

  async logout() {
    try {
      await Auth.signOut({ global: true });
      sessionStorage.clear();
      this.setState({ signedIn: false });
      this.forceUpdate();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  authenticate() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('user is authenticated: ', user);
        this.setToken(user.username);
      })
      .catch(err => {
        console.log(err);
      });;
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PageWrapper
              signedIn={this.state.signedIn}
              getToken={this.getToken}
              logout={this.logout}
              page={
                <Homepage></Homepage>
              }>
            </PageWrapper>
          }>
          </Route>
          <Route path='/sign-in' element={
            <PageWrapper
              signedIn={this.state.signedIn}
              getToken={this.getToken}
              logout={this.logout}
              page={
                <GetStarted formType={this.getFormType() || 'signIn'}
                  setToken={this.setToken} getToken={this.getToken}
                ></GetStarted>
              }>
            </PageWrapper>
          }>
          </Route>
          <Route path='/sign-up' element={
            <PageWrapper
              signedIn={this.state.signedIn}
              getToken={this.getToken}
              logout={this.logout}
              page={
                <GetStarted formType={this.getFormType() || 'signUp'}
                  setToken={this.setToken} getToken={this.getToken}
                ></GetStarted>
              }>
            </PageWrapper>
          }>
          </Route>
        </Routes>
      </BrowserRouter >

    );
  }
}


export default App;
