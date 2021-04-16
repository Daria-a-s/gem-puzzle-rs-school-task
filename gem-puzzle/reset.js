import Common from './common.js';
import shuffle from './shuffle.js';
import images from './images.js';
// кнопка новой игры
export default function reset() {
  const fragment = document.createDocumentFragment();
  const resetButton = document.createElement('button');
  resetButton.textContent = 'New Game';
  resetButton.classList.add('reset');

  resetButton.addEventListener('click', () => {
    const main = document.querySelector('.all');
    const sett = document.getElementById('settings');
    sett.classList.remove('settings-open');
    sett.remove();
    const congr = document.getElementById('congradulations');
    if (congr !== null) congr.remove();
    document.getElementById('overlay').remove();
    document.body.removeChild(main);
    images.items.sort(() => Math.random() - 0.5);
    shuffle();
    Common.start = false;
    Common.sec = 0;
    Common.moves = 0;
  });
  fragment.appendChild(resetButton);

  return fragment;
}
