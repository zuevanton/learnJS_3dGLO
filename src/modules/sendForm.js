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
    postData(body)
      .then((response)=> {
        if(response.status !== 200){
          throw new Error('status not 200');
        }
        statusMsg.textContent = successMsg;
        loading.style.display = '';
        e.target.querySelectorAll('input').forEach(input => input.value = '');
      })
      .catch(error => {
        statusMsg.textContent = errorMsg;
        console.error(error);
        loading.style.display = '';
      })
  });


  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/application/json',
      },
      body: JSON.stringify(body),
    });
  };

};

export default sendForm;