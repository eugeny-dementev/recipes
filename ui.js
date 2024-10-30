import { Ingredients } from "./ingredients.js";
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

    anyButton.classList.remove('selected');
    allButton.classList.remove('selected');

    button.classList.add('selected');
  }

  anyButton.addEventListener('click', switchMode);
  allButton.addEventListener('click', switchMode);

  modeContainer.appendChild(anyButton);
  modeContainer.appendChild(allButton);
}

