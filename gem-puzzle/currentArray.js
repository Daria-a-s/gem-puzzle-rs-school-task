import { generateArray } from './resultArray.js';
import Common from './common.js';

// массив текущего положения фишек
const array = {
  items: [],
};

export default array;

window.addEventListener('DOMContentLoaded', () => {
  array.items = generateArray(Common.size);
});
