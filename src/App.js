import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getRecipeList } from './services/recipe-list';

import Landing from './components/landing';
import MealPage from './components/meal-page';
import ListPage from './components/list-page';

export const Context = React.createContext();

function App() {
  const [listOfRecipes, setListOfRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecipeList();
      setListOfRecipes(response);
      setSelectedRecipe(response[0]);
    };

    fetchData();
  }, []);

  return (
    <Context.Provider value={[listOfRecipes, setListOfRecipes]}>
      <Router>
        <Routes>
          <Route
            exact
            path='/meals'
            element={
              <MealPage
                selectedRecipe={selectedRecipe}
                setSelectedRecipe={setSelectedRecipe}
              />
            }
          ></Route>
          <Route exact path='/lists' element={<ListPage />}></Route>
          <Route path='/' element={<Landing />}></Route>
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
