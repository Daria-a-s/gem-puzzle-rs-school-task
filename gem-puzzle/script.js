import Common from './common.js';
import { changeSize, init } from './init.js';
import { tick } from './timer.js';
import shuffle from './shuffle.js';
import images from './images.js';
import './styles.css';

window.addEventListener('DOMContentLoaded', () => {
  images.items.sort(() => Math.random() - 0.5);
  shuffle();
  init.initial();

  window.addEventListener('resize', () => {
    changeSize();
  });

  setInterval(() => {
    if (Common.start === true) { tick(); }
  }, 1000);
});
