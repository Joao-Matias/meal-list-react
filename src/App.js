import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MealLanding from './components/meal-landing';
import ListLanding from './components/list-landing';

import MealPage from './components/meal-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/meals' element={<MealPage />}></Route>
        <Route path='/lists'></Route>
        <Route
          path='/'
          element={
            <div className='app'>
              <Link to='/meals'>
                <MealLanding />
              </Link>
              <ListLanding />
            </div>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
