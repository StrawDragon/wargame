import * as PIXI from 'pixi.js';
import { UNIT_TILESET_URI } from './tilesets';

export const UNIT_TYPE = {
  WOMAN_WARRIOR: 'WOMAN_WARRIOR',
  WOMAN_WIZARD: 'WOMAN_WIZARD',
  MAN_WARRIOR: 'MAN_WARRIOR',
  MAN_WIZARD: 'MAN_WIZARD',
  MAN_WARRIOR_WIZARD: 'MAN_WARRIOR_WIZARD',
  NAGA_WARRIOR: 'NAGA_WARRIOR',
  SMALL_NAGA_WARRIOR: 'SMALL_NAGA_WARRIOR',
  NAGA_ARCHER: 'NAGA_ARCHER',
};

export class Unit {
  constructor(type, position, renderer) {
    this.type = type;
    this.position = position;
    this.renderer = renderer;
  }
}

export class SimpleUnitRenderer {
  constructor(texture) {
    this.texture = texture;
  }

  createPixi() {
    return new PIXI.Sprite(
      this.texture,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderPixi(unit, pixi, tileSize, zIndex) {
    pixi.x = unit.position.x * tileSize;
    pixi.y = unit.position.y * tileSize;
    pixi.zIndex = zIndex;
  }
}

export class WomanWarriorUnit extends Unit {
  constructor(position) {
    super(
      UNIT_TYPE.WOMAN_WARRIOR,
      position,
      new SimpleUnitRenderer(PIXI.loader.resources[UNIT_TILESET_URI].textures['0-0.png']),
    );
  }
}

export class NagaWarriorUnit extends Unit {
  constructor(position) {
    super(
      UNIT_TYPE.NAGA_WARRIOR,
      position,
      new SimpleUnitRenderer(PIXI.loader.resources[UNIT_TILESET_URI].textures['0-3.png']),
    );
  }
}

export class ManWarriorWizardUnit extends Unit {
  constructor(position) {
    super(
      UNIT_TYPE.MAN_WARRIOR_WIZARD,
      position,
      new SimpleUnitRenderer(PIXI.loader.resources[UNIT_TILESET_URI].textures['1-0.png']),
    );
  }
}

export class SmallNagaUnit extends Unit {
  constructor(position) {
    super(
      UNIT_TYPE.SMALL_NAGA_WARRIOR,
      position,
      new SimpleUnitRenderer(PIXI.loader.resources[UNIT_TILESET_URI].textures['0-2.png']),
    );
  }
}

export class NagaArcherUnit extends Unit {
  constructor(position) {
    super(
      UNIT_TYPE.NAGA_ARCHER,
      position,
      new SimpleUnitRenderer(PIXI.loader.resources[UNIT_TILESET_URI].textures['1-3.png']),
    );
  }
}

export class ManWarriorUnit extends Unit {
  constructor(position) {
    super(
      UNIT_TYPE.MAN_WARRIOR,
      position,
      new SimpleUnitRenderer(PIXI.loader.resources[UNIT_TILESET_URI].textures['0-1.png']),
    );
  }
}

export class ManWizardUnit extends Unit {
  constructor(position) {
    super(
      UNIT_TYPE.MAN_WIZARD,
      position,
      new SimpleUnitRenderer(PIXI.loader.resources[UNIT_TILESET_URI].textures['1-1.png']),
    );
  }
}

export class WomanWizardUnit extends Unit {
  constructor(position) {
    super(
      UNIT_TYPE.WOMAN_WIZARD,
      position,
      new SimpleUnitRenderer(PIXI.loader.resources[UNIT_TILESET_URI].textures['1-2.png']),
    );
  }
}
