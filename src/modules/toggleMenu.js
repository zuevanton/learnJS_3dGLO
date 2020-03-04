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

export default toggleMenu;