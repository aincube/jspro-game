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
      playerName: cfg.playerName,
    });

    this.engine = this.createEngine();
    this.world = this.createWorld();

    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  movePlayer(dir) {
    const dirs = {
      left: [-1, 0],
      right: [1, 0],
      up: [0, -1],
      down: [0, 1],
    };

    const { player } = this;

    if (player && player.motionProgress === 1) {
      const canMove = player.moveByCellCoord(
        dirs[dir][0],
        dirs[dir][1],
        (cell) => cell.findObjectsByType('grass').length,
      );

      if (canMove) {
        player.setState(dir);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
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
      this.engine.focus();
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
          this.movePlayer('left');
        }
      },
      ArrowRight: (keydown) => {
        if (keydown) {
          this.movePlayer('right');
        }
      },
      ArrowDown: (keydown) => {
        if (keydown) {
          this.movePlayer('down');
        }
      },
      ArrowUp: (keydown) => {
        if (keydown) {
          this.movePlayer('up');
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
