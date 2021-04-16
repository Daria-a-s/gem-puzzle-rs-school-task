import Common from './common.js';
import reset from './reset.js';
import { resArray } from './resultArray.js';

// массив для работы с local storage
let topScoreArray = [];
// разделы таблицы
for (let i = 0; i < 6; i += 1) {
  topScoreArray[i] = [];
}
// элемент селект для выбора размера поля
export function selectSize() {
  const fragment = document.createDocumentFragment();
  const selectField = document.createElement('select');
  selectField.classList.add('selectSize');

  for (let i = 3; i < 9; i += 1) {
    const item = document.createElement('option');
    item.value = i;
    item.textContent = `${i}x${i}`;
    if (i === Common.size) item.setAttribute('selected', true);
    selectField.appendChild(item);
  }

  fragment.appendChild(selectField);
  selectField.addEventListener('change', () => {
    Common.size = selectField.value;
  });

  return fragment;
}
// список лучших результатов
export function topScore() {
  const fragment = document.createDocumentFragment();
  const main = document.getElementsByClassName('all');
  const topScoreButton = document.createElement('button');
  topScoreButton.textContent = 'Top Score';

  const resume = document.createElement('button');
  resume.textContent = 'Back';

  const label = document.createElement('h2');
  label.textContent = 'Top Score';

  const rowColumns = document.createElement('div');
  rowColumns.classList.add('rowCol');

  // id настройкам
  const sett = document.createElement('div');
  sett.id = 'topScore';

  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.visibility = 'hidden';

  resume.addEventListener('click', () => {
    while (document.getElementsByTagName('li').length !== 0) {
      document.getElementsByTagName('li')[0].remove();
    }
    main[0].removeChild(overlay);
    main[0].removeChild(sett);
  });

  const selectField = document.createElement('select');
  selectField.classList.add('selectSize');

  for (let i = 3; i < 9; i += 1) {
    const item = document.createElement('option');
    item.value = i;
    item.textContent = `${i}x${i}`;
    if (i === Common.size) item.setAttribute('selected', true);
    selectField.appendChild(item);
  }

  const topList = document.createElement('ol');

  topScoreArray = localStorage.getItem('arrayTop') || topScoreArray;
  if (localStorage.getItem('arrayTop') !== null) {
    topScoreArray = JSON.parse(topScoreArray);
  }

  for (let i = 0; i < topScoreArray[Common.size - 3].length; i += 1) {
    const listItem = document.createElement('li');
    listItem.textContent = topScoreArray[Common.size - 1][i];
  }

  sett.appendChild(selectField);
  sett.appendChild(label);
  sett.appendChild(topList);
  sett.appendChild(resume);

  selectField.addEventListener('change', () => {
    while (document.getElementsByTagName('li').length !== 0) {
      document.getElementsByTagName('li')[0].remove();
    }
    resume.remove();
    topScoreArray = localStorage.getItem('arrayTop') || topScoreArray;
    if (localStorage.getItem('arrayTop') !== null) {
      topScoreArray = JSON.parse(topScoreArray);
    }

    sett.appendChild(topList);
    for (let i = 0; i < topScoreArray[selectField.value - 3].length; i += 1) {
      const firstEl = 0;
      const secondEl = 1;
      const listItem = document.createElement('li');
      const movesCount = document.createElement('span');
      movesCount.textContent = topScoreArray[selectField.value - 3][i][firstEl];
      const timeCount = document.createElement('span');
      timeCount.textContent = topScoreArray[selectField.value - 3][i][secondEl];
      listItem.appendChild(movesCount);
      listItem.appendChild(timeCount);
      topList.appendChild(listItem);
    }

    sett.appendChild(selectField);
    sett.appendChild(label);
    sett.appendChild(topList);
    sett.appendChild(resume);
  });

  topScoreButton.addEventListener('click', () => {
    if (document.getElementsByTagName('ol').length !== 0) {
      document.getElementsByTagName('ol')[0].remove();
    }
    resume.remove();
    topScoreArray = localStorage.getItem('arrayTop') || topScoreArray;
    if (localStorage.getItem('arrayTop') !== null) {
      topScoreArray = JSON.parse(topScoreArray);
    }

    sett.appendChild(topList);
    for (let i = 0; i < topScoreArray[selectField.value - 3].length; i += 1) {
      const firstEl = 0;
      const secondEl = 1;
      const listItem = document.createElement('li');
      const movesCount = document.createElement('span');
      movesCount.textContent = topScoreArray[selectField.value - 3][i][firstEl];
      const timeCount = document.createElement('span');
      timeCount.textContent = topScoreArray[selectField.value - 3][i][secondEl];
      listItem.appendChild(movesCount);
      listItem.appendChild(timeCount);
      topList.appendChild(listItem);
    }

    sett.appendChild(selectField);
    sett.appendChild(label);
    sett.appendChild(topList);
    sett.appendChild(resume);
    main[0].appendChild(overlay);
    main[0].appendChild(sett);
    overlay.style.visibility = 'visible';
    sett.classList.add('settings-open');
  });

  fragment.appendChild(topScoreButton);
  return fragment;
}
// счетчик ходов
export function countMove() {
  const fragment = document.createDocumentFragment();
  const countField = document.createElement('div');
  countField.classList.add('timer');
  const label = document.createElement('span');
  const count = document.createElement('span');
  count.classList.add('time');
  count.textContent = Common.moves;
  label.textContent = 'Moves';

  countField.appendChild(label);
  countField.appendChild(count);
  fragment.appendChild(countField);
  return fragment;
}
// добавляем иконку
export const createIconHTML = (iconName) => `<i class='material-icons'>${iconName}</i>`;
// включение/выключение звука движения фишек
export function turnSound() {
  const fragment = document.createDocumentFragment();
  const soundButton = document.createElement('button');
  if (Common.sound) soundButton.innerHTML = createIconHTML('volume_up');
  else soundButton.innerHTML = createIconHTML('volume_off');

  soundButton.classList.add('soundButton');

  soundButton.addEventListener('click', () => {
    Common.sound = !Common.sound;
    if (!Common.sound) soundButton.innerHTML = createIconHTML('volume_off');
    else soundButton.innerHTML = createIconHTML('volume_up');
  });

  fragment.appendChild(soundButton);

  return fragment;
}
// проверка на победу
export function wonGame(arr) {
  const congrats = document.createElement('p');
  // кнопка resume

  // id настройкам
  const sett = document.createElement('div');
  sett.id = 'congradulations';
  // overlay
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.visibility = 'hidden';

  if (arr.every((v, i) => v === resArray.items[i])) {
    overlay.style.visibility = 'visible';
    setTimeout(() => {
      sett.classList.add('settings-open');
    }, 100);
    congrats.textContent = `Ура! Вы решили головоломку за ${Math.trunc(
      Common.sec / 60,
    )}:${Common.sec % 60} и ${Common.moves} ходов`;
    topScoreArray = JSON.parse(localStorage.getItem('arrayTop')) || topScoreArray;
    const buffer = [];
    buffer.push(Common.moves);
    buffer.push(`${Math.trunc(Common.sec / 60)}:${Common.sec % 60}`);
    topScoreArray[Common.size - 3].push(buffer);
    topScoreArray[Common.size - 3].sort((a, b) => a[0] - b[0]);
    if (topScoreArray[Common.size - 3].length > 10) {
      topScoreArray[Common.size - 3].splice(10, 1);
    }
    localStorage.setItem('arrayTop', JSON.stringify(topScoreArray));
    topScore();
    sett.appendChild(reset());
    sett.appendChild(congrats);
    document.body.appendChild(overlay);

    document.body.appendChild(sett);
    Common.start = !Common.start;
  }
}
