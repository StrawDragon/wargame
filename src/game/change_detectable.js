/**
 * Класс для ручного управления по отслеживанию изменения состояния в моделях
 * Хранит метку указывающую нa игровой тик последнего изменения
 * И метод по обновлению метки. Предполагается что обновление метки будет происходить только
 * в нужных для оптимизации моментах изменения модели
 */

// TODO: Сейчас не используется. Доделать систему change detection
// TODO: Нужен ли вообще?
export default class ChangeDetectable {
  constructor(ticker) {
    this.ticker = ticker;
    this.updateChangeDetection(ticker);
  }

  updateChangeDetection(ticker) {
    this.lastChangeTick = ticker.getCurrentTick();
  }

  isChangedAt(tick) {
    return tick <= this.lastChangeTick;
  }
}
