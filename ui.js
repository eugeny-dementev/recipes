import { assert } from "./assert.js";
import { Ingredient } from "./ingredients.js";
import { recipes } from "./recipes.js";
import { state } from "./state.js";

export function setPageTitle(title) {
  assert.isString(title, 'Заголовок должен быть строкой');

  const titleTag = document.getElementById('title');
  titleTag.innerHTML = title;
}

export function renderIngredientTags() {
  const tagsSection = document.getElementById('tags_section');
  tagsSection.classList.remove('display_none');

  const tagsContainer = document.getElementById('tags');

  for (const ingredient of Object.values(Ingredient)) {
    const button = document.createElement('button')
    button.classList.add('tags__el');
    button.innerHTML = ingredient;
    button.addEventListener('click', () => {
      if (button.classList.contains('tags__el--selected')) {
        state.selectedIngredients.delete(ingredient);
        button.classList.remove('tags__el--selected');
      } else {
        state.selectedIngredients.add(ingredient);
        button.classList.add('tags__el--selected');
      }

      console.log('Выбранные ингредиенты:', state.selectedIngredients);

      renderRecipes();
    });

    tagsContainer.appendChild(button)
  }
}

export function renderModeSelector() {
  const modeSection = document.getElementById('mode_section');
  modeSection.classList.remove('display_none');

  const modeContainer = document.getElementById('mode');

  const anyButton = document.createElement('button');
  const allButton = document.createElement('button');

  anyButton.classList.add('mode__button');
  anyButton.classList.add('mode__button--selected');

  allButton.classList.add('mode__button');

  anyButton.innerHTML = 'Любой из выбранных';
  allButton.innerHTML = 'Каждый из выбранных';

  anyButton.id = 'any_mode';
  allButton.id = 'all_mode';

  function switchMode(event) {
    const button = event.target;

    state.searchMode = button.id;

    anyButton.classList.remove('mode__button--selected');
    allButton.classList.remove('mode__button--selected');

    button.classList.add('mode__button--selected');

    renderRecipes();
  }

  anyButton.addEventListener('click', switchMode);
  allButton.addEventListener('click', switchMode);

  modeContainer.appendChild(anyButton);
  modeContainer.appendChild(allButton);
}

export function renderRecipes() {
  const recipesSection = document.getElementById('recipes_section');
  recipesSection.classList.remove('display_none');

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
    recipeContainer.classList.add('recipes__item', 'recipe');
    recipeContainer.addEventListener('click', () => {
      location.assign(`${location.href}?recipe=${recipe.id}`);
    });

    const titleEl = document.createElement('h2');
    titleEl.classList.add('recipe__title');
    titleEl.innerHTML = recipe.name;
    recipeContainer.appendChild(titleEl);

    const descriptionEl = document.createElement('p');
    descriptionEl.classList.add('recipe__description');
    descriptionEl.innerHTML = recipe.description;
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

export function renderRecipe(recipe) {
  const recipeSection = document.getElementById('recipe_section');
  recipeSection.classList.remove('display_none');

  const recipeContainer = document.createElement('div');
  recipeContainer.classList.add('recipe__container');
  recipeSection.appendChild(recipeContainer);

  const recipeDescription = document.createElement('div');
  recipeDescription.classList.add('recipe__description');
  recipeDescription.innerHTML = 'Описание: ' + recipe.description;
  recipeContainer.appendChild(recipeDescription);

  const recipeIngredientTitle = document.createElement('p');
  recipeIngredientTitle.textContent = 'Ингридиенты:';
  recipeContainer.appendChild(recipeIngredientTitle);

  const recipeIngredients = document.createElement('ul');
  recipeIngredients.classList.add('recipe__ingredients');

  for (const ingredient of recipe.ingredients) {
    const recipeIngredient = document.createElement('li');
    recipeIngredient.classList.add('recipe__ingredient');
    recipeIngredient.innerHTML = ingredient;
    recipeIngredients.appendChild(recipeIngredient);
  }
  recipeContainer.appendChild(recipeIngredients);

  if (recipe.spices.length > 0) {
    const recipeSpices = document.createElement('div');
    recipeSpices.classList.add('recipe__spices');
    for (const spice of recipe.spices) {
      const recipeSpice = document.createElement('span');
      recipeSpice.classList.add('recipe__spice');
      recipeSpice.innerHTML = spice;
      recipeSpices.appendChild(recipeSpice);
    }
    recipeContainer.appendChild(recipeSpices);
  }

  

  const recipeStepsTitle = document.createElement('p');
  recipeStepsTitle.innerHTML = 'Как готовить:';
  recipeContainer.appendChild(recipeStepsTitle);

  const recipeSteps = document.createElement('ol');
  recipeSteps.classList.add('recipes__steps');

  for (const step of recipe.steps) {
    const recipeStep = document.createElement('li');
    recipeStep.classList.add('recipe__step');
    recipeStep.innerHTML = step.description;
    recipeSteps.appendChild(recipeStep);
  }
  recipeContainer.appendChild(recipeSteps);
}
