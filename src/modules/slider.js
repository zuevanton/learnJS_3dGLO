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
      dotsWrap.insertAdjacentElement('beforeend', newDot);
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

export default slider;