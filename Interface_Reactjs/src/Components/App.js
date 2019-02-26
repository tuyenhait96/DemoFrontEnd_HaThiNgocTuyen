import React, { Component } from 'react';
import './../css/App.css';
import Nav from './../Components/Nav'
// import Home from './../Components/Home'
import Footer from './../Components/Footer'
// import News from './News';
// import Detail from './Detail';
// import Contact from './Contact';
import NavigateURL from '../Router/NavigateURL';
import {
    BrowserRouter as
        Router
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          {/* <Home /> */}
          {/* <News/> */}
          {/* <Detail /> */}
          {/* <Contact /> */}
          <NavigateURL />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
