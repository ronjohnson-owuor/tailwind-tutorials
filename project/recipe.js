
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
searchInput.addEventListener("input", () => { 
    searchTerm = searchInput.value;
    console.log(searchTerm);
    meals =[];
    bringFood();
    searchInput.value =searchTerm;
});

 

// display the meals to the frontend
const displayMeals = (meals) =>{
    console.log(meals);
 var mealList = document.querySelector("#mealList");
 mealList.innerHTML = "";
 if(meals !== null){
    for (let i = 0; i < meals.length; i++) {

    let mealBox = document.createElement("div");
    let mealimage = document.createElement("img");
    let mealHeading = document.createElement("h1");
   
    mealBox.setAttribute("class","cursor-pointer mx-5 h-[200px] object-contain flex items-center shadow-md my-5 hover:text-blue-950");
     mealimage.setAttribute("class","cursor-pointer mx-1 h-[200px] object-contain flex items-center shadow-md my-5");
    mealHeading.setAttribute("class","mx-8 text-gray-300 text-base hover:text-blue-950");
   mealimage.src =meals[i].strMealThumb;
   mealHeading.innerHTML =meals[i].strMeal;


//    add onclick event to the mealbox 
mealBox.addEventListener("click", () => {
    controlMealPopup(meals[i]);
  });
  mealHeading.addEventListener("click", () => {
    controlMealPopup(meals[i]);
  });
//    append the list to html
mealBox.append(mealimage,mealHeading);   
mealList.append(mealBox);

}
} else{
    let mealHeading = document.createElement("h1");
    mealHeading.setAttribute("class","mx-8 text-gray-300 text-base hover:text-blue-950");
    mealHeading.innerHTML ="Damn! that meal cannot be found 🧐";
    mealList.append(mealHeading);
}


}











 
// close the meal popup
var popup = document.getElementById("overlay");
document.getElementById("close").addEventListener( "click" , closePopup);
function closePopup(){
   popup.style.display = "none";

  //  clear the procedure box and the  ingridients box
   const procedureBox = document.querySelector(".instructions");
   procedureBox.innerHTML = "";
   const ingridientsBox = document.querySelector(".ingridients");
   ingridientsBox.innerHTML = "";
}


function controlMealPopup(thismeal){
popup.style.display = "block";
popup.setAttribute("class","overlay fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50");
var mealArea = document.getElementById("area");
var mealName = document.getElementById("foodName");
var mealcategory = document.getElementById("category");
var mealImage = document.getElementById("image");


const object = thismeal;

// showing the instruction
const procedureBox = document.querySelector(".instructions");
let procedure = document.createElement("p");
procedure.innerHTML = thismeal.strInstructions;
procedureBox.append(procedure);


// listing the ingridients
for (let i = 1; i <= 20; i++) {
  const ingredient = object[`strIngredient${i}`];
  if (ingredient) {
    let ingridients = document.createElement("p");
    ingridients.innerHTML = ` ${i}. ${ingredient} <br/>`;
   const ingridientsBox = document.querySelector(".ingridients");
   ingridientsBox.append(ingridients);
    console.log(ingridients);
  } else {
    break; // stop looping if no more ingredients are found
  }
}


mealArea.innerHTML = thismeal.strArea;
mealName.innerHTML =thismeal.strMeal;
mealcategory.innerHTML = thismeal.strCategory;
mealImage.src = thismeal.strMealThumb;
mealImage.title = thismeal.strMeal;

}

