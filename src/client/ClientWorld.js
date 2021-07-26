import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';

class ClientWorld extends PositionedObject {
  constructor(game, engine, worldCfg) {
    super();

    const worldHeight = worldCfg.map.length;
    const worldWidth = worldCfg.map[0].length;
    const cellSize = engine.canvas.height / worldCfg.camera.height;

    Object.assign(this, {
      game,
      engine,
      worldCfg,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      worldHeight,
      worldWidth,
      cellWidth: cellSize,
      cellHeight: cellSize,
      map: [],
    });
  }

  init() {
    // eslint-disable-next-line object-curly-newline
    const { worldCfg, map, worldWidth, worldHeight } = this;

    for (let row = 0; row < worldHeight; row += 1) {
      for (let col = 0; col < worldWidth; col += 1) {
        if (!map[row]) {
          map[row] = [];
        }

        map[row][col] = new ClientCell({
          world: this,
          cellCol: col,
          cellRow: row,
          cellCfg: worldCfg.map[row][col],
        });
      }
    }

    // const { map } = this.worldCfg;

    // map.forEach((cfgRow, y) => {
    //   cfgRow.forEach((cfgCell, x) => {
    //     const [, , sW, sH] = this.engine.sprites.terrain[cfgCell[0]].frames[0];
    //     this.engine.renderSpriteFrame({
    //       sprite: ['terrain', cfgCell[0]],
    //       frame: 0,
    //       x: x * sW,
    //       y: y * sH,
    //       w: sW,
    //       h: sH,
    //     });
    //   });
    // });
  }

  render(time) {
    // eslint-disable-next-line object-curly-newline
    const { worldCfg, map, worldWidth, worldHeight } = this;

    for (let layerId = 0; layerId < worldCfg.layers.length; layerId += 1) {
      for (let row = 0; row < worldHeight; row += 1) {
        for (let col = 0; col < worldWidth; col += 1) {
          map[row][col].render(time, layerId);
        }
      }
    }
  }

  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }
}

export default ClientWorld;
