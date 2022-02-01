/* eslint-disable no-bitwise */
/* eslint-disable object-curly-newline */
import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';
import { clamp } from '../common/util';

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
    const { worldCfg } = this;

    for (let layerId = 0; layerId < worldCfg.layers.length; layerId += 1) {
      const layer = worldCfg.layers[layerId];

      if (layer.isStatic) {
        this.renderStaticLayer(time, layer, layerId);
      } else {
        this.renderDynamicLayer(time, layerId, this.getRenderRange());
      }
    }
  }

  renderStaticLayer(time, layer, layerId) {
    const { engine } = this;
    const { camera } = engine;

    const layerName = `static_layer_${layerId}`;
    const cameraPos = camera.worldBounds();

    if (!layer.isRendered) {
      engine.addCanvas(layerName, this.width, this.height);
      engine.switchCanvas(layerName);

      camera.moveTo(0, 0, false);
      this.renderDynamicLayer(time, layerId);
      camera.moveTo(cameraPos.x, cameraPos.y, false);

      engine.switchCanvas('main');
      // eslint-disable-next-line no-param-reassign
      layer.isRendered = true;
    }
    const toPosObj = {
      x: 0,
      y: 0,
      width: cameraPos.width,
      height: cameraPos.height,
    };
    engine.renderCanvas(layerName, cameraPos, toPosObj);
  }

  renderDynamicLayer(time, layerId, rangeCells) {
    const { map, worldWidth, worldHeight } = this;

    if (!rangeCells) {
      // eslint-disable-next-line no-param-reassign
      rangeCells = {
        startCell: this.cellAt(0, 0),
        endCell: this.cellAt(worldWidth - 1, worldHeight - 1),
      };
    }

    const { startCell, endCell } = rangeCells;

    for (let { row } = startCell; row <= endCell.row; row += 1) {
      for (let { col } = startCell; col <= endCell.col; col += 1) {
        map[row][col].render(time, layerId);
      }
    }
  }

  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }

  cellAtXY(x, y) {
    const { width, height, cellWidth, cellHeight } = this;

    // eslint-disable-next-line max-len
    return this.cellAt((clamp(x, 0, width - 1) / cellWidth) | 0, (clamp(y, 0, height - 1) / cellHeight) | 0);
  }

  getRenderRange() {
    const { x, y, width, height } = this.engine.camera.worldBounds();
    const { cellWidth, cellHeight } = this;

    return {
      startCell: this.cellAtXY(x - cellWidth, y - cellHeight),
      endCell: this.cellAtXY(x + cellWidth + width, y + cellHeight + height),
    };
  }
}

export default ClientWorld;
