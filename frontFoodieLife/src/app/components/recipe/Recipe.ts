import { Ingredient } from "../ingredient/Ingredient";
import { Step } from "./Step";
export interface Recipe{
    id: number,
    name: string,
    ingredients : number[],
    steps: Step[]
}