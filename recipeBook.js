const API_KEY = "69c7e209a1a74db092e68915ca1e84e9";
const recipeListEl = document.getElementById("recipe_list");

function displayRecipes(recipes) {
	recipeListEl.innerHTML = "";
	recipes.forEach((recipe) => {
		const recipeItemEl = document.createElement("li");
		recipeItemEl.classList.add("recipe_item");
		recipeImageEl = document.createElement("img");
		recipeImageEl.src = recipe.image;
		recipeImageEl.alt = "recipe image";
		recipeTitleEl = document.createElement("h2");
		recipeTitleEl.innerText = recipe.title;
		recipeIngredientEl = document.createElement("p");
		recipeIngredientEl.innerHTML = `
		<strong>Ingredients:</stong> ${recipe.extendedIngredients
			.map((ingredients) => ingredients.original)
			.join(", ")}
		`;
		recipeLinkEl = document.createElement("a");
		recipeLinkEl.href = recipe.sourceUrl;
		recipeLinkEl.innerText = "View Recipe";

		recipeItemEl.appendChild(recipeImageEl);
		recipeItemEl.appendChild(recipeTitleEl);
		recipeItemEl.appendChild(recipeIngredientEl);
		recipeItemEl.appendChild(recipeLinkEl);
		recipeListEl.appendChild(recipeItemEl);
	});
}

async function getRecipes() {
	const response = await fetch(
		`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
	);

	const data = await response.json();

	return data.recipes;
}

// initialize the function
async function init() {
	const recipes = await getRecipes();

	displayRecipes(recipes);
	console.log(recipes);
}
// we callback the init function.
init();
