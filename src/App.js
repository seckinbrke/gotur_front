import React from 'react';
import './App.module.css';
import Getir from './Getir/Getir';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Getir />
      </div>
    </BrowserRouter>
  );
}

export default App;
