import React from 'react';
import './App.module.css';
import Getir from './Getir/Getir';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Headers from './components/NavBar/NavBar'
import Bulletin from './components/Bulletin/Bulletin';

function App() {
  return (
    <Router>
      <div className="App">
        <Headers />
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        {/* <Switch>
          <Route path="/getir">
            <Getir />
          </Route>
          <Route path="/users">
            <Getir />
          </Route>
          <Route path="/">
            <Bulletin />
            <Getir />
          </Route>
        </Switch> */}
      </div>
    </Router >
  );
}

export default App;
