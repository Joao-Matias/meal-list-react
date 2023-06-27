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
