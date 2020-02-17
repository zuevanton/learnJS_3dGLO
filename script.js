window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  function createDate() {
    let date = new Date(),
      hour = date.getHours(),
      newYear = new Date(2021, 0, 1),
      optionsForTime = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      },
      optionsForWeekDay = {
        weekday: 'long'
      },
      createdDate = document.getElementById('date');
    function getGreeting() {
      let greet = '';
      if(hour > 3 && hour < 12){
        greet = 'Доброе утро';
      }
      else if(hour >= 12 && hour < 17){
        greet = 'Добрый день';
      }
      else if(hour >= 17 && hour < 23){
        greet = 'Добрый вечер';
      }
      else {
        greet = 'Доброй ночи';
      }
      return greet;
    }
    function getWeekDay() {
      return date.toLocaleString('ru', optionsForWeekDay)
    }
    function getNowTime() {
      return date.toLocaleString('en-US', optionsForTime)
    }
    function getNewYearCount() {
      return Math.ceil((newYear.getTime() - date.getTime()) / 1000 / 60 / 60 / 24)
    }

    createdDate.innerHTML = `${getGreeting()}<br>
    Сегодня: ${getWeekDay()}<br>
    Текущее время: ${getNowTime()}<br>
    До нового года осталось: ${getNewYearCount()} дней
    `;
  }
  setInterval(createDate, 1000);
});

