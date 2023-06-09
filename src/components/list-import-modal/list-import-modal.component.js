import React, { useContext, useState } from 'react';
import style from './list-import-modal.module.css';
import { Context } from '../../App';

const ListImportModal = (props) => {
  const { activePage, setImportRecipesModal, setListOfLists } = props;

  const [listOfRecipes] = useContext(Context);

  const [selectedRecipe, setSelectedRecipe] = useState(listOfRecipes[0]);
  const [selectedIngList, setSelectedIngList] = useState([]);

  const listClickHandler = (list) => {
    setSelectedRecipe(list);
  };

  const selectIngredients = (selectedIng) => {
    setSelectedIngList((prevState) => {
      if (prevState.length === 0) {
        return [selectedIng];
      }

      if (prevState.length > 0) {
        const question = prevState.includes(selectedIng);
        let listOfIng;

        switch (question) {
          case true:
            listOfIng = prevState.filter((ing) => {
              return ing.id !== selectedIng.id;
            });
            break;
          case false:
            listOfIng = [...prevState, selectedIng];
            break;
          default:
        }

        return listOfIng;
      }
    });
  };

  const selectAllIng = () => {
    setSelectedIngList((prevState) => {
      const newIngs = selectedRecipe.ingList.filter((ing) => {
        return !selectedIngList.includes(ing);
      });

      return [...prevState, ...newIngs];
    });
  };

  const importIngredients = () => {
    setListOfLists((prevState) => {
      const selectedList = prevState.filter((list) => {
        return list.id === activePage.id;
      });

      // ...selectedIngList
      // return [
      //   ...prevState,
      //   { ...selectedList, ingredientsList: selectedIngList },
      // ];
    });

    setImportRecipesModal(false);
  };

  // console.log(selectedRecipe);

  return (
    <section className={style.importModal}>
      <div className={style.importContainer}>
        <section className={style.listContainer}>
          <h1>Lists</h1>
          {listOfRecipes.map((list, i) => {
            return (
              <div
                onClick={() => {
                  listClickHandler(list);
                }}
                className={style.listBox}
                key={i}
              >
                <h3>{list.mealName}</h3>
              </div>
            );
          })}
        </section>
        <section className={style.ingContainer}>
          <h1>Ingredients</h1>
          {selectedRecipe.ingList.map((ing, i) => {
            return (
              <div
                className={
                  selectedIngList.includes(ing)
                    ? style.ingBoxSelected
                    : style.ingBox
                }
                onClick={() => {
                  selectIngredients(ing);
                }}
                key={i}
              >
                <h3>{ing.ingredient}</h3>
              </div>
            );
          })}
        </section>
        <section>
          <div className={style.btnContainer}>
            <button onClick={selectAllIng}>Select All Ingredients</button>
            <button onClick={importIngredients}>
              Import Selected Ingredients
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ListImportModal;
