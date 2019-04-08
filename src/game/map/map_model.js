import {TILE_TYPE} from './tile_type';
/**
 * Класс в задачу которого входит
 * 1) оптимальное хранение карты
 * 2) оптимизированые методы получения информации. Например - только измененые тайлы внутри заданого вьюпорта
 * 
 */
export class MapModel {
    constructor(size) {
        this.size = size;
        this.data = Array(size.x * size.y).fill(TILE_TYPE.GROUND);
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

    setTile(x, y, tileType) {
        this.data[x + y * this.size.x] = tileType;
    }
    getTile(x, y) {
        return this.data[x + y * this.size.x];
    }

    setTileByIndex(index, tileType) {
        this.data[index] = tileType;
    }
    getTileByIndex(index) {
        return this.data[index];
    }
}