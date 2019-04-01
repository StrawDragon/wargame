import React, { Component } from 'react';
import * as PIXI from 'pixi.js';

const TILE_TYPES = {
  GROUND: 'ground',
  SHOW: 'snow', 
};

const generateMap = (width = 10, height = 10) => {
  const size = width * height;
  let map = Array(size);

  for(let i = 0; i < size; i++) {
    map[i] = i % 2 ? TILE_TYPES.GROUND : TILE_TYPES.SHOW;
  }

  return map;
}
const TILE_SET_FILE = 'tilesets/ground_tileset.png';
const setup = (canvasApp) => () => {
  let texture = PIXI.utils.TextureCache[TILE_SET_FILE];
  let rectGround = new PIXI.Rectangle(0, 32, 64, 64);
  let rectSnow = new PIXI.Rectangle(192, 32, 64, 64);

  let width = 10;
  let height = 10;
  let map = generateMap(width, height);

  for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
      if (map[j*height + i] === TILE_TYPES.GROUND) {
        const groundTexture = new PIXI.Texture(texture, rectGround);
        let groundSprite = new PIXI.Sprite(groundTexture);

        groundSprite.x = i * 64;
        groundSprite.y = j * 64;

        canvasApp.stage.addChild(groundSprite);
      } else {
        const snowTexture = new PIXI.Texture(texture, rectSnow);
        let snowSprite = new PIXI.Sprite(snowTexture);

        snowSprite.x = i * 64;
        snowSprite.y = j * 64;

        canvasApp.stage.addChild(snowSprite);
      }
    }
  }

  canvasApp.renderer.render(canvasApp.stage);
};

class App extends Component {
  constructor () {
    super();

    this.myRefs = React.createRef();
  }

  componentDidMount () {
    //Create a Pixi Application
    let canvasApp = new PIXI.Application({width: 1024, height: 512});

    this.myRefs.current.appendChild(canvasApp.view);

    PIXI.loader
      .add(TILE_SET_FILE)
      .load(setup(canvasApp));
  }

  render() {
    return (
      <div ref={this.myRefs}>
      </div>
    );
  }
}

export default App;
