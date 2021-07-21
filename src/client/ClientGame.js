import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import worldCfg from '../configs/world.json';
import sprites from '../configs/sprites';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.world = this.createWorld();

    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  movePlayer(dcol, drow) {
    this.player.moveByCellCoord(dcol, drow, (cell) => cell.findObjectsByType('grass').length);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameOject(this.player);
        this.world.render(time);
      });

      this.engine.start();
      this.initKeys();
    });
  }

  createWorld() {
    return new ClientWorld(this, this.engine, worldCfg);
  }

  getWorld() {
    return this.world;
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        if (keydown) {
          this.movePlayer(-1, 0);
        }
      },
      ArrowRight: (keydown) => {
        if (keydown) {
          this.movePlayer(1, 0);
        }
      },
      ArrowDown: (keydown) => {
        if (keydown) {
          this.movePlayer(0, 1);
        }
      },
      ArrowUp: (keydown) => {
        if (keydown) {
          this.movePlayer(0, -1);
        }
      },
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
