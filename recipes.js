import { ids, idsSet } from "./ids.js";
import { assert } from "./assert.js";
import { Ingredient } from "./ingredients.js";
import { Recipe } from "./recipe.js";
import { Spice } from "./spices.js";

export const recipes = [
  new Recipe('Крошка-батат с шпинатом и шампиньонами')
    .setId(ids.id1)
    .addDescription('Половинка батата с начинкой')
    .addIngredient(Ingredient.SweetPotato)
    .addIngredient(Ingredient.SourCream)
    .addIngredient(Ingredient.Spinach)
    .addIngredient(Ingredient.Champignon)
    .addStep({
      position: 1,
      description: 'Батат порезать на половинки, проткнуть вилкой, смазать маслом, солью и перцем',
    })
    .addStep({
      position: 2,
      description: 'Поставить батат в духовку на 180 на 40 минут',
    })
    .get(),

  new Recipe('Панкейки')
    .setId(ids.id2)
    .addDescription('Самые базовые панкейки на свете')
    .addIngredient(Ingredient.Egg)
    .addIngredient(Ingredient.Milk)
    .addStep({
      position: 1,
      description: 'Перемешать',
    })
    .addStep({
      position: 2,
      description: 'Жарить',
    })
    .get(),

  new Recipe('Рикотники')
    .setId(ids.id3)
    .addDescription('Описание рецепта 3')
    .addIngredient(Ingredient.Tomato)
    .addIngredient(Ingredient.Carrot)
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
