import { Recipe } from "./Recipe";
import { IngredientQuantity } from "./IngredientQuantity";
export let recipes: Recipe[] = [
    {
        id: 0,
        name: "Test1",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed eleifend mauris. Pellentesque convallis nulla augue, nec gravida mauris dignissim vel.',
        ingredients: [{
            id: 0,
            quantity: 200
        },
        {
            id: 1,
            quantity: 6
        },
        {
            id: 2,
            quantity: 77
        },
        ],
        steps: [{
            id: 0,
            idRecipe: 0,
            order: 1,
            title: "Ingredient treatment",
            body: "Clean an cut the ingredients"
        },
        {
            id: 1,
            idRecipe: 0,
            order: 2,
            title: "Boling",
            body: "Boil the ingredients"
        }]
    },
    {
        id: 1,
        name: "Test2",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed eleifend mauris. Pellentesque convallis nulla augue, nec gravida mauris dignissim vel.',
        ingredients: [{
            id: 0,
            quantity: 200
        },
        {
            id: 1,
            quantity: 6
        },
        {
            id: 2,
            quantity: 77
        },
        ],
        steps: [{
            id: 0,
            idRecipe: 1,
            order: 1,
            title: "Ingredient treatment",
            body: "Clean an cut the ingredients"
        },
        {
            id: 1,
            idRecipe: 1,
            order: 2,
            title: "Boling",
            body: "Boil the ingredients"
        }]
    },
    {
        id: 2,
        name: "Test3",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed eleifend mauris. Pellentesque convallis nulla augue, nec gravida mauris dignissim vel.',
        ingredients: [{
            id: 0,
            quantity: 200
        },
        {
            id: 1,
            quantity: 6
        },
        {
            id: 2,
            quantity: 77
        },
        ],
        steps: [{
            id: 0,
            idRecipe: 2,
            order: 1,
            title: "Ingredient treatment",
            body: "Clean an cut the ingredients"
        },
        {
            id: 1,
            idRecipe: 2,
            order: 2,
            title: "Boling",
            body: "Boil the ingredients"
        }]
    }
]