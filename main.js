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
function padSingleDigit (num) {
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