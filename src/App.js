import React from 'react';
import './App.module.css';
import Getir from './Getir/Getir';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Headers from './components/NavBar/NavBar'
import CatagoryDetail from './Getir/CatagoryDetail';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory({ forceRefresh: true })

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Headers />
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact initial component={Getir} />
          <Route path="/catagoryDetail" component={CatagoryDetail} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
