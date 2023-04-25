export function getRecipeList() {
  return JSON.parse(localStorage.getItem('recipeList') || '[]');
}

export function addRecipe(recipe) {
  const recipeList = getRecipeList();
  localStorage.setItem('recipeList', JSON.stringify([...recipeList, recipe]));
  return recipe;
}