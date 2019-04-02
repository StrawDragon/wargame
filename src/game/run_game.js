import * as PIXI from 'pixi.js';
import {TILE_TYPE} from './map/tile_type';
import { generateMap } from './map/generate_map';

const TILE_SET_FILE = 'tilesets/ground_tileset.png';

const setup = (pixiApp) => () => {
  let texture = PIXI.utils.TextureCache[TILE_SET_FILE];
  let rectGround = new PIXI.Rectangle(0, 32, 64, 64);
  let rectSnow = new PIXI.Rectangle(192, 32, 64, 64);

  let width = 10;
  let height = 10;
  let map = generateMap(width, height);

  for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
      if (map[j*height + i] === TILE_TYPE.GROUND) {
        const groundTexture = new PIXI.Texture(texture, rectGround);
        let groundSprite = new PIXI.Sprite(groundTexture);

        groundSprite.x = i * 64;
        groundSprite.y = j * 64;

        pixiApp.stage.addChild(groundSprite);
      } else {
        const snowTexture = new PIXI.Texture(texture, rectSnow);
        let snowSprite = new PIXI.Sprite(snowTexture);

        snowSprite.x = i * 64;
        snowSprite.y = j * 64;

        pixiApp.stage.addChild(snowSprite);
      }
    }
  }

  pixiApp.renderer.render(pixiApp.stage);
};

export const runGame = (canvasEl) => {
    //Create a Pixi Application
    let pixiApp = new PIXI.Application({width: 1024, height: 512});

    canvasEl.appendChild(pixiApp.view);

    PIXI.loader
        .add(TILE_SET_FILE)
        .load(setup(pixiApp));
}