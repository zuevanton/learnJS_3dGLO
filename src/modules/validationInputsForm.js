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

export default validationInputsForm;