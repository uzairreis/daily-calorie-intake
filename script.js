document.getElementById("calculate").addEventListener("click", function () {
    const age = parseFloat(document.getElementById("age").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const lifestyle = parseFloat(document.getElementById("lifestyle").value);
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const bodyType = document.querySelector('input[name="bodyType"]:checked').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
        document.getElementById("result").innerText = "Please enter valid age, height, and weight!";
        return;
    }

    let bmr = gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    let calorieIntake = bmr * lifestyle;

    if (goal === "lose") calorieIntake *= 0.8;
    else if (goal === "gain") calorieIntake *= 1.2;

    if (bodyType === "ectomorph") calorieIntake *= 1.1;
    else if (bodyType === "endomorph") calorieIntake *= 0.9;

    calorieIntake = Math.round(calorieIntake);
    document.getElementById("result").innerText = `Your recommended daily calorie intake is ${calorieIntake} kcal.`;
    showFoodSuggestions(calorieIntake);
});

function showFoodSuggestions(calories) {
    const foods = {
        proteins: [
            { name: "Whey Protein", calories: 120, quantity: "1 scoop" },
            { name: "Chicken Breast", calories: 165, quantity: "100g" }
        ],
        carbs: [
            { name: "Rice", calories: 206, quantity: "1 cup" },
            { name: "Roti", calories: 100, quantity: "1 medium" },
            { name: "Banana", calories: 105, quantity: "1 medium" }
        ],
        fats: [
            { name: "Peanut Butter", calories: 190, quantity: "2 tbsp" },
            { name: "Apple", calories: 95, quantity: "1 medium" }
        ]
    };

    let proteinCalories = calories * 0.3;
    let carbCalories = calories * 0.5;
    let fatCalories = calories * 0.2;

    let foodSuggestions = "Here are some food suggestions:\n\nProteins:\n";
    foods.proteins.forEach(food => {
        foodSuggestions += `${food.name}: ${Math.floor(proteinCalories / food.calories)} servings of ${food.quantity}\n`;
    });

    foodSuggestions += "\nCarbohydrates:\n";
    foods.carbs.forEach(food => {
        foodSuggestions += `${food.name}: ${Math.floor(carbCalories / food.calories)} servings of ${food.quantity}\n`;
    });

    foodSuggestions += "\nFats:\n";
    foods.fats.forEach(food => {
        foodSuggestions += `${food.name}: ${Math.floor(fatCalories / food.calories)} servings of ${food.quantity}\n`;
    });

    document.getElementById("foodSuggestions").innerText = foodSuggestions;
}

document.getElementById("suggestMeals").addEventListener("click", function () {
    const preference = document.getElementById("preference").value;

    const meals = {
        vegetarian: {
            breakfast: "Oatmeal with fruits",
            lunch: "Vegetable wrap with hummus",
            dinner: "Paneer curry with rice"
        },
        vegan: {
            breakfast: "Smoothie bowl",
            lunch: "Quinoa salad",
            dinner: "Tofu stir-fry with broccoli"
        },
        "non-vegetarian": {
            breakfast: "Eggs with toast",
            lunch: "Chicken salad",
            dinner: "Grilled salmon with vegetables"
        }
    };

    const selectedMeals = meals[preference] || {};
    const mealSuggestions = `
        Breakfast: ${selectedMeals.breakfast || "Not available"}
        \nLunch: ${selectedMeals.lunch || "Not available"}
        \nDinner: ${selectedMeals.dinner || "Not available"}
    `;

    document.getElementById("mealSuggestions").innerText = mealSuggestions;
});
