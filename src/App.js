import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/landing';
import MealPage from './components/meal-page';
import ListPage from './components/list-page';

export const Context = React.createContext();

function App() {
  const [listOfRecipes, setListOfRecipes] = useState([]);

  return (
    <Context.Provider value={[listOfRecipes, setListOfRecipes]}>
      <Router>
        <Routes>
          <Route exact path='/meals' element={<MealPage />}></Route>
          <Route exact path='/lists' element={<ListPage />}></Route>
          <Route path='/' element={<Landing />}></Route>
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
