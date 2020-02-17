window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60 ) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24;
      return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock() {
      let timer = getTimeRemaining();

      if(timer.timeRemaining > 0) {
        timerHours.textContent = timer.hours.toString().length === 1 ? '0' + timer.hours : timer.hours;
        timerMinutes.textContent = timer.minutes.toString().length === 1 ? '0' + timer.minutes : timer.minutes;
        timerSeconds.textContent = timer.seconds.toString().length === 1 ? '0' + timer.seconds : timer.seconds;
      } else {
        return countTimer(new Date(deadline).getTime() + 86400000);
      }
    }
    updateClock();
  }
  // setTimeout(countTimer, 1000, '23 feb 2020');
  setInterval(countTimer, 1000, '19 feb 2020');
});