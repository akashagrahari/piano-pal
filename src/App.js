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

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log("yay");
  // }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PageWrapper
              page={
                <Homepage></Homepage>
              }>
            </PageWrapper>
          }>
          </Route>
          <Route path='/sign-in' element={
            <PageWrapper
              page={
                <GetStarted formType='signIn'></GetStarted>
              }>
            </PageWrapper>
          }>
          </Route>
          <Route path='/sign-up' element={
            <PageWrapper
              page={
                <GetStarted formType='signUp'></GetStarted>
              }>
            </PageWrapper>
          }>
          </Route>
        </Routes>
      </BrowserRouter >

    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
