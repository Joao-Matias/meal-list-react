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

export function addNewItem(selectedList) {
  const shoppingList = getShoppingList();
  const selectedShoppingList = shoppingList.find((list) => {
    return list.listName === selectedList.listName;
  });

  // localStorage.setItem(
  //   'shoppingList',
  //   JSON.stringify([...selectedShoppingList.ingredientsList, 'ola'])
  // );
}
