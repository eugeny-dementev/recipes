import { getRoute } from "./router.js";
import { renderIngredientTags, renderModeSelector, renderRecipes } from "./ui.js";

const pageContext = getRoute();

console.log('route:', pageContext);

renderModeSelector();
renderIngredientTags();
renderRecipes();
