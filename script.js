"use strict";

document.addEventListener("DOMContentLoaded", start);

//select DOM elements
const template = document.querySelector("#templatestudents");
const main = document.querySelector("#mainslisttudents");
const myLink = "http://petlatkea.dk/2019/students1991.json";
const modal = document.querySelector(".modal-bg");
const article = document.querySelector(".modal-content");
const close = document.querySelector(".close");
const menu = document.querySelector("#menu");
const allHouses = document.querySelector("#all");
const gryffindorHouse = document.querySelector("#Gryffindor");
const hufflepuffHouse = document.querySelector("#Hufflepuff");
const ravenclawHouse = document.querySelector("#Ravenclaw");
const slytherinHouse = document.querySelector("#Slytherin");
const dropDownMenu = document.querySelector("#sort-by");
let broom = document.querySelector("#broom");
const gryff = "Gryffindor";
const huffle = "Hufflepuff";
const raven = "Ravenclaw";
const slyth = "Slytherin";

// Create a function to display the students list without sorting
function start() {
  console.log("Start function");
  // Call loadStudents function
  loadStudentsList(noSort);
}
// Create a function for fetching the students list
function loadStudentsList(sortBy) {
  // delete the previous list if any
  main.innerHTML = "";

  //Fetch json data
  fetch(myLink)
    .then(e => e.json())
    .then(function(students) {
      // sort the students list
      sortBy(students);
      // then display them
      students.forEach(showData);
    });
}

// No sorting
function noSort(students) {
  return students;
}
// Sort by first name
function sortByFirstName(students) {
  students.sort(function(student1, student2) {
    if (student1.fullname > student2.fullname) return 1;
    if (student1.fullname < student2.fullname) return -1;
  });
}

// Sort by last name
function sortByLastName(students) {
  students.sort(compare);
}

// Compare last Name
function compare(a, b) {
  var splitA = a.fullname.split(" ");
  var splitB = b.fullname.split(" ");
  var lastA = splitA[splitA.length - 1];
  var lastB = splitB[splitB.length - 1];

  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  return 0;
}

// Sort by house
function sortByHouse(students) {
  students.sort(function(student1, student2) {
    if (student1.house > student2.house) return 1;
    if (student1.house < student2.house) return -1;
  });
}

//Global eventListeners
dropDownMenu.addEventListener("change", sortByData);

// Load the correct values from dropdown
function sortByData(event) {
  if (dropDownMenu.value == "none") {
    loadStudentsList(noSort);
  } else if (dropDownMenu.value == "firstName") {
    loadStudentsList(sortByFirstName);
  } else if (dropDownMenu.value == "lastName") {
    loadStudentsList(sortByLastName);
  } else if (dropDownMenu.value == "house") {
    loadStudentsList(sortByHouse);
  }
}

// // Create a function for filter the houses
// function filterHouses(house) {
//   // // delete the previous list if any
//   main.innerHTML = "";
//   //Display the students list
// }

//Create a function to display the students
function showData(student) {
  //Select the content from template using a clone
  let clone = template.cloneNode(true).content;

  let fullName = student.fullname;
  let firstName = fullName.split(" ");
  let lastName = fullName.split(" ");

  //Change the content from template
  clone.querySelector(".firstname").textContent = "First name: " + firstName[0];
  clone.querySelector(".lastname").textContent = "Last name: " + lastName[1];
  clone.querySelector(".studenthome").textContent = "House: " + student.house;

  clone.querySelectorAll("button").forEach(students => {
    students.addEventListener("click", showDetails);
  });
  // Pass the data into the modal when clicked
  clone.querySelector(".button").addEventListener("click", function() {
    // function to set the modal - we don't have to fetch again
    // we are passing directly all the data
    showDetails(fullName, student.house);
  });

  //Apend the clone to the main
  main.appendChild(clone);
}
//MODAL
function showDetails(name, house) {
  modal.querySelector(".name-modal").textContent = "Name: " + name;
  modal.querySelector(".details-modal").textContent = "House:" + house;
  modal.classList.remove("hide");

  if (house == gryff) {
    article.style.backgroundColor = "red";
    article.style.color = "#fff";
    // article.querySelector(".gryffimg").src =
    //   "https://vignette.wikia.nocookie.net/harrypotter/images/b/b1/Gryffindor_ClearBG.png/revision/latest/scale-to-width-down/700?cb=20190222162949";
  } //  else {
  //   article.querySelector(".gryffimg").style.display = "none";
  // }

  if (house == huffle) {
    article.style.backgroundColor = "orange";
    article.style.color = "#fff";
    // article.querySelector(".huffleimg").src =
    //   "https://vignette.wikia.nocookie.net/harrypotter/images/0/06/Hufflepuff_ClearBG.png/revision/latest?cb=20161020182518";
  } // else {
  //   article.querySelector(".huffleimg").style.display = "none";
  // }

  if (house == slyth) {
    article.style.backgroundColor = "green";
    article.style.color = "#fff";
    // article.querySelector(".slythimg").src =
    //   "https://vignette.wikia.nocookie.net/harrypotter/images/0/00/Slytherin_ClearBG.png/revision/latest/scale-to-width-down/700?cb=20161020182557";
  } //  else {
  //   article.querySelector(".slythimg").style.display = "none";
  // }

  if (house == raven) {
    article.style.backgroundColor = "blue";
    article.style.color = "#fff";
    //   article.querySelector(".ravenimg").src =
    //     "https://vignette.wikia.nocookie.net/harrypotter/images/4/4e/RavenclawCrest.png/revision/latest/scale-to-width-down/700?cb=20161020182442";
  } //  else {
  //   article.querySelector(".ravenimg").style.display = "none";
  // }
}

//Add global eventListeners
close.addEventListener("click", () => modal.classList.add("hide"));

broom.addEventListener("mouseover", glow);
broom.addEventListener("click", fly);

function glow() {
  console.log("glow");
  broom.classList.add("glowing");
}

broom.addEventListener("mouseout", glowOut);

function glowOut() {
  broom.classList.remove("glowing");
}

function fly() {
  console.log("fly");
  broom.classList.remove("glowing");
  broom.classList.add("fly");
}
