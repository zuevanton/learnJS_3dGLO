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

export default changeCommandPhoto;