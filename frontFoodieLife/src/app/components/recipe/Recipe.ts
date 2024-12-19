import { Ingredient } from "../ingredient/Ingredient";
import { IngredientQuantity } from "./IngredientQuantity";
import { Step } from "./Step";
export interface Recipe{
    id: number,
    name: string,
    ingredients : number[],
    ingredientQuantity: IngredientQuantity[],
    steps: Step[]
}