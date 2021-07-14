import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import levelCfg from '../configs/world.json';
import sprites from '../configs/sprites';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, { cfg });

    this.engine = this.createEngine();
    this.world = this.createWorld();

    this.initEngine();
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', () => {
        this.world.init();
      });

      this.engine.start();
    });
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
