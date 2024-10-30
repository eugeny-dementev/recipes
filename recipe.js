import { Ingredients } from "./ingredients.js";
import { assert } from "./assert.js";

export class Recipe {
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

    this.#steps.push()

    return this;
  }

  get() {
    return {
      name: this.#name,
      description: this.#description,
      ingredients: this.#ingredients,
      steps: this.#steps,
    };
  }
}
