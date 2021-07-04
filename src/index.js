import './index.scss';
import HeroSprite from './assets/Male-2-Walk.png';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
/** @type {HTMLCanvasElement} */
const background = document.getElementById('background');
const bctx = background.getContext('2d');
const fieldW = 600;
const fieldH = 600;
const spriteW = 48;
const spriteH = 48;
const lastXPos = fieldW - spriteW;
const lastYPos = fieldH - spriteH;
// const shots = 3;
const frameOrder = [1, 2, 1, 0];
const framesNum = frameOrder.length - 1;
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

function drawBackground(context) {
  context.fillStyle = 'rgb(73, 155, 73)';
  context.fillRect(0, 0, 600, 600);
  let grd = context.createLinearGradient(10, 10, 150, 80);
  // let grd = context.createRadialGradient(40, 40, 5, 85, 75, 100);
  grd.addColorStop(0, 'rgb(40, 119, 40)');
  grd.addColorStop(1, 'rgb(163, 229, 179)');
  context.strokeStyle = 'rgb(163, 229, 179)';
  context.fillStyle = grd;
  context.rect(5, 5, 32, 16);
  context.stroke();
  context.fill();
  grd = context.createLinearGradient(15, 10, 150, 80);
  // let grd = context.createRadialGradient(40, 40, 5, 85, 75, 100);
  grd.addColorStop(0, 'rgb(40, 119, 40)');
  grd.addColorStop(1, 'rgb(163, 229, 179)');
  context.strokeStyle = 'rgb(163, 229, 179)';
  context.fillStyle = grd;
  context.rect(38, 5, 32, 16);
  context.stroke();
  context.fill();
}

drawBackground(bctx);
// TODO: Try to replace switch case with object literals
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
      spriteShift = spriteW * 0;
      pY < lastYPos ? (pY += 10) : (pY = lastYPos);
      cycle === framesNum ? cycle = 0 : cycle += 1;
      // cycle = (cycle + 1) % shots;
    }
    if (UpPressed) {
      spriteShift = spriteW * 3;
      pY > 0 ? (pY -= 10) : (pY = 0);
      cycle === framesNum ? cycle = 0 : cycle += 1;
    }
    if (LeftPressed) {
      spriteShift = spriteW * 1;
      pX > 0 ? (pX -= 10) : (pX = 0);
      cycle === framesNum ? cycle = 0 : cycle += 1;
    }
    if (RightPressed) {
      spriteShift = spriteW * 2;
      pX < lastXPos ? (pX += 10) : (pX = lastXPos);
      cycle === framesNum ? cycle = 0 : cycle += 1;
    }
    ctx.clearRect(0, 0, fieldW, fieldH);
    // eslint-disable-next-line max-len
    ctx.drawImage(img, frameOrder[cycle] * spriteW, spriteShift, spriteW, spriteH, pX, pY, spriteW, spriteH);
  }, 120);
});
