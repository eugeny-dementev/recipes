import { Ingredients } from "./ingredients.js";
import { Recipe } from "./recipe.js";

export const recipes = [
  new Recipe('Крошка-батат с шпинатом и шампиньонами')
    .addDescription('Половинка батата с начинкой')
    .addIngredient(Ingredients.SweetPotato)
    .addIngredient(Ingredients.SourCream)
    .addIngredient(Ingredients.Spinach)
    .addIngredient(Ingredients.Champignon)
    .addStep({
      position: 1,
      description: 'Батат порезать на половинки, проткнуть вилкой, смазать маслом, солью и перцем',
    })
    .addStep({
      position: 2,
      description: 'Поставить батат в духовку на 180 на 40 минут',
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

