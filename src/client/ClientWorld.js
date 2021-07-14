class ClientWorld {
  constructor(game, engine, worldCfg) {
    Object.assign(this, {
      game,
      engine,
      worldCfg,
      height: worldCfg.map.height,
      width: worldCfg.map[0].length,
    });
  }

  init() {
    const { map } = this.worldCfg;

    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        const [, , sW, sH] = this.engine.sprites.terrain[cfgCell[0]].frames[0];
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * sW,
          y: y * sH,
          w: sW,
          h: sH,
        });
      });
    });
  }
}

export default ClientWorld;
