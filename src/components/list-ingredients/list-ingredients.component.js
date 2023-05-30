import React from 'react';
import style from './list-ingredient.module.css';
import { ImPencil, ImBin } from 'react-icons/im';

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
            return (
              <div className={style.ingCont} key={i}>
                <li className={style.ingName}>{ing.ingName}</li>
                <div className={style.ingContEdit}>
                  <ImPencil />
                  <ImBin />
                </div>
              </div>
            );
          })}
    </ul>
  );
};

export default ListIngredients;
