import Common from './common.js';

// генерирует массив фишек размером size*size
export function generateArray(size) {
  const arr = [];
  for (let i = 1; i < size * size; i += 1) {
    arr.push(i);
  }
  arr.push('empty');
  return arr;
}

// итоговое состояние массива фишек, с которым сравниваем текущее положение фишек на поле
export const resArray = {
  items: [],
};

resArray.items = generateArray(Common.size);
