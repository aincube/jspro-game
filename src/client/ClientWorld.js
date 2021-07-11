class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.height,
      // TODO: What the magic is this?!
      width: levelCfg.map[0].length,
    });
  }

  init() {
    this.engine.renderSpriteFrame({
      sprite: ['terrain', 'wall'],
      frame: 0,
      x: 0,
      y: 0,
      w: 48,
      h: 48,
    });
  }
}

export default ClientWorld;
