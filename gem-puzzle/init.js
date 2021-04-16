import Common from './common.js';
import { timer } from './timer.js';
import { resArray, generateArray } from './resultArray.js';
import reset from './reset.js';
import array from './currentArray.js';
import images from './images.js';
import shuffle from './shuffle.js';
import {
  selectSize, countMove, turnSound, wonGame, topScore,
}
  from './menu.js';

// выбираем картинку
let curImage = images.items[images.imageIndex];

// Устанавливаем размер поля и фишек с отступами между ними в px
function setSize(fieldSize, margin) {
  const blocks = document.getElementsByClassName('game_block');
  const box = document.getElementsByClassName('box');
  box[0].style.width = `${fieldSize}px`;
  box[0].style.height = `${fieldSize}px`;

  for (let i = 0; i < blocks.length; i += 1) {
    blocks[i].style.width = `${(fieldSize - margin * Common.size) / Common.size}px`;
    blocks[i].style.height = `${(fieldSize - margin * Common.size) / Common.size}px`;
  }
}

// устанавливаем размеры поля и отступы в зависимости от размера жкрана
export function changeSize() {
  setSize(860, 10);

  if (window.innerWidth < 1500) {
    setSize(700, 6);
  }
  if (window.innerWidth < 850) {
    setSize(550, 6);
  }
  if (window.innerWidth < 650) {
    setSize(450, 6);
  }
  if (window.innerWidth < 500) {
    setSize(310, 6);
  }
}

