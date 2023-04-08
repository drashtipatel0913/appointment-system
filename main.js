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
      hours = hours - 12;
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