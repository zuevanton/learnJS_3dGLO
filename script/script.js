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
    const menu = document.querySelector('menu');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    document.addEventListener('click', (e) => {
      let target = e.target;
      if(target.hash || target.parentNode.classList.contains('menu') || target.classList.contains('menu')){
        handlerMenu();
      } else if(!target.closest('menu') && menu.classList.contains('active-menu')){
        menu.classList.remove('active-menu');
      }
    });
  };
  toggleMenu();

  // popup
  const togglePopup = () =>{
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
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
      popup.addEventListener('click', (e)=>{
        let target = e.target;
        if(target.classList.contains('popup-close')){
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
        } else {
          target = target.closest('.popup-content');
          if(!target){
            popup.style.display = 'none';
          }
        }

      });
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


  const slowAnchorLink = () => {
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
  };
  slowAnchorLink();

  // табы
  const tabs = () =>{
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++){
        if(index === i){
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };

    tabHeader.addEventListener('click', (e) => {
      let target = e.target.closest('.service-header-tab');
      if(target){
        tab.forEach((item, i) => {
          if(item === target){
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  // слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          slider = document.querySelector('.portfolio-content'),
          dotsWrap = document.querySelector('.portfolio-dots');
    let currentSlide = 0,
        interval,
        dot;

    const createDots = () => {
      slide.forEach((elem, index) =>{
        let newDot = document.createElement('li');
        newDot.classList.add('dot');
        if(index === 0){
          newDot.classList.add('dot-active');
        }
        dotsWrap.append(newDot);
      });
      dot = document.querySelectorAll('.dot');
    };
    createDots();
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (e) => {
      e.preventDefault();
      let target = e.target;

      if(!target.matches('#arrow-right, #arrow-left, .dot')){
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')){
        currentSlide++;
      } else if(target.matches('#arrow-left')){
        currentSlide--;
      } else if (target.matches('.dot')){
        dot.forEach((elem, index) => {
          if (elem === target){
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length){
        currentSlide = 0;
      }
      if(currentSlide < 0){
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', e => {
      if(e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', e =>{
      if(e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
        startSlide();
      }
    });
    startSlide(1500);
  };
  slider();

  // changing command photo's
  const changeCommandPhoto = () => {
    const commandContainer = document.getElementById('command');
    let srcTemp = '';
    commandContainer.addEventListener('mouseover', (e) => {
      let target = e.target;
      if(!target.matches('.command__photo')){
        return;
      }
      srcTemp = target.src;
      target.src = target.dataset.img;
    });

    commandContainer.addEventListener('mouseout', (e) => {
      let target = e.target;
      if(!target.matches('.command__photo')){
        return;
      }
      target.src = srcTemp;
    });
  };
  changeCommandPhoto();

  // validate calculator inputs type number
  const validateInputsTypeNumber = () => {
    const calc = document.getElementById('calc');
    calc.addEventListener('input', (e) => {
      let target = e.target;
      if(!target.matches('input[type="number"')){
        return
      }
      target.value = target.value.replace(/\D/g, '');
    });
  };
  validateInputsTypeNumber();
});
