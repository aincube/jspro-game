import './index.scss';

import { io } from 'socket.io-client';

import ClientGame from './client/ClientGame';
import { getTime } from './common/util';

// /** @type {HTMLCanvasElement} */
// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');
// /** @type {HTMLCanvasElement} */
// const background = document.getElementById('background');
// const bctx = background.getContext('2d');
// const fieldW = canvas.clientWidth;
// const fieldH = canvas.clientHeight;
// const spriteW = 48;
// const spriteH = 48;
// const lastXPos = fieldW - spriteW;
// const lastYPos = fieldH - spriteH;
// // const shots = 3;
// const frameOrder = [1, 2, 1, 0];
// const framesNum = frameOrder.length - 1;
// let cycle = 0;
// let pX = fieldW / 2 - spriteW / 2;
// let pY = fieldH / 2 - spriteH / 2;
// let spriteShift = 0;
// let DownPressed = false;
// let UpPressed = false;
// let LeftPressed = false;
// let RightPressed = false;

// const img = document.createElement('img');
// img.src = HeroSprite;

// const terrain = document.createElement('img');
// terrain.src = terrainAtlas;

// function drawBackground() {
//   const { map } = worldCfg;

//   map.forEach((cfgRow, y) => {
//     cfgRow.forEach((cfgCell, x) => {
//       const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0];
//       bctx.drawImage(terrain, sX, sY, sW, sH, x * spriteW, y * spriteH, spriteW, spriteH);
//     });
//   });
// }

// terrain.addEventListener('load', drawBackground);

// const downCodes = ['ArrowDown', 'Down', 'w'];
// const upCodes = ['ArrowUp', 'Up', 's'];
// const leftCodes = ['ArrowLeft', 'Left', 'a'];
// const rightCodes = ['ArrowRight', 'Right', 'd'];

// function keytrigger(event, isKeyDown) {
//   switch (true) {
//     case downCodes.includes(event.key):
//       DownPressed = isKeyDown;
//       break;
//     case upCodes.includes(event.key):
//       UpPressed = isKeyDown;
//       break;
//     case leftCodes.includes(event.key):
//       LeftPressed = isKeyDown;
//       break;
//     case rightCodes.includes(event.key):
//       RightPressed = isKeyDown;
//       break;
//     default:
//       console.log('key not supported');
//   }
// }

// document.addEventListener('keydown', (e) => {
//   keytrigger(e, true);
// });

// document.addEventListener('keyup', (e) => {
//   keytrigger(e, false);
// });

// function walk(timestamp) {
//   if (DownPressed) {
//     spriteShift = spriteW * 0;
//     pY < lastYPos ? (pY += 10) : (pY = lastYPos);
//     cycle === framesNum ? cycle = 0 : cycle += 1;
//     // cycle = (cycle + 1) % shots;
//   }
//   if (UpPressed) {
//     spriteShift = spriteW * 3;
//     pY > 0 ? (pY -= 10) : (pY = 0);
//     cycle === framesNum ? cycle = 0 : cycle += 1;
//   }
//   if (LeftPressed) {
//     spriteShift = spriteW * 1;
//     pX > 0 ? (pX -= 10) : (pX = 0);
//     cycle === framesNum ? cycle = 0 : cycle += 1;
//   }
//   if (RightPressed) {
//     spriteShift = spriteW * 2;
//     pX < lastXPos ? (pX += 10) : (pX = lastXPos);
//     cycle === framesNum ? cycle = 0 : cycle += 1;
//   }
//   ctx.clearRect(0, 0, fieldW, fieldH);
//  eslint-disable-next-line max-len
//   ctx.drawImage(img, frameOrder[cycle] * spriteW, spriteShift, spriteW, spriteH, pX, pY, spriteW, spriteH);
//   window.requestAnimationFrame(walk);
// }

// /* eslint no-unused-expressions: [2, { allowTernary: true }] */
// img.addEventListener('load', () => {
//   window.requestAnimationFrame(walk);
// });
const socket = io('https://jsprochat.herokuapp.com');

const btn = document.getElementById('startbtn');
const formName = document.getElementById('nameForm');

const chat = document.querySelector('.chat-wrap');
const cform = document.getElementById('form');
const cinput = document.getElementById('input');
const message = document.querySelector('.message');

const bclick = (event) => {
  event.preventDefault();
  const playerName = document.getElementById('name');

  if (playerName.value) {
    const startGame = document.getElementsByClassName('start-game');

    formName.removeEventListener('click', bclick);
    startGame[0].remove();

    ClientGame.init({ tagId: 'game', playerName: playerName.value });

    socket.emit('start', playerName.value);

    chat.style.display = 'block';
  }
};

btn.addEventListener('click', bclick);
cform.addEventListener('submit', (e) => {
  e.preventDefault();
  if (cinput.value) {
    socket.emit('chat message', cinput.value);
    cinput.value = '';
  }
});

socket.on('chat message', (data) => {
  message.insertAdjacentHTML('beforeend', `<p><i>${getTime(data.time)}</i> - ${data.msg}</p>`);
});

socket.on('chat connection', (data) => {
  message.insertAdjacentHTML('beforeend', `<p><i>${getTime(data.time)}</i> - ${data.msg}</p>`);
});

socket.on('chat disconnect', (data) => {
  message.insertAdjacentHTML('beforeend', `<p><i>${getTime(data.time)}</i> - ${data.msg}</p>`);
});

socket.on('chat online', (data) => {
  message.insertAdjacentHTML('beforeend', `<p><i>${getTime(data.time)}</i> - Нас всего ${data.online}. И вот эти герои: ${data.names}</p>`);
});
