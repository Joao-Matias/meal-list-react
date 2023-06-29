export function getRecipeList() {
  return JSON.parse(localStorage.getItem('recipeList') || '[]');
}

export function addRecipe(recipe) {
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

//////

export function getShoppingList() {
  return JSON.parse(localStorage.getItem('shoppingList') || '[]');
}

export function addList(list) {
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
