document.getElementById("calculate").addEventListener("click", function () {
    // Get input values
    const age = parseFloat(document.getElementById("age").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const lifestyle = parseFloat(document.getElementById("lifestyle").value);
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const bodyType = document.querySelector('input[name="bodyType"]:checked').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Validate inputs
    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
        document.getElementById("result").innerText = "Please enter valid age, height, and weight!";
        return;
    }

    // BMR cslculation
    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Male formula
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161; // Female formula
    }

    // calorie calculation
    let calorieIntake = bmr * lifestyle;

    if (goal === "lose") {
        calorieIntake *= 0.8; 
    } else if (goal === "gain") {
        calorieIntake *= 1.2;
    }

    if (bodyType === "ectomorph") {
        calorieIntake *= 1.1; 
    } else if (bodyType === "endomorph") {
        calorieIntake *= 0.9; 
    }

    calorieIntake = Math.round(calorieIntake);

    // Resu;t
    document.getElementById("result").innerText = `Your recommended daily calorie intake is ${calorieIntake} kcal.`;

    // Call function to show food suggestions 
    showFoodSuggestions(calorieIntake);
});

function showFoodSuggestions(calories) {
    let foods = {
        proteins: [
            { name: "Whey Protein", calories: 120, quantity: "1 scoop (30g)" },
            { name: "Chicken Breast", calories: 165, quantity: "100g" }
        ],
        carbs: [
            { name: "Rice", calories: 206, quantity: "1 cup cooked" },
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

    let foodSuggestions = "Here are some food suggestions based on your calorie intake:\n\n";
    

    foodSuggestions += "Protein Sources:\n";
    foods.proteins.forEach(food => {
        let servings = Math.floor(proteinCalories / food.calories); 
        foodSuggestions += `${food.name}: ${servings} servings of ${food.quantity}\n`;
    });

    foodSuggestions += "\nCarbohydrate Sources:\n";
    foods.carbs.forEach(food => {
        let servings = Math.floor(carbCalories / food.calories); 
        foodSuggestions += `${food.name}: ${servings} servings of ${food.quantity}\n`;
    });

    foodSuggestions += "\nFat Sources:\n";
    foods.fats.forEach(food => {
        let servings = Math.floor(fatCalories / food.calories); 
        foodSuggestions += `${food.name}: ${servings} servings of ${food.quantity}\n`;
    });

    // Display suggestions
    document.getElementById("foodSuggestions").innerText = foodSuggestions;
}
