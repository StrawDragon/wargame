import { TILE_TYPE } from "./tile_type";

export const generateMap = (width = 10, height = 10) => {
    const size = width * height;
    let map = Array(size);
  
    for(let i = 0; i < size; i++) {
      map[i] = i % 2 ? TILE_TYPE.GROUND : TILE_TYPE.SHOW;
    }
  
    return map;
  }
  