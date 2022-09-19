import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';

import Home from './components/Dashboard/Home';
import NewOutcome from './components/NewOutcome/NewOutcome';
import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';
import OutcomeScreen from './components/Screens/Outcome/OutcomeScreen';
import { useAuthContext } from './hooks/useAuthContext';
import NewPerformanceScreen from './components/Screens/NewPerformance/NewPerformanceScreen';
import NewProcessScreen from './components/Screens/NewProcessScreen/NewProcessScreen';
import PerformanceDetails from './components/Screens/PerformanceDetails/PerformanceDetails';

const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
    <Header user={user} />
    <Routes>
      <Route path='/' >   
        <Route index element={user ? <Home /> : <Landing />} />
        {user && <Route path=':id' element={<h1>id</h1>} /> }
      </Route>
      {user && (
        <>
          <Route path='/outcomes' >
            <Route index element={<h1>outcomes list</h1>} />
            <Route path="newOutcome" element={<NewOutcome/>} />
            <Route path=':id' element={<OutcomeScreen />} />
          </Route>
          <Route path='/performances'>
            <Route index element={<h1>performance list</h1>} />
            <Route path='newPerformance/:id' element={<NewPerformanceScreen />} />
            <Route path=':id/:oid' element={<PerformanceDetails />} />
          </Route>
          <Route path='/processes' >
            <Route index element={<h1>process list</h1>} />
            <Route path='newProcess/:oid/:pid' element={<NewProcessScreen />} />
            <Route path=':id' element={<h1>id</h1>} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </>
      )}
    </Routes>
  </BrowserRouter>
  )
}

export default App;


