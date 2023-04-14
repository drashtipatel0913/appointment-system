"use strict";

const $ = function (id) {
   return document.getElementById(id);
};

const now = new Date(); //current date & time
let hours = now.getHours(); //current Hours
let minutes = now.getMinutes(); //current Minutes

// returns local current date
function getCurrentDay() {
   let options = { day: 'numeric', month: 'long', year: 'numeric' };
   return now.toLocaleDateString('en-US', options);
}

// returns current time
function getCurrentTime() {

   // Updates meridiem based on the hour
   let meridiem = "";
   if (hours >= 12) {
      meridiem = "PM";
   } else {
      meridiem = "AM";
   }

   return `${padSingleDigit(hours)} : ${padSingleDigit(minutes)}  ${meridiem}`;
}

// adds zero before single digits
function padSingleDigit(num) {
   if (num < 10) {
      return "0" + num;
   } else {
      return num;
   }
};

// displays the current date
const currentDay = $("currentDay");
currentDay.innerHTML = `${getCurrentDay()}`;

// displays the current time
const currentTime = $("currentTime");
currentTime.innerHTML = getCurrentTime();

// saves all the form input data to variables 
const _name = $('name');
const purpose = $('purpose');
const appointmentForm = $('appointmentForm');
const dateInput = $('date');
const timeInput = $('time');


// focuses on name as user comes to the page
_name.focus();

// returns true if all the form field has value otherwise returns fals
function isFormValid() {
   let isFormValid = true;

   if (_name.value == '') {
      isFormValid = false;
   } else if (purpose.value == '') {
      isFormValid = false;
   } else if (dateInput.value == '') {
      isFormValid = false;
   } else if (timeInput.value == '') {
      isFormValid = false;
   }

   return isFormValid;
}

// Store the appointment data in a local storage
appointmentForm.addEventListener("submit", (event) => {

   event.preventDefault();

   // checks if form is valid or not
   const formIsValid = isFormValid();

   if (formIsValid) {

      let _name = $("name").value;
      let purpose = $("purpose").value;
      let dateInput = $("date").value;
      let timeInput = $("time").value;

      let appointment = {
         _name: _name,
         purpose: purpose,
         dateInput: dateInput,
         timeInput: timeInput
      };

      createAppointment(appointment);

   } else {
      // alerts user all the fields are required
      alert('All the form fields are required');
   }
});

// Create an empty array to store the appointments in local storage
let appointments = [];

// Create function to add the new appointment to the appointments array and save it to local storage
function createAppointment(appointment) {

   const index = $("submit").getAttribute("data-index");
   if (index) {
      // If data-index attribute is set, update the existing appointment
      appointments[index] = appointment;
   } else {
      // Otherwise, add the new appointment to the array
      appointments.push(appointment);
   }
   localStorage.setItem("appointments", JSON.stringify(appointments));

   displayAppointments();
   resetForm();
}

function displayAppointments() {
   let tableBody = $("tbody");
   let tableRows = "";

   appointments = JSON.parse(localStorage.getItem("appointments")) || [];

   if (appointments.length === 0) {
      tableRows = "<tr><td colspan='5'>No appointments yet</td></tr>";
   } else {
      appointments.forEach(function (appointment, index) {
         tableRows += `
         <tr>
           <td>${appointment._name}</td>
           <td>${appointment.purpose}</td>
           <td>${appointment.dateInput}</td>
           <td>${appointment.timeInput}</td>
           <td>
             <button class="btn btn-primary" onclick="editAppointment(${index})">Edit</button>
             <button class="btn btn-danger" onclick="deleteAppointment(${index})">Delete</button>
           </td>
         </tr>
       `;
      });
   }
   tableBody.innerHTML = tableRows;
}



// function displayAppointments() {
//    let tableBody = $("tbody");
//    let tableRows = "";

//    appointments = JSON.parse(localStorage.getItem("appointments")) || [];

//    appointments.forEach(function (appointment, index) {
//       tableRows += `
//       <tr>
//         <td>${appointment._name}</td>
//         <td>${appointment.purpose}</td>
//         <td>${appointment.dateInput}</td>
//         <td>${appointment.timeInput}</td>
//         <td>
//           <button class="btn btn-primary" onclick="editAppointment(${index})">Edit</button>
//           <button class="btn btn-danger" onclick="deleteAppointment(${index})">Delete</button>
//         </td>
//       </tr>
//     `;
//    });

//    tableBody.innerHTML = tableRows;
// }

function editAppointment(index) {
   let appointment = appointments[index];
   $("name").value = appointment._name;
   $("purpose").value = appointment.purpose;
   $("date").value = appointment.dateInput;
   $("time").value = appointment.timeInput;
   $("submit").innerHTML = "edit";
   $("submit").setAttribute("data-index", index);
}

function deleteAppointment(index) {
   if (confirm("Are you sure you want to delete this appointment?")) {
      appointments.splice(index, 1);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      displayAppointments();
   }
}

function resetForm() {
   $("name").value = "";
   $("purpose").value = "";
   $("date").value = "";
   $("time").value = "";
   $("submit").setAttribute("data-mode", "create");
   $("submit").removeAttribute("data-index");
}

// Check if appointments exist in local storage when the page loads
window.onload = function () {
   let storedAppointments = JSON.parse(localStorage.getItem("appointments"));
   if (storedAppointments) {
      appointments = storedAppointments;
      displayAppointments();
   }
}

