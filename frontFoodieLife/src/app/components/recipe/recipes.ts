import { Recipe } from "./Recipe";
import { IngredientQuantity } from "./IngredientQuantity";
export let recipes: Recipe[] = [{
    id: 0,
    name: "Test1",
    ingredients: [1, 0, 2],
    ingredientQuantity: [
        {
            idIngredient: 0,
            quantity: 200
        },
        {
            idIngredient: 1,
            quantity: 6
        },
        {
            idIngredient: 2,
            quantity: 77
        },
    ],
    steps: [{
        id: 0,
        idRecipe: 0,
        order: 1,
        title: "Ingredient treatment",
        body: "clean an cut the ingredients"
    },
    {
        id: 1,
        idRecipe: 0,
        order: 2,
        title: "Boling",
        body: "Boil the ingredients"
    }]
}]