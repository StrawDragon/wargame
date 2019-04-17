import { TILE_TYPE as SURFACE_TYPE } from './tile_type';
/**
 * Класс в задачу которого входит
 * 1) оптимальное хранение карты
 * 2) оптимизированые методы получения информации. Например - только измененые тайлы внутри заданого вьюпорта
 *
 */
export class MapModel {
  constructor(size) {
    this.size = size;
    this.surface = Array(size.x * size.y).fill(SURFACE_TYPE.GROUND);
    this.units = [];
  }

  get tilesCount() {
    return this.size.x * this.size.y;
  }

  get width() {
    return this.size.width;
  }

  get height() {
    return this.size.height;
  }

  setSurfaceTile(x, y, tile) {
    this.surface[x + y * this.size.x] = tile;
  }

  getSurfaceTile(x, y) {
    return this.surface[x + y * this.size.x];
  }
}
