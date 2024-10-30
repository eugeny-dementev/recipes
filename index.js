import { Ingredients } from "./ingredients.js";
import { Recipe } from "./recipe.js";
import { renderIngredientTags, renderModeSelector } from "./ui.js";


const recipes = [
  new Recipe('Рецепт номер 1')
    .addDescription('Описание рецепта 1')
    .addIngredient(Ingredients.Potato)
    .addStep({
      position: 1,
      description: 'Порезать картошку',
    })
    .get(),
  {
    name: 'Рецепт номер 2',
    ingrediehts: [
      Ingredients.Tomato,
      Ingredients.Potato,
    ],
    description: 'Какой то описание 2',
    steps: [
      'Шаг 1: что-то',
      'Шаг 2: что-то',
      'Шаг 3: что-то',
    ],
  },
];

console.log('Site with recipes', recipes)

renderModeSelector();
renderIngredientTags();

function renderer(recipes) {

}

function validator(recipe) { }

