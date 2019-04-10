import TILE_TYPE from './tile_type';
import MapModel from './map_model';
import Vector from '../vector';

export default function (size) {
  const map = new MapModel(size);

  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      const index = x * size.width + y;
      map.setTileByIndex(index, {
        type: index % 2 ? TILE_TYPE.GROUND : TILE_TYPE.SHOW,
        position: new Vector(x, y),
      });
    }
  }

  return map;
};
