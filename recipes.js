import { Ingredients } from "./ingredients.js";
import { Recipe } from "./recipe.js";

export const recipes = [
  new Recipe('Рецепт номер 1')
    .addDescription('Описание рецепта 1')
    .addIngredient(Ingredients.Potato)
    .addStep({
      position: 1,
      description: 'Порезать картошку',
    })
    .get(),

  new Recipe('Рецепт номер 2')
    .addDescription('Описание рецепта 2')
    .addIngredient(Ingredients.Potato)
    .addIngredient(Ingredients.Tomato)
    .addStep({
      position: 1,
      description: 'Порезать картошку',
    })
    .addStep({
      position: 2,
      description: 'Порезать томаты',
    })
    .get(),

  new Recipe('Рецепт номер 3')
    .addDescription('Описание рецепта 3')
    .addIngredient(Ingredients.Tomato)
    .addIngredient(Ingredients.Carrot)
    .addStep({
      position: 3,
      description: 'Порезать морковку',
    })
    .addStep({
      position: 2,
      description: 'Порезать томаты',
      after: 3,
    })
    .get(),
];

