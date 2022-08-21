import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { User } from './interfaces/user.model'
import Home from './components/Dashboard/Home';
import NewOutcome from './components/NewOutcome/NewOutcome';
import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header user={null} logoutHandler={()=> console.log('logout')}/>
      <Landing handleAuth={()=> console.log('handleauth')}/>
    <Routes>
      <Route path='/' >   
        <Route index element={<Home />} />
        <Route path=':id' element={<h1>id</h1>} />
      </Route>
      <Route path='/outcomes' >
        <Route index element={<h1>outcomes list</h1>} />
        <Route path="newOutcome" element={<NewOutcome/>} />
        <Route path=':id' element={<h1>id</h1>} />
      </Route>
      <Route path='/performances'>
        <Route index element={<h1>performance list</h1>} />
        <Route path='newPerformance' element={<h1>performance form</h1>} />
        <Route path=':id' element={<h1>id</h1>} />
      </Route>
      <Route path='/processes' >
        <Route index element={<h1>process list</h1>} />
        <Route path='newProcess' element={<h1>process form</h1>} />
        <Route path=':id' element={<h1>id</h1>} />
      </Route>

    </Routes>
  </BrowserRouter>
  )
}

export default App;


