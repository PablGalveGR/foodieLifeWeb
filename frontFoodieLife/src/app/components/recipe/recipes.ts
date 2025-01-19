import { Recipe } from "./Recipe";
import { IngredientQuantity } from "./IngredientQuantity";
export let recipes: Recipe[] = [
    {
        id: 0,
        name: "Chicken Noodle Casserole",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed eleifend mauris. Pellentesque convallis nulla augue, nec gravida mauris dignissim vel.',
        ingredients: [{
            id: 0,
            quantity: 1
        },
        {
            id: 3,
            quantity: 6
        },
        {
            id: 2,
            quantity: 4
        },
        ],
        steps: [{
            id: 0,
            idRecipe: 0,
            order: 1,
            title: "Ingredient treatment",
            body: "Clean an cut the ingredients",
            time: 0
        },
        {
            id: 1,
            idRecipe: 0,
            order: 2,
            title: "Boling",
            body: "Boil the ingredients",
            time: 0
        }],
        difficulty: 0,
        picture: "",
        price: 0
    },
    {
        id: 1,
        name: "Tuna patties",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed eleifend mauris. Pellentesque convallis nulla augue, nec gravida mauris dignissim vel.',
        ingredients: [{
            id: 4,
            quantity: 2
        },
        {
            id: 1,
            quantity: 5
        },
        {
            id: 0,
            quantity: 3
        },
        ],
        steps: [{
            id: 0,
            idRecipe: 1,
            order: 1,
            title: "Ingredient treatment",
            body: "Clean an cut the ingredients",
            time: 0
        },
        {
            id: 1,
            idRecipe: 1,
            order: 2,
            title: "Boling",
            body: "Boil the ingredients",
            time: 0
        }],
        difficulty: 0,
        picture: "",
        price: 0
    },
    {
        id: 2,
        name: "Turkey stew",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed eleifend mauris. Pellentesque convallis nulla augue, nec gravida mauris dignissim vel.',
        ingredients: [{
            id: 0,
            quantity: 0.5
        },
        {
            id: 1,
            quantity: 6
        },
        {
            id: 4,
            quantity: 4
        },
        ],
        steps: [{
            id: 0,
            idRecipe: 2,
            order: 1,
            title: "Ingredient treatment",
            body: "Clean an cut the ingredients",
            time: 0
        },
        {
            id: 1,
            idRecipe: 2,
            order: 2,
            title: "Boling",
            body: "Boil the ingredients",
            time: 0
        }],
        difficulty: 0,
        picture: "",
        price: 0
    },
    {
        id: 3,
        name: "Onion Soup",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed eleifend mauris. Pellentesque convallis nulla augue, nec gravida mauris dignissim vel.',
        ingredients: [{
            id: 3,
            quantity: 3
        },
        {
            id: 1,
            quantity: 6
        },
        {
            id: 2,
            quantity: 1.5
        },
        ],
        steps: [{
            id: 0,
            idRecipe: 0,
            order: 1,
            title: "Ingredient treatment",
            body: "Clean an cut the ingredients",
            time: 0
        },
        {
            id: 1,
            idRecipe: 0,
            order: 2,
            title: "Boling",
            body: "Boil the ingredients",
            time: 0
        }],
        difficulty: 0,
        picture: "",
        price: 0
    },
    {
        id: 4,
        name: "Cheese Potatoes",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed eleifend mauris. Pellentesque convallis nulla augue, nec gravida mauris dignissim vel.',
        ingredients: [{
            id: 6,
            quantity: 3
        },
        {
            id: 1,
            quantity: 6
        },
        ],
        steps: [{
            id: 0,
            idRecipe: 0,
            order: 1,
            title: "Ingredient treatment",
            body: "Clean an cut the ingredients",
            time: 0
        },
        {
            id: 1,
            idRecipe: 0,
            order: 2,
            title: "Boling",
            body: "Boil the ingredients",
            time: 0
        }],
        difficulty: 0,
        picture: "",
        price: 0
    }
]