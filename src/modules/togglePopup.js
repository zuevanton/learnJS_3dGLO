import animate from "./animate";

const togglePopup = () =>{
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content');

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      if(document.documentElement.clientWidth > 768) {
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
        if(document.documentElement.clientWidth > 768) {
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

export default togglePopup;