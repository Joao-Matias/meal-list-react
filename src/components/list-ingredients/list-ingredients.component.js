import React from 'react';
import style from './list-ingredient.module.css';

const ListIngredients = (props) => {
  const { listOfLists, activePage } = props;

  const activeIngredientsList = listOfLists.map((list) => {
    if (list.listName === activePage) {
      return list.ingredients;
    }
  });

  console.log(activeIngredientsList);
  return (
    <ul className={style.ingredientsList}>
      {activeIngredientsList.map((ing, i) => {
        return <li key={i}>{ing}</li>;
      })}
    </ul>
  );
};

export default ListIngredients;
