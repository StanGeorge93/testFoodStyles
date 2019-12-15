import React from 'react';
import "../../static/styles/main.scss";
import {
  Router,
} from 'react-router-dom';
import Main from "../Main";
import history from "../../history";


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Main />
      </Router>
    </div>
  );
}

export default App;
