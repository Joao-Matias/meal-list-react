import React, { useState } from 'react';
import style from './list-ingredients.module.css';
import { ImPencil, ImBin } from 'react-icons/im';

const ListIngredients = (props) => {
  const { activePage, listOfLists, setListOfLists } = props;

  const [editInput, setEditInput] = useState(false);
  const [newIngName, setNewIngName] = useState('');
  const [selectedIng, setSelectedIng] = useState();

  const activeList = listOfLists.find((list) => {
    return list.id === activePage.id;
  });

  const handleEditIngClick = (ing) => {
    setEditInput(true);
    setSelectedIng(ing);
  };

  const handleDeleteIngClick = (ing) => {
    setListOfLists((prevState) => {
      const updatedList = prevState.map((list) => {
        if (list.id === activePage.id) {
          const ingredientsList = list.ingredientsList.filter((ingredient) => {
            return ingredient.id !== ing.id;
          });

          return { ...list, ingredientsList };
        } else {
          return list;
        }
      });

      return updatedList;
    });
  };

  const editIngName = (event) => {
    setNewIngName(event.target.value);
  };

  const confirmIngNameChange = (event, ing) => {
    if (event.key === 'Enter') {
      setListOfLists((prevState) => {
        const updatedList = prevState.map((list) => {
          if (list.id === activeList.id) {
            const ingredientsList = list.ingredientsList.map((ingredient) => {
              if (ingredient.id === ing.id && newIngName.length > 0) {
                return { ...ingredient, ingredient: newIngName };
              } else {
                return ingredient;
              }
            });
            return { ...list, ingredientsList };
          } else {
            return list;
          }
        });

        return updatedList;
      });

      setNewIngName('');
      setEditInput(false);
    }
  };

  return (
    <ul className={style.ingredientsList}>
      {activeList === undefined
        ? []
        : activeList.ingredientsList.map((ing, i) => {
            return (
              <div className={style.ingCont} key={i}>
                {editInput && selectedIng.id === ing.id ? (
                  <input
                    autoFocus
                    onKeyDown={(event) => {
                      confirmIngNameChange(event, ing);
                    }}
                    onChange={(event) => {
                      editIngName(event);
                    }}
                    className={style.newInput}
                    placeholder='Insert new item name and press Enter'
                  />
                ) : (
                  <li className={style.ingName}>{ing.ingredient}</li>
                )}

                <div className={style.ingContEdit}>
                  <div
                    onClick={() => {
                      handleEditIngClick(ing);
                    }}
                    className={style.pencil}
                  >
                    <ImPencil />
                  </div>
                  <div
                    onClick={() => {
                      handleDeleteIngClick(ing);
                    }}
                    className={style.bin}
                  >
                    <ImBin />
                  </div>
                </div>
              </div>
            );
          })}
    </ul>
  );
};

export default ListIngredients;
