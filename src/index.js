import './index.scss';
import HeroSprite from './assets/Male-2-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const fieldW = 600;
const fieldH = 600;
const spriteW = 48;
const spriteH = 48;
const lastXPos = fieldW - spriteW;
const lastYPos = fieldH - spriteH;
const shots = 3;
let cycle = 0;
let pX = fieldW / 2 - spriteW / 2;
let pY = fieldH / 2 - spriteH / 2;
let spriteShift = 0;
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

/* eslint no-unused-expressions: [2, { allowTernary: true }] */
img.addEventListener('load', () => {
  setInterval(() => {
    if (DownPressed) {
      spriteShift = 0;
      pY < lastYPos ? pY += 10 : pY = lastYPos;
      cycle = (cycle + 1) % shots;
    }
    if (UpPressed) {
      spriteShift = 144;
      pY > 0 ? pY -= 10 : pY = 0;
      cycle = (cycle + 1) % shots;
    }
    if (LeftPressed) {
      spriteShift = 48;
      pX > 0 ? pX -= 10 : pX = 0;
      cycle = (cycle + 1) % shots;
    }
    if (RightPressed) {
      spriteShift = 96;
      pX < lastXPos ? pX += 10 : pX = lastXPos;
      cycle = (cycle + 1) % shots;
    }
    ctx.clearRect(0, 0, fieldW, fieldH);
    ctx.drawImage(img, cycle * spriteW, spriteShift, spriteW, spriteH, pX, pY, spriteW, spriteH);
  }, 120);
});
