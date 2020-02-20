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

  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(item => item.addEventListener('click', handlerMenu));
  };
  toggleMenu();

  // popup
  const togglePopup = () =>{
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close'),
          popupContent = document.querySelector('.popup-content');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if(screen.width > 768) {
          popup.style.display = 'block';
          animate({
            duration: 600,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
              popupContent.style.top = progress * 50 - 40 + '%';
            }
          });
        } else {
          popup.style.display = 'block';
        }
      });
    });

    popupClose.addEventListener('click', () =>{
      if(screen.width > 768) {
        animate({
          duration: 300,
          timing(timeFraction) {
            return timeFraction;
          },
          draw(progress) {
            popupContent.style.top = -progress * 70 + '%';
          }
        });
        setTimeout(() => popup.style.display = 'none', 300);
      } else {
        popup.style.display = 'none';
      }
    });
  };
  togglePopup();

  // animation
  function animate({timing, draw, duration}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);

      draw(progress); // отрисовать её

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }

    });

  }

  // плавные якорные ссылки (велосипед)
  // function slowAnchorLink() {
  //   const links = document.querySelectorAll('menu>ul>li>a, main>a img');
  //
  //   links.forEach(item => {
  //     item.addEventListener('click', function (e) {
  //       let id = e.target.hash !== undefined ? e.target.hash.slice(1) : e.target.parentNode.hash.slice(1);
  //       let elemIndent = document.getElementById(id).offsetTop,
  //           windowIndent = window.pageYOffset,
  //           test = elemIndent - windowIndent;
  //       console.log('elem ', elemIndent);
  //       console.log('window ', windowIndent);
  //       console.log('dest ', test);
  //       console.log('  ');
  //       e.preventDefault();
  //       animate({
  //         duration: 800,
  //         timing(timeFraction) {
  //           return timeFraction;
  //         },
  //         draw(progress) {
  //           window.scrollTo(0, progress * elemIndent);
  //         }
  //       });
  //     });
  //   });
  // }

  function slowAnchorLink() {
    const links = document.querySelectorAll('menu>ul>li>a, main>a img');

    links.forEach(item => {
      item.addEventListener('click', e =>{
        const id = e.target.hash !== undefined ? e.target.hash.slice(1) : e.target.parentNode.hash.slice(1),
              elem = document.getElementById(id);
        e.preventDefault();
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      });
    });
  }
  slowAnchorLink();




});

