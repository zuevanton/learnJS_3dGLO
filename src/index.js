import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/counttimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import slowAnchorLink from './modules/slowAnchorLink';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeCommandPhoto from './modules/changeCommandPhoto';
import validateInputsTypeNumber from './modules/validateInputsTypeNumber';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validationInputsForm from './modules/validationInputsForm';
import sliderCarousel from "./modules/sliderCarusel";
window.addEventListener('DOMContentLoaded', function () {
  'use strict';


  // setTimeout(countTimer, 1000, '23 feb 2020');
  setInterval(countTimer, 1000, '19 feb 2020');

  // меню
  toggleMenu();

  // popup
  togglePopup();

  slowAnchorLink();

  // табы
  tabs();

  // слайдер
  slider();

  // changing command photo's
  changeCommandPhoto();

  // validate calculator inputs type number
  validateInputsTypeNumber();

  // calculator
  calc();

  // send ajax-form
  sendForm();
  // валидация элементов формы
  validationInputsForm();

  // carousel slider bonus
  const sliderNew = new sliderCarousel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    prev: '.arrow-left',
    next: '.arrow-right',
    responsive: [{
        breakpoint: 1024,
        slideToShow: 3
      },
      {
        breakpoint: 768,
        slideToShow: 2
      },
      {
        breakpoint: 576,
        slideToShow: 1
      }]
  });
  sliderNew.init();
});
