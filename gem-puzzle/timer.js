import Common from './common.js';
// добавить ведущие нули к таймеру
export function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
// установка таймера
export function timer() {
  const fragment = document.createDocumentFragment();
  const timerField = document.createElement('div');
  timerField.classList.add('timer');
  const label = document.createElement('span');
  const time = document.createElement('span');
  time.classList.add('time');
  time.textContent = `${addZero(Math.trunc(Common.sec / 60))}:${addZero(Common.sec % 60)}`;
  label.textContent = 'Time';
  timerField.appendChild(label);
  timerField.appendChild(time);
  fragment.appendChild(timerField);

  return fragment;
}
// счетчик
export function tick() {
  const time = document.querySelector('.time');
  if (Common.start === false) Common.sec = 0;
  if (Common.start === true) {
    Common.sec += 1;
    time.textContent = `${addZero(Math.trunc(Common.sec / 60))}:${addZero(Common.sec % 60)}`;
  }
}
