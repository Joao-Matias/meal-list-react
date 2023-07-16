import React, { useContext, useState } from 'react';
import style from './list-import-modal.module.css';
import { Context } from '../../App';
import { transfereIngredients } from '../../services/recipe-list';

const ListImportModal = (props) => {
  const { activePage, setImportRecipesModal, setListOfLists } = props;

  const [listOfRecipes] = useContext(Context);

  const [selectedRecipe, setSelectedRecipe] = useState(listOfRecipes[0]);
  const [selectedIngList, setSelectedIngList] = useState([]);

  console.log(listOfRecipes);

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
    const response = transfereIngredients(activePage, selectedIngList);

    if (response)
      setListOfLists((prevState) => {
        const selectedList = prevState.filter((list) => {
          return list.id === activePage.id;
        });

        const fullList = prevState.map((list) => {
          if (list.id === selectedList[0].id) {
            return {
              ...list,
              ingredientsList: [...list.ingredientsList, ...selectedIngList],
            };
          } else {
            return list;
          }
        });

        return [...fullList];
      });

    setImportRecipesModal(false);
  };

  return (
    <section className={style.importModal}>
      <div className={style.importContainer}>
        <section className={style.listContainer}>
          <h1>Lists</h1>
          <div className={style.listContainerColumns}>
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
          </div>
        </section>
        <section className={style.ingContainer}>
          <h1>Ingredients</h1>
          <div className={style.ingContainerColumns}>
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
          </div>
        </section>
        <section className={style.btnContainerBox}>
          <div className={style.btnContainer}>
            <button className={style.selectIngs} onClick={selectAllIng}>
              <h3>Select All Ingredients</h3>
            </button>
            <button className={style.importIngs} onClick={importIngredients}>
              <h3>Import Selected Ingredients</h3>
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ListImportModal;
