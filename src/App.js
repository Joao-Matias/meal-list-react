import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/landing';
import MealPage from './components/meal-page';
import ListPage from './components/list-page';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/meals' element={<MealPage />}></Route>
          <Route exact path='/lists' element={<ListPage />}></Route>
          <Route path='/' element={<Landing />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
