// Получение элементов DOM
const foodNameInput = document.getElementById("foodName");
const caloriesInput = document.getElementById("calories");
const addFoodButton = document.getElementById("addFood");
const foodList = document.getElementById("foodItems");
const filterInput = document.getElementById("filter");
const filterButton = document.getElementById("filterButton");
const clearDataButton = document.getElementById("clearData");
const totalCaloriesSpan = document.getElementById("totalCalories");
const dailyGoalSpan = document.getElementById("dailyGoal");
const warningText = document.getElementById("warning");
const sortByNameButton = document.getElementById("sortByName");
const sortByCaloriesButton = document.getElementById("sortByCalories");

sortByNameButton.addEventListener("click", () => {
  foodData.sort((a, b) => a.name.localeCompare(b.name));
  displayFoodItems();
});

sortByCaloriesButton.addEventListener("click", () => {
  foodData.sort((a, b) => a.calories - b.calories);
  displayFoodItems();
});

filterButton.addEventListener("click", () => {
  const filterText = filterInput.value.toLowerCase();
  const filteredItems = foodData.filter((item) =>
    item.name.toLowerCase().includes(filterText)
  );
  displayFoodItems(filteredItems);
});

// Инициализация данных из localStorage, если они есть
let foodData = JSON.parse(localStorage.getItem("foodData")) || [];
let totalCalories = 0;

// Изменение цели калорий на день
const changeGoalButton = document.getElementById("changeGoal");

changeGoalButton.addEventListener("click", () => {
  const newGoal = prompt("Введите новую цель калорийности:");

  if (newGoal !== null && !isNaN(newGoal) && newGoal >= 0) {
    localStorage.setItem("dailyGoal", newGoal);
    dailyGoalSpan.textContent = newGoal;
  }
  checkDailyGoalExceeded();
});

// Функция для отображения продуктов в списке
function displayFoodItems(foodArray) {
  foodList.innerHTML = "";
  (foodArray || foodData).forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${item.name}: ${item.calories} калорий <button class="delete" data-index="${index}">Удалить</button>`;
    foodList.appendChild(listItem);
  });
}

// Функция для обновления общего количества калорий
function updateTotalCalories() {
  totalCalories = foodData.reduce((sum, item) => sum + item.calories, 0);
  totalCaloriesSpan.textContent = totalCalories;
}
// Функция для вывода предупреждения о превышении лимита калорий
function checkDailyGoalExceeded() {
  const dailyGoal = parseInt(localStorage.getItem("dailyGoal")) || 2000;

  if (totalCalories > dailyGoal) {
    const exceededAmount = totalCalories - dailyGoal;
    warningText.textContent = `Превышение лимита на ${exceededAmount} калорий!`;
    warningText.style.color = "red";
  } else {
    warningText.textContent = "";
  }
}

// Обработчик добавления продукта
addFoodButton.addEventListener("click", () => {
  const name = foodNameInput.value;
  const calories = parseInt(caloriesInput.value);

  if (name && !isNaN(calories)) {
    foodData.push({ name, calories });
    localStorage.setItem("foodData", JSON.stringify(foodData));
    foodNameInput.value = "";
    caloriesInput.value = "";
    displayFoodItems();
    updateTotalCalories();
    checkDailyGoalExceeded();
  }
});

// Обработчик удаления продукта
foodList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const index = event.target.getAttribute("data-index");
    foodData.splice(index, 1);
    localStorage.setItem("foodData", JSON.stringify(foodData));
    displayFoodItems();
    updateTotalCalories();
    checkDailyGoalExceeded();
  }
});

// Обработчик фильтрации продуктов
filterButton.addEventListener("click", () => {
  const filterText = filterInput.value.toLowerCase();
  const filteredItems = foodData.filter((item) =>
    item.name.toLowerCase().includes(filterText)
  );
  displayFoodItems(filteredItems);
});

// Обработчик очистки данных
clearDataButton.addEventListener("click", () => {
  foodData = [];
  localStorage.removeItem("foodData");
  displayFoodItems();
  updateTotalCalories();
  checkDailyGoalExceeded();
});

// Инициализация
displayFoodItems();
updateTotalCalories();
