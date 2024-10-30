import { assert } from "./assert.js";
import { Ingredients } from "./ingredients.js";
import { recipes } from "./recipes.js";
import { state } from "./state.js";

export function renderIngredientTags() {
  const tagsContainer = document.getElementById('tags');
  for (const ingredient of Object.values(Ingredients)) {
    const button = document.createElement('button')
    button.classList.add('ingredient_button');
    button.innerHTML = ingredient;
    button.addEventListener('click', () => {
      if (button.classList.contains('selected')) {
        state.selectedIngredients.delete(ingredient);
        button.classList.remove('selected');
      } else {
        state.selectedIngredients.add(ingredient);
        button.classList.add('selected');
      }

      console.log('Выбранные ингредиенты:', state.selectedIngredients);

      renderRecipes();
    });

    tagsContainer.appendChild(button)
  }
}

export function renderModeSelector() {
  const modeContainer = document.getElementById('mode');

  const anyButton = document.createElement('button');
  const allButton = document.createElement('button');

  anyButton.classList.add('mode_button');
  anyButton.classList.add('selected');

  allButton.classList.add('mode_button');

  anyButton.innerHTML = 'Любой из выбранных';
  allButton.innerHTML = 'Каждый из выбранных';

  anyButton.id = 'any_mode';
  allButton.id = 'all_mode';

  function switchMode(event) {
    const button = event.target;

    state.searchMode = button.id;

    anyButton.classList.remove('selected');
    allButton.classList.remove('selected');

    button.classList.add('selected');

    renderRecipes();
  }

  anyButton.addEventListener('click', switchMode);
  allButton.addEventListener('click', switchMode);

  modeContainer.appendChild(anyButton);
  modeContainer.appendChild(allButton);
}

export function renderRecipes() {
  const recipesContainer = document.getElementById('recipes');
  recipesContainer.innerHTML = '';

  let counter = 0; // render no more than 3 recipes on the page

  for (let i = 0; i < recipes.length && counter < 3; i++) {
    const recipe = recipes[i];

    const renderCurrentRecipe = showRecipe(state.searchMode, recipe.ingredients);

    console.log({ renderCurrentRecipe, size: state.selectedIngredients.size, ingredients: recipe.ingredients.join() });

    if (!renderCurrentRecipe) {
      continue;
    }

    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('recipe_container');

    const titleEl = document.createElement('div');
    titleEl.classList.add('recipe_title');
    titleEl.innerHTML = recipe.name;
    recipeContainer.appendChild(titleEl);

    const descriptionEl = document.createElement('div');
    descriptionEl.classList.add('recipe_description');
    descriptionEl.innerHTML = recipe.name;
    recipeContainer.appendChild(descriptionEl);

    recipesContainer.appendChild(recipeContainer);

    counter++; // count each rendered recipe
  }
}

function showRecipe(mode, ingredients) {
  assert.oneOf(mode, ['any_mode', 'all_mode'], 'Есть только два режима поиска');

  if (state.selectedIngredients.size === 0) {
    return true;
  }

  if (mode === 'any_mode') {
    for (const ingredient of ingredients) {
      if (state.selectedIngredients.has(ingredient)) {
        return true
      }
    }

    return false;
  }

  if (mode === 'all_mode') {
    for (const ingredient of state.selectedIngredients.values()) {
      if (!ingredients.includes(ingredient)) {
        return false;
      }
    }

    return true;
  }

  return false;
}
