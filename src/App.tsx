import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './components/Dashboard/Home';
import NewOutcome from './components/NewOutcome/NewOutcome';
import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Header user={user} />
      {!user && <Landing />}
    <Routes>
      <Route path='/' >   
        <Route index element={<Home />} />
        {user && <Route path=':id' element={<h1>id</h1>} /> }
      </Route>
      {user && (
        <>
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
        </>
      )}
    </Routes>
  </BrowserRouter>
  )
}

export default App;


