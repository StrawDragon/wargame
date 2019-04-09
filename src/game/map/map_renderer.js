import { Rect } from '../rect';
import { Vector } from '../vector';
import { GROUND_TILESET_URI } from '../tilesets';
import { TILE_TYPE } from './tile_type';
import * as PIXI from 'pixi.js';

// TODO: Пока не придумал куда приткнуть или от куда брать размер тайла
// Поэтому пока здесь
const TILE_SIZE = 64;

/**
 * Класс отвечающий за отрисовку игровой карты - сетки, тайлов, юнитов, зданий итд. 
 * Все что зумится и панится относится к нему.
 * Основные лайны к которым стоит стремиться и придерживаться:
 *  1) Виртуализация - показываем только то что во вьюпорте
 *  2) Перерисовываем только то что изменилось в моделях
 *  3) Не отвечает за отлов и обработку событий, только визуализация карты
 *  4) Минимум модификаций в пикси
 */
export class MapRenderer {
    constructor(pixiContainer, mapModel, viewportModel) {
        this.pixiContainer = pixiContainer;
        this.mapModel = mapModel;
        this.viewportModel = viewportModel;
        // Заранее создаем спрайты карты размером  40x40 - считая что при максимальном зуме больше мы не увидем
        // В будущем возможно динамическое, асинхроное изменение количества рисуемых спрайтов в зависимости от состояния вьюпорта
        // Однако нужно учесть что добавление или удаление тайлов крайне затратная по памяти операция
        const pixiTilesCacheCount = 40 * 40;
        this.pixiTilesCache = Array(pixiTilesCacheCount);
        for(let i = 0; i < this.pixiTilesCache.length; i++) {
            const sprite = new PIXI.Sprite(
                PIXI.loader.resources[GROUND_TILESET_URI].textures["ground_tileset-0.png"]
            );
            this.pixiContainer.addChild(sprite);
            this.pixiTilesCache[i] = sprite;
        }
    }

    render() {
        // кешенуть бы эту страсть
        const viewTilesRect = new Rect(
            new Vector(
                // Math.max(Math.floor(this.viewportModel.offset.x / TILE_SIZE), 0),
                // Math.max(Math.floor(this.viewportModel.offset.y / TILE_SIZE), 0),
                0, 0
            ),
            new Vector(
                // Math.min(Math.ceil(this.viewportModel.scale * this.viewportModel.canvasSize.x / TILE_SIZE), this.viewportModel.size.x),
                // Math.min(Math.ceil(this.viewportModel.scale * this.viewportModel.canvasSize.y / TILE_SIZE), this.viewportModel.size.y),
                40, 40
            )
        );
        
        let index = 0;
        for(let y = viewTilesRect.top; y < viewTilesRect.bottom; y++) {
            for(let x = viewTilesRect.left; x < viewTilesRect.right; x++) {
                index = 40 * y + x;
                this.pixiTilesCache[index].x = x * TILE_SIZE;
                this.pixiTilesCache[index].y = y * TILE_SIZE;
                this.pixiTilesCache[index].texture = this.mapModel.data[y * this.mapModel.width + x].type === TILE_TYPE.GROUND
                    ? PIXI.loader.resources[GROUND_TILESET_URI].textures["ground_tileset-0.png"]
                    : PIXI.loader.resources[GROUND_TILESET_URI].textures["ground_tileset-17.png"];
            }
        }

        this.pixiContainer.x = this.viewportModel.offset.x;
        this.pixiContainer.y = this.viewportModel.offset.y;
        this.pixiContainer.scale.x = this.viewportModel.scale;
        this.pixiContainer.scale.y = this.viewportModel.scale;
    }
}
