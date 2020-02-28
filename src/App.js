import React from 'react';
import './App.module.css';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux'
import store from "./duck";
import Root from './Root';
import './Global';
export const history = createHistory({ forceRefresh: true })

function App() {
  return (
    <Provider store={store}>
      <Root/>
    </Provider>
  );
}

export default App;
