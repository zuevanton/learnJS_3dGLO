import calc from "./calc";

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

export default animateNumbers;