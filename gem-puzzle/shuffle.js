import array from './currentArray.js';
import Common from './common.js';
// случайное перемешивание фишек
export default function shuffle() {
  array.items.sort(() => Math.random() - 0.5);
  let count = 0;

  for (let i = 0; i < array.items.length; i += 1) {
    if (array.items[i] !== 'empty') {
      for (let j = i + 1; j < array.items.length; j += 1) {
        if (array.items[j] !== 'empty') if (array.items[i] < array.items[j]) count += 1;
      }
    }
  }
  let result;
  if (Common.size % 2 === 0) {
    result = count + Math.trunc(array.items.indexOf('empty') / Common.size);
  } else {
    result = count;
  }

  if (result % 2 === 1) {
    shuffle();
  }
}
