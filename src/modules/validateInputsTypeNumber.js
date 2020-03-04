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

export default validateInputsTypeNumber;