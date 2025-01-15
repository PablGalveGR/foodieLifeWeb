import { Ingredient } from "../ingredient/Ingredient";
import { IngredientQuantity } from "./IngredientQuantity";
import { Step } from "./Step";
export interface Recipe {
  id: number,
  name: string,
  description: string,
  ingredients: IngredientQuantity[],
  steps: Step[],
  difficulty: number,
  picture : string,
  price: number
}