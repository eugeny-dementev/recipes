import { assert } from "./assert.js";
import { idsSet } from "./ids.js";
import { Ingredients } from "./ingredients.js";

export class Recipe {
  #id
  #name
  #description
  #ingredients
  #steps

  /**
  * @param {string} name
  */
  constructor(name) {
    assert.isString(name, 'Имя рецепта должно быть не пустым');

    this.#name = name;
    this.#steps = [];
    this.#ingredients = [];
  }

  setId(id) {
    assert.isIn(id, idsSet, 'Предоставленный id рецепта не найдет в списке доступных id');
    this.#id = id;
  }

  /**
   * @param {string} ingredients
   */
  addIngredient(ingredient) {
    assert.oneOf(ingredient, Object.values(Ingredients), 'Ингредиент должен быть одим из значений объекта Ingredients');

    this.#ingredients.push(ingredient);

    return this;
  }

  /**
  * @param {string} description
  */
  addDescription(description) {
    assert.isString(description, 'Описание рецепта не должно быть пустым');
    this.#description = description;

    return this;
  }

  /**
  * @param {object} step
  * @param {string} step.description
  * @param {number} step.id - Уникальный номер шага
  * @param {string?} step.before - Подготовить к шагу
  * @param {string?} step.after - Требуется для начала этого шага
  */
  addStep(step) {
    assert.isObject(step, 'Шаг должен быть объектом с параметрами');
    assert.isString(step.description, 'Ошисание шага рецепта не должно быть пустым');

    this.#steps.push(step);

    return this;
  }

  get() {
    assert.isFalse(this.#id === undefined, 'Рецепту обязательно нужно назначить id из объекта ids');
    assert.isFalse(this.#ingredients.length === 0, 'В рецепте должен быть как минимум один ингредиент для приготовления');
    assert.isFalse(this.#steps.length === 0, 'В рецепте должен быть как минимум один шаг приготовления');

    return {
      name: this.#name,
      description: this.#description,
      ingredients: this.#ingredients,
      steps: this.#steps,
    };
  }
}
