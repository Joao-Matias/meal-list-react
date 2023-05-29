import React from 'react';
import style from './list-ingredient.module.css';

const ListIngredients = (props) => {
  const { activePage, listOfLists } = props;

  const [activeIngList] = listOfLists.filter((list) => {
    return list.listName === activePage;
  });

  return (
    <ul className={style.ingredientsList}>
      {activeIngList === undefined
        ? []
        : activeIngList.ingredients.map((ing, i) => {
            return <li key={i}>{ing}</li>;
          })}
    </ul>
  );
};

export default ListIngredients;
