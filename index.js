import { getRoute, PAGES } from "./router.js";
import { renderIngredientTags, renderModeSelector, renderRecipe, renderRecipes, setPageTitle } from "./ui.js";

const pageContext = getRoute();

console.log('route:', pageContext);

switch (pageContext.page) {
  case PAGES.MAIN: {
    console.log('Отрисовка главной страницы')
    renderMainPage();
    break;
  }
  case PAGES.RECIPE: {
    console.log('Отрисовка страницы рецепта')
    renderRecipePage();
    break;
  }
}

function renderMainPage() {
  setPageTitle('Рецепты');
  renderModeSelector();
  renderIngredientTags();
  renderRecipes();
}

function renderRecipePage() {
  renderRecipe();
}
