import { assert } from './assert.js';
import { idsSet } from './ids.js';

const PAGES = {
  RECIPE: 'recipe',
  MAIN: 'index',
}

/**
 *
 * Route для открытия рецепта требует статичного значения
 * по которому рецепт всегда можно будет найти при повторном открытии страницы
 *
 * У нас нет базы поэтому эти id должны быть назначены вручную при создании
 * рецепта. Их либо вводить вручную либо брать из заранее созданного пула значений
 *
 * Пул значений проще в поддержке поэтому сгенерирован файл ids.js
 *
 * @returns {object} route
 * @returns {string} route.page
 * @returns {string?} route.id - only for recipe page
 *
 */
export function getRoute() {
  let params = new URLSearchParams(location.search);

  if (params.has('recipe')) {
    const id = params.get('recipe');
    assert.isIn(id, idsSet, 'Предоставленный id рецепта не найдет в списке доступных id');

    return {
      page: PAGES.RECIPE,
      id,
    };
  }

  return {
    page: PAGES.MAIN,
  };
}
