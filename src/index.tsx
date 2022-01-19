import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Dashboard/Home';
import NewOutcome from './components/NewOutcome/NewOutcome';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >   
          <Route index element={<Home />} />
          <Route path="newOutcome" element={<NewOutcome/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