export const init = {
  // собирает и закидывает все элементы на страницу
  initial() {
    resArray.items = generateArray(Common.size);
    const main = document.createElement('div');
    const forBox = document.createElement('div');
    const forMenu = document.createElement('div');
    const soundItem = document.createElement('audio');
    soundItem.setAttribute('src', './en.mp3');
    soundItem.id = 'sound';
    main.appendChild(soundItem);

    main.classList.add('all');
    forBox.classList.add('box');
    forMenu.classList.add('menu');

    // Add to DOM
    document.body.appendChild(main);
    forBox.appendChild(this.createElements());
    forMenu.appendChild(turnSound());
    forMenu.appendChild(timer());
    forMenu.appendChild(countMove());
    forMenu.appendChild(this.settings());
    main.appendChild(forMenu);
    main.appendChild(forBox);
    changeSize();

    const box = document.getElementsByClassName('game_block');

    for (let i = 0; i < box.length; i += 1) {
      box[i].addEventListener('click', () => {
        Common.start = true;
      });
    }
    const resetButton = document.getElementsByClassName('reset');
    for (let i = 0; i < resetButton.length; i += 1) {
      resetButton[i].addEventListener('click', () => {
        this.initial();
      });
    }
  },
  // создает фишки в соответствии с ращмером поля
  createElements() {
    if (array.items.length !== resArray.items.length) {
      array.items = generateArray(Common.size);
      shuffle();
    }
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < Common.size * Common.size; i += 1) {
      const blockElement = document.createElement('div');
      blockElement.classList.add('game_block');
      blockElement.draggable = true;
      blockElement.id = String(array.items[i]);
      for (let j = 0; j < Common.size * Common.size; j += 1) {
        if (blockElement.id !== 'empty') {
          blockElement.style.backgroundImage = `url(${images.items[images.imageIndex]})`;
          blockElement.style.backgroundPositionX = `${
            (100 / Common.size) * ((blockElement.id - 1) % Common.size)
          }%`;
          blockElement.style.backgroundPositionY = `${
            (100 / Common.size) * Math.trunc((blockElement.id - 1) / Common.size)
          }%`;
        }
      }
      if (array.items[i] !== 'empty') {
        blockElement.textContent = array.items[i];
      } else blockElement.textContent = '';
      const soundPlay = document.getElementById('sound');
      soundPlay.currentTime = 0;
      blockElement.addEventListener('click', () => {
        if (blockElement.id !== 'empty') {
          this.move(array.items, blockElement);
        }
        wonGame(array.items);
        if (Common.sound) {
          soundPlay.play();
        }
      });
      blockElement.addEventListener('mousedown', () => {
        if (blockElement.id !== 'empty') {
          this.dragBlock(array.items, blockElement);
        }
        wonGame(array.items);
        if (Common.sound) {
          soundPlay.play();
        }
      });

      fragment.appendChild(blockElement);
    }

    return fragment;
  },
  // движение выбранной фишки выбранного массива фишек
  move(arr, block) {
    const main = document.getElementsByClassName('all');
    const index = arr.indexOf(parseInt(block.textContent, 10));
    const curBlock = document.getElementById(block.textContent, 10);
    Common.size = Math.sqrt(resArray.items.length);

    if (index % Common.size === 0) {
      if (
        arr[index + 1] === 'empty'
                || arr[index - Common.size] === 'empty'
                || arr[index + Common.size] === 'empty'
      ) {
        this.dragBlock(arr, curBlock);
        if (arr[index - Common.size] === 'empty') {
          curBlock.classList.toggle('slideUp');
        } else if (arr[index + Common.size] === 'empty') {
          curBlock.classList.toggle('slideDown');
        } else if (arr[index + 1] === 'empty') {
          curBlock.classList.toggle('slideRight');
        }
        setTimeout(() => {
          main[0].parentNode.removeChild(main[0]);
          init.initial();
        }, 100);

        arr.splice(arr.indexOf('empty'), 1, Number(curBlock.textContent));
        arr.splice(index, 1, 'empty');
        Common.moves += 1;
      }
    } else if (index % Common.size === Common.size - 1) {
      if (
        arr[index - 1] === 'empty'
                || arr[index - Common.size] === 'empty'
                || arr[index + Common.size] === 'empty'
      ) {
        this.dragBlock(arr, curBlock);
        if (arr[index - Common.size] === 'empty') {
          curBlock.classList.toggle('slideUp');
        } else if (arr[index + Common.size] === 'empty') {
          curBlock.classList.toggle('slideDown');
        } else if (arr[index - 1] === 'empty') {
          curBlock.classList.toggle('slideLeft');
        }
        setTimeout(() => {
          main[0].parentNode.removeChild(main[0]);
          this.initial();
        }, 100);
        arr.splice(arr.indexOf('empty'), 1, Number(curBlock.textContent));
        arr.splice(index, 1, 'empty');
        Common.moves += 1;
      }
    } else if (
      arr[index - 1] === 'empty'
              || arr[index - Common.size] === 'empty'
              || arr[index + Common.size] === 'empty'
              || arr[index + 1] === 'empty'
    ) {
      if (arr[index - Common.size] === 'empty') {
        curBlock.classList.toggle('slideUp');
      } else if (arr[index + Common.size] === 'empty') {
        curBlock.classList.toggle('slideDown');
      } else if (arr[index - 1] === 'empty') {
        curBlock.classList.toggle('slideLeft');
      } else if (arr[index + 1] === 'empty') {
        curBlock.classList.toggle('slideRight');
      }
      setTimeout(() => {
        main[0].parentNode.removeChild(main[0]);
        this.initial();
      }, 100);

      arr.splice(arr.indexOf('empty'), 1, Number(curBlock.textContent));
      arr.splice(index, 1, 'empty');
      Common.moves += 1;
    }
  },
  // перетаскивает выбранную фишку выбранного массива
  dragBlock(arr, block) {
    const main = document.getElementsByClassName('all');
    const emptyBlock = document.getElementById('empty');
    const index = arr.indexOf(parseInt(block.textContent, 10));
    const curBlock = document.getElementById(block.textContent);
    let prevArr = [].concat(arr);
    Common.size = Math.sqrt(resArray.items.length);

    if (index % Common.size === 0) {
      if (
        arr[index + 1] === 'empty'
                || arr[index - Common.size] === 'empty'
                || arr[index + Common.size] === 'empty'
      ) {
        curBlock.addEventListener('dragstart', () => {
          curBlock.classList.toggle('change-colour');
        });
        curBlock.addEventListener('dragend', () => {
          curBlock.classList.toggle('change-colour');
          setTimeout(() => {
            if (
              arr.indexOf(parseInt(block.textContent, 10))
                      !== prevArr.indexOf(parseInt(block.textContent, 10))
            ) {
              Common.moves += 1;
              prevArr.length = 0;
              prevArr = [].concat(arr);
            }
            main[0].parentNode.removeChild(main[0]);
            this.initial();
          }, 10);
        });
        emptyBlock.addEventListener('dragover', () => {
          setTimeout(() => {
            arr.splice(arr.indexOf('empty'), 1, Number(curBlock.textContent));
            arr.splice(index, 1, 'empty');
          }, 10);
        });
      }
    } else if (index % Common.size === Common.size - 1) {
      if (
        arr[index - 1] === 'empty'
                || arr[index - Common.size] === 'empty'
                || arr[index + Common.size] === 'empty'
      ) {
        curBlock.addEventListener('dragstart', () => {
          curBlock.classList.toggle('change-colour');
        });
        curBlock.addEventListener('dragend', () => {
          curBlock.classList.toggle('change-colour');
          setTimeout(() => {
            if (
              arr.indexOf(parseInt(block.textContent, 10))
                      !== prevArr.indexOf(parseInt(block.textContent, 10))
            ) {
              Common.moves += 1;
              prevArr.length = 0;
              prevArr = [].concat(arr);
            }
            main[0].parentNode.removeChild(main[0]);
            this.initial();
          }, 10);
        });
        emptyBlock.addEventListener('dragover', () => {
          setTimeout(() => {
            arr.splice(arr.indexOf('empty'), 1, Number(curBlock.textContent));
            arr.splice(index, 1, 'empty');
          }, 10);
        });
      }
    } else if (
      arr[index - 1] === 'empty'
              || arr[index - Common.size] === 'empty'
              || arr[index + Common.size] === 'empty'
              || arr[index + 1] === 'empty'
    ) {
      curBlock.addEventListener('dragstart', () => {
        curBlock.classList.toggle('change-colour');
      });
      curBlock.addEventListener('dragend', () => {
        curBlock.classList.toggle('change-colour');
        setTimeout(() => {
          if (
            arr.indexOf(parseInt(block.textContent, 10))
                    !== prevArr.indexOf(parseInt(block.textContent, 10))
          ) {
            Common.moves += 1;
            prevArr.length = 0;
            prevArr = [].concat(arr);
          }
          main[0].parentNode.removeChild(main[0]);
          this.initial();
        }, 10);
      });
      emptyBlock.addEventListener('dragover', () => {
        setTimeout(() => {
          arr.splice(arr.indexOf('empty'), 1, Number(curBlock.textContent));
          arr.splice(index, 1, 'empty');
        }, 10);
      });
    }
  },
  // собирает все элементы выпадающего меню
  settings() {
    const fragment = document.createDocumentFragment();
    const main = document.getElementsByClassName('all');

    // Кнопка settings
    const settingsButton = document.createElement('button');
    settingsButton.textContent = 'Settings';
    // кнопка resume
    const resumeButton = document.createElement('button');
    resumeButton.textContent = 'Resume';
    resumeButton.id = 'resume';

    // overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.visibility = 'hidden';

    // id настройкам
    const sett = document.createElement('div');
    sett.id = 'settings';

    sett.appendChild(selectSize());
    sett.appendChild(resumeButton);
    sett.appendChild(reset());
    sett.appendChild(this.saveLoad());
    sett.appendChild(topScore());
    main[0].appendChild(overlay);

    main[0].appendChild(sett);

    settingsButton.addEventListener('click', () => {
      overlay.style.visibility = 'visible';
      sett.classList.add('settings-open');
      Common.start = false;
      Common.size = Math.sqrt(resArray.items.length);
    });

    resumeButton.addEventListener('click', () => {
      overlay.style.visibility = 'hidden';
      sett.classList.remove('settings-open');
      Common.start = true;
      // Common.size = Math.sqrt(resArray.length);
    });

    fragment.appendChild(settingsButton);

    return fragment;
  },
  // сохранение и загрузка игры
  saveLoad() {
    const fragment = document.createDocumentFragment();
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Game';
    const LoadButton = document.createElement('button');
    LoadButton.textContent = 'Load Game';
    curImage = images.items[images.imageIndex];

    saveButton.addEventListener('click', () => {
      localStorage.setItem('currentArray', JSON.stringify(array.items));
      localStorage.setItem('currentSize', Common.size);
      localStorage.setItem('currentTime', Common.sec);
      localStorage.setItem('currentMoves', Common.moves);
      localStorage.setItem('currentImage', curImage);
      alert('Saved!');
    });

    LoadButton.addEventListener('click', () => {
      const main = document.getElementsByClassName('all');
      const sett = document.getElementById('settings');
      sett.classList.remove('settings-open');
      sett.remove();
      const congr = document.getElementById('congradulations');
      if (congr !== null) congr.remove();
      document.getElementById('overlay').remove();
      Common.start = false;
      Common.sec = Number(localStorage.getItem('currentTime'));
      Common.moves = Number(localStorage.getItem('currentMoves'));
      array.items = JSON.parse(localStorage.getItem('currentArray'));
      Common.size = localStorage.getItem('currentSize');
      curImage = localStorage.getItem('currentImage');
      while (images.items[0] !== curImage) {
        images.items.sort(() => Math.random() - 0.5);
      }
      document.body.removeChild(main[0]);
      this.initial();
      alert('Loaded!');
    });
    fragment.appendChild(saveButton);
    fragment.appendChild(LoadButton);
    return fragment;
  },

};
