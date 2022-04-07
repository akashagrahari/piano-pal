import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './Header.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Homepage';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("yay");
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div>
              <Header></Header>
              <Homepage></Homepage>
            </div>
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
