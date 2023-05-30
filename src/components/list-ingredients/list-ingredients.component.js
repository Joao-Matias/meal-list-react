import React from 'react';
import style from './list-ingredient.module.css';

const ListIngredients = (props) => {
  const { activePage, listOfLists } = props;

  const list = listOfLists.find((list) => {
    return list.id === activePage.id;
  });

  return (
    <ul className={style.ingredientsList}>
      {list === undefined
        ? []
        : list.ingredients.map((ing, i) => {
            return <li key={i}>{ing.ingName}</li>;
          })}
    </ul>
  );
};

export default ListIngredients;
