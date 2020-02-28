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
    const calc = document.querySelector('.calc-block');
    calc.addEventListener('input', (e) => {
      let target = e.target;
      if(!target.matches('input[type="number"')){
        return
      }
      target.value = target.value.replace(/\D/g, '');
    });
  };
  validateInputsTypeNumber();

  // calculator
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');
    let totalTemp = 0;
    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

      if(calcCount.value > 1){
        countValue += (calcCount.value - 1)/ 10;
      }

      if(calcDay.value && calcDay.value < 5) {
        dayValue *= 2
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if(typeValue && squareValue){
        total = price * typeValue * squareValue * countValue * dayValue;
        animateNumbers(totalTemp, total, totalValue);
        totalTemp = total;
      }

    };

    calcBlock.addEventListener('change', (e) => {
      const target = e.target;

      if(target === calcType || target === calcCount || target === calcSquare || target === calcDay) {
        countSum();
      }
    });
  };
  calc();

  const animateNumbers = (start, end, element, duration = 1200) => {
    let range = end - start,
        startTime = new Date().getTime(),
        endTime = startTime + duration;

    const step = () => {

      let now = new Date().getTime(),
          remaining = Math.max((endTime - now) / duration, 0),
          value = Math.round(end - (remaining * range));

      element.textContent = value;

      if(value !== end || !isNaN(value)) {
        requestAnimationFrame(step);
      }
    };
    step();
  };

  // send ajax-form
  const sendForm = () => {
    const errorMsg = 'что то пошло не так',
          loadMsg = '',
          successMsg = 'Спасибо! мы скоро с вами свяжемся';

    const statusMsg = document.createElement('div');
    statusMsg.style.cssText = 'font-size: 2rem; color: blue;';

    document.body.addEventListener('submit', e => {
      e.preventDefault();
      if(e.target.tagName.toLowerCase() !== 'form'){
        return;
      }
      const loading = e.target.querySelector('.loading');
      loading.style.display = 'block';
      statusMsg.textContent = loadMsg;

      e.target.appendChild(statusMsg);
      const formData = new FormData(e.target);
      let body = {};
      for(let value of formData.entries()){
        body[value[0]] = value[1];
      }
      postData(body, ()=> {
        statusMsg.textContent = successMsg;
          loading.style.display = '';
      }, (error) => {
        statusMsg.textContent = errorMsg;
        console.error(error);
        loading.style.display = '';
      },
        () =>{
          e.target.querySelectorAll('input').forEach(input => input.value = '');
        });

    });


    const postData = (body, outputData, errorData, clearInputs) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', ()=> {
        if(request.readyState !== 4){
          return;
        }
        if(request.status === 200) {
          outputData();
          clearInputs();
        } else {
          errorData(request.status);
        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'multipart/application/json');
      request.send(JSON.stringify(body));
    };

  };
  sendForm();

  // валидация элементов формы
  const validationInputsForm = () => {
    const inputs = document.querySelectorAll('form input');
    inputs.forEach(item => {
      item.addEventListener('input', e => {
        const input = e.target;
        if(input.name === 'user_name' || input.name === 'user_message'){
          input.value = input.value.replace(/[^а-яё ]/i, '');
        }
        if(input.name === 'user_phone'){
          input.value = input.value.replace(/[^\+\d]/, '');
        }
      });
    });
  };
  validationInputsForm();
});
