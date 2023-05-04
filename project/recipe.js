
// toggle the menu items👇🏿
const hamburger = document.getElementById("hamburger");
const toggleMenu = () =>{
document.querySelector(".menu").classList.toggle('hidden');
}
hamburger.addEventListener("click",toggleMenu);





// fetch from the FOODS API
var  meals = [];
const bringFood = async () => {
const lookforfood = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
const foodFound = await  lookforfood.json();
meals.push(foodFound.meals);

displayMeals(meals[0]);

}

// implement the search bar function here;
var searchInput = document.querySelector("#search");
var searchTerm = "";
searchInput.addEventListener("blur", () => { 
    searchTerm = searchInput.value;
    meals =[];
    bringFood();
    searchInput.value = "";
});

// display the meals to the frontend
const displayMeals = (meals) =>{
 var mealList = document.querySelector("#mealList");
console.log(meals);
 if(meals !== null){
    for (let i = 0; i < meals.length; i++) {

    let mealBox = document.createElement("div");
    let mealimage = document.createElement("img");
    let mealHeading = document.createElement("h1");
   
    mealBox.setAttribute("class","cursor-pointer mx-5 h-[200px] object-contain flex items-center shadow-md my-5");
     mealimage.setAttribute("class","cursor-pointer mx-1 h-[200px] object-contain flex items-center shadow-md my-5");
    mealHeading.setAttribute("class","mx-8 text-gray-300 text-base");
   
   //  set various values for image and heading
   mealimage.src =meals[i].strMealThumb;
   mealHeading.innerHTML =meals[i].strMeal;

//    append the list to html
mealBox.append(mealimage,mealHeading);   
mealList.append(mealBox);
}
}
}











