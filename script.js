//Declare all the variables
const template = document.querySelector("#templatestudents");
const main = document.querySelector("#mainslisttudents");
let mylink = "http://petlatkea.dk/2019/students1991.json";

document.addEventListener("DOMContentLoaded", start);
//Add the template, main, link, modal..

//Call function start
function start() {
  console.log("Run function start");
}

//Create a varible for first name -split the fullname
//Create a variable for last name - split the fullname
const fullName = "???";
const firstName = fullName.split(" ");
console.log("First name: " + firstName[0]);
const lastName = fullName.split(" ");
console.log("Last name: " + lastName[1]);

//Load the data from JSON
function loadData(link) {
  fetch(link)
    .then(e => e.json())
    .then(data => shadow(data));
}

// Display the student list using a "show" function
function shadow(data) {
  data.forEach(student => {
    //Select the content from template using a clone
    let clone = template.cloneNode(true).content;
    //Change the content from template
    clone.querySelector(".studentname").textContent =
      "Name: " + student.fullname;
    clone.querySelector(".studenthome").textContent = "House: " + student.house;
    //Apend the clone to the main
    main.appendChild(clone);
    console.log(student);
  });
}
//Load the data
loadData(mylink);

//create a filter for first name, last name, house
