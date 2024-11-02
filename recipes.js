import { ids, idsSet } from "./ids.js";
import { assert } from "./assert.js";
import { Ingredients } from "./ingredients.js";
import { Recipe } from "./recipe.js";
import { Spice } from "./spices.js";

export const recipes = [
  new Recipe('Крошка-батат с шпинатом и шампиньонами')
    .setId(ids.id1)
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
    .setId(ids.id2)
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
    .setId(ids.id3)
    .addDescription('Описание рецепта 3')
    .addIngredient(Ingredients.Tomato)
    .addIngredient(Ingredients.Carrot)
    .addSpice(Spice.Pepper)
    .addSpice(Spice.Salt)
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

const setToCheck = new Set();
for (let i = 0; i < recipes.length; i++) {
  const recipe = recipes[i];

  if (setToCheck.has(recipe.id)) {
    console.warn(`Рецепт ${recipe.name} использует уже занятый ранее id: ${recipe.id}`);
    throw new TypeError('Найден рецепт с уже занятым id');
  }

  setToCheck.add(recipe.id);
}

export function getRecipe(id) {
  assert.isIn(id, idsSet, 'Предоставленный id рецепта не найдет в списке доступных id');

  for (let recipe of recipes) {
    if (recipe.id === id) {
      return recipe;
    }
  }

  throw new Error('По заданному id не найдено ни одного рецепта');
}
