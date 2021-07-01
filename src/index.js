import './index.scss';
import HeroSprite from './assets/Male-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
// let pY = 0;
let DownPressed = false;
let UpPressed = false;
let LeftPressed = false;
let RightPressed = false;

const img = document.createElement('img');
img.src = HeroSprite;

// TODO: Try to replace switch case to object literals
// const downCodes = ['ArrowDown', 'Down', 'w'];
// const upCodes = ['ArrowUp', 'Up', 's'];
// const leftCodes = ['ArrowLeft', 'Left', 'a'];
// const rightCodes = ['ArrowRight', 'Right', 'd'];

function keytrigger(event, isKeyDown) {
  switch (event.key) {
    case 'ArrowDown':
    case 'Down':
      DownPressed = isKeyDown;
      break;
    case 'ArrowUp':
    case 'Up':
      UpPressed = isKeyDown;
      break;
    case 'ArrowLeft':
    case 'Left':
      LeftPressed = isKeyDown;
      break;
    case 'ArrowRight':
    case 'Right':
      RightPressed = isKeyDown;
      break;
    default:
      console.log('key not supported');
  }
}

document.addEventListener('keydown', (e) => {
  keytrigger(e, true);
});

document.addEventListener('keyup', (e) => {
  keytrigger(e, false);
});

img.addEventListener('load', () => {
  setInterval(() => {
    cycle = (cycle + 1) % shots;
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, 48, spriteW, spriteH, 0, 0, 48, 48);
  }, 120);
});
