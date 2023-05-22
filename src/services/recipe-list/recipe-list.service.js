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
