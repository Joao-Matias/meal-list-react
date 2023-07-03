export function getRecipeList() {
  return JSON.parse(localStorage.getItem('recipeList') || '[]');
}

export function addRecipeStorage(recipe) {
  const recipeList = getRecipeList();
  localStorage.setItem('recipeList', JSON.stringify([...recipeList, recipe]));
  return recipe;
}

export function deleteRecipeStorage(recipe) {
  const recipeList = getRecipeList();
  const recipes = recipeList.filter((rec) => {
    return rec.id !== recipe.id;
  });

  localStorage.setItem('recipeList', JSON.stringify(recipes));

  return true;
}

export function addNewIngredient(selectedId, newName, newId) {
  const recipeList = getRecipeList();
  const updatedList = recipeList.map((list) => {
    if (list.id === selectedId) {
      return {
        ...list,
        ingList: [{ ingredient: newName, id: newId }, ...list.ingList],
      };
    } else {
      return list;
    }
  });

  localStorage.setItem('recipeList', JSON.stringify(updatedList));

  return true;
}

export function changeIngredientName(selectedListId, selectedIng, newName) {
  const recipeList = getRecipeList();

  const updatedList = recipeList.map((recipe) => {
    if (recipe.id === selectedListId) {
      const ingList = recipe.ingList.map((ingredient) => {
        if (ingredient.id === selectedIng.id) {
          return { ...ingredient, ingredient: newName };
        } else {
          return ingredient;
        }
      });

      return { ...recipe, ingList };
    } else {
      return recipe;
    }
  });

  localStorage.setItem('recipeList', JSON.stringify(updatedList));

  return true;
}

//////

export function getShoppingList() {
  return JSON.parse(localStorage.getItem('shoppingList') || '[]');
}

export function addShoppingList(list) {
  const shoppingList = getShoppingList();
  localStorage.setItem('shoppingList', JSON.stringify([...shoppingList, list]));
  return list;
}

export function addNewItem(selectedList, updateName, itemId) {
  const shoppingList = getShoppingList();
  const selectedShoppingList = shoppingList.find((list) => {
    return list.listName === selectedList.listName;
  });

  const updatedList = shoppingList.map((list) => {
    if (list.id === selectedShoppingList.id) {
      return {
        ...list,
        ingredientsList: [
          ...list.ingredientsList,
          { ingredient: updateName, id: itemId },
        ],
      };
    } else {
      return list;
    }
  });

  localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  return true;
}

export function editListName(selectedListId, newName) {
  const shoppingList = getShoppingList();

  const updateList = shoppingList.map((list) => {
    if (list.id === selectedListId) {
      return { ...list, listName: newName };
    } else {
      return list;
    }
  });

  localStorage.setItem('shoppingList', JSON.stringify(updateList));
  return true;
}

export function deleteList(listToDelete) {
  const shoppingList = getShoppingList();
  const updateList = shoppingList.filter((list) => {
    return list.id !== listToDelete.id;
  });

  localStorage.setItem('shoppingList', JSON.stringify(updateList));
  return true;
}

export function editIngredient(ing, activeList, newName) {
  const shoppingList = getShoppingList();
  const updateList = shoppingList.map((list) => {
    if (list.id === activeList.id) {
      const ingredientsList = list.ingredientsList.map((ingredient) => {
        if (ingredient.id === ing.id && newName.length > 0) {
          return { ...ingredient, ingredient: newName };
        } else {
          return ingredient;
        }
      });
      return { ...list, ingredientsList };
    } else {
      return list;
    }
  });

  localStorage.setItem('shoppingList', JSON.stringify(updateList));
  return true;
}

export function deleteIngredient(ingToDelete, activePage) {
  const shoppingList = getShoppingList();
  const updatedList = shoppingList.map((list) => {
    if (list.id === activePage.id) {
      const ingredientsList = list.ingredientsList.filter((ingredient) => {
        return ingredient.id !== ingToDelete.id;
      });

      return { ...list, ingredientsList };
    } else {
      return list;
    }
  });

  localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  return true;
}

export function transfereIngredients(activePage, selectedIngList) {
  const shoppingList = getShoppingList();
  const selectedList = shoppingList.filter((list) => {
    return list.id === activePage.id;
  });

  const updatedList = shoppingList.map((list) => {
    if (list.id === selectedList[0].id) {
      return {
        ...list,
        ingredientsList: [...list.ingredientsList, ...selectedIngList],
      };
    } else {
      return list;
    }
  });

  localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  return true;
}

export function rearrangeIngredients(activeList, copyListItems) {
  const shoppingList = getShoppingList();
  const updatedList = shoppingList.map((list) => {
    if (list.id === activeList.id) {
      return { ...activeList, ingredientsList: copyListItems };
    } else {
      return list;
    }
  });

  localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  return true;
}
