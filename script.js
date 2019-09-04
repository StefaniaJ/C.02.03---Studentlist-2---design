"use strict";

//select DOM elements
const template = document.querySelector("#templatestudents");
const main = document.querySelector("#mainslisttudents");
const myLink = "http://petlatkea.dk/2019/students1991.json";
const modal = document.querySelector(".modal-bg");
const article = document.querySelector(".modal-content");
const close = document.querySelector(".close");

//Add global eventListeners
close.addEventListener("click", () => modal.classList.add("hide"));

//Fetch json data
fetch(myLink)
  .then(e => e.json())
  .then(data => data.forEach(showData));

//Function showData
function showData(students) {
  //Select the content from template using a clone
  let clone = template.cloneNode(true).content;

  //Create a varible for first name -split the fullname
  //Create a variable for last name - split the fullname
  let fullName = students.fullname;
  let firstName = fullName.split(" ");
  let lastName = fullName.split(" ");

  //Change the content from template
  clone.querySelector(".firstname").textContent = "First name: " + firstName[0];
  clone.querySelector(".lastname").textContent = "Last name: " + lastName[1];
  //   clone.querySelector(".fullname").textContent =
  //     "First name: " + firstName[0] + " Last name: " + lastName[1];
  clone.querySelector(".studenthome").textContent = "House: " + students.house;
  //   clone.querySelector("button").addEventListener("click", () => {
  //     fetch(myLink)
  //       .then(e => e.json())
  //       .then(data => showDetails(data));
  //   });

  clone.querySelectorAll("button").forEach(students => {
    students.addEventListener("click", showDetails);
  });

  // if (filter == students.house || filter == "All houses") {
  //   clone.querySelector;
  // }

  //Apend the clone to the main
  main.appendChild(clone);
}
//MODAL
function showDetails(students) {
  console.log(students);
  modal.querySelector(".name-modal").textContent = "Name :" + students.fullname;
  modal.querySelector(".details-modal").textContent =
    "House: " + students.house;
  modal.classList.remove("hide");
}
