import React from "react";
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import { dataRoute } from "./../../routes";
import MenuContainer from "./../Menu/MenuContainer";
import "./App.css";

function App() {
  return (
    <HashRouter className="App">
      {/* <!-- Menu --> */}
      <MenuContainer />
      <div className="container">
        {/* ProductLstPage */}
        {/* <ProductLstPage /> */}
        {/* showRoute */}
        {showContentMenu(dataRoute)}
      </div>
    </HashRouter>
  );
}

const showContentMenu = (route) => {
  let result = null;
  if (route.length > 0) {
    result = route.map((item, i) => {
      return (
        <Route exact={item.exact} path={item.path} key={i}>
          {item.main}
        </Route>
      );
    });
  }
  return <Switch>{result}</Switch>;
};

export default App;
