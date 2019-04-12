import * as PIXI from 'pixi.js';
import { ViewportModel } from './viewport_model';
import { Vector } from './vector';
import { MapRenderer } from './map/map_renderer';
import { generateMap } from './map/generate_map';
import { GROUND_TILESET_URI, UNIT_TILESET_URI } from './tilesets';

export class Game {
  constructor(canvasElement) {
    // инициализируем вьюпорт пока с маштабом 1:1 и позицией 0 по отношению к канвасу
    this.viewportModel = new ViewportModel(
      new Vector(0, 0),
      new Vector(window.innerWidth, window.innerHeight),
      1,
    );

    this.pixiApp = new PIXI.Application({
      width: this.viewportModel.canvasSize.width,
      height: this.viewportModel.canvasSize.height,
    });

    this.ticker = this.pixiApp.ticker;
    this.ticker.autoStart = false;

    canvasElement.appendChild(this.pixiApp.view);
    this.handleTicker = this.handleTicker.bind(this);
  }

  async load() {
    await new Promise((resolve) => {
      PIXI.loader
        .add(GROUND_TILESET_URI)
        .add(UNIT_TILESET_URI)
        .load(resolve);
    });

    // По идее генерация карты штука долгая поэтому делаем это здесь
    // Но пока синхронно и фиксированого размера
    this.mapModel = generateMap(new Vector(100, 100));

    // Подготавливаем рендерер карты, он тоже может быть долгим
    const mapPixiContainer = new PIXI.Container();
    this.pixiApp.stage.addChild(mapPixiContainer);
    this.mapRenderer = new MapRenderer(mapPixiContainer, this.mapModel, this.viewportModel);
  }

  async run() {
    // Грузим данные, генерим карту и проч тяжелые вещи
    await this.load();

    // подписываем события
    this.ticker.add(this.handleTicker);

    // Стартуем жизненый цикл игры
    this.start();
  }

  start() {
    this.ticker.start();
  }

  pause() {
    this.ticker.stop();
  }

  handleTicker() {
    // В идеале процесс отрисовки нужно вынести в отдельный воркер с offscreenCanvas
    // Что бы он не блочил события юзверя
    this.mapRenderer.render(this.ticker.lastTime);
    this.pixiApp.renderer.render(this.pixiApp.stage);
  }
}
