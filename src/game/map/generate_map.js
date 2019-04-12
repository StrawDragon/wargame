import { TILE_TYPE } from './tile_type';
import { MapModel } from './map_model';
import { Vector } from '../vector';
import {
  ManWarriorUnit,
  ManWarriorWizardUnit,
  ManWizardUnit,
  NagaArcherUnit,
  SmallNagaUnit,
  WomanWarriorUnit, WomanWizardUnit,
  NagaWarriorUnit,
} from '../unit';

export const generateMap = (size) => {
  const map = new MapModel(size);

  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      const index = x * size.width + y;
      map.setSurfaceTile(x, y, {
        type: index % 2 ? TILE_TYPE.GROUND : TILE_TYPE.SHOW,
        position: new Vector(x, y),
      });
    }
  }

  map.units.push(new WomanWarriorUnit(new Vector(1, 2)));
  map.units.push(new NagaWarriorUnit(new Vector(2, 1)));
  map.units.push(new ManWarriorWizardUnit(new Vector(3, 2)));
  map.units.push(new SmallNagaUnit(new Vector(4, 1)));
  map.units.push(new NagaArcherUnit(new Vector(5, 2)));
  map.units.push(new ManWarriorUnit(new Vector(3, 4)));
  map.units.push(new ManWizardUnit(new Vector(1, 5)));
  map.units.push(new WomanWizardUnit(new Vector(5, 7)));

  return map;
};
