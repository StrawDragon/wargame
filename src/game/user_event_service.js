import mousePositionOnElement from './mouse_position_on_element';

export const USER_PAN_EVENT_TYPE = {
  BEGIN: 'BEGIN',
  MOVE: 'MOVE',
  END: 'END',
};

class UserEventService {
  constructor() {
    // Здесь мы предпологаем что канвас игры будет всегда равен размеру вьюпорта окна.
    // И все события расчитываются исходя из этого факта
    this.containerEl = document;

    // TODO: заменить массивы на WeakSet
    this.panSubscribers = [];
    this.zoomSubscribers = [];
    this.clickSubscribers = [];

    // TODO возможно есть проблемы с разделением событий pan и click
    // Пока только pan
    this.containerEl.addEventListener('mousedown', (event) => {
      const startPosition = mousePositionOnElement(event);
      this.triggerPan(startPosition, startPosition, USER_PAN_EVENT_TYPE.BEGIN, event);

      const moveHandler = (e) => {
        this.triggerPan(mousePositionOnElement(e), startPosition, USER_PAN_EVENT_TYPE.MOVE, e);
      };
      const moveEndHandler = (e) => {
        this.triggerPan(mousePositionOnElement(e), startPosition, USER_PAN_EVENT_TYPE.END, e);

        this.containerEl.removeEventListener('mousemove', moveHandler);
        this.containerEl.removeEventListener('mouseup', moveEndHandler);
        this.containerEl.removeEventListener('mouseleave', moveEndHandler);
      };

      this.containerEl.addEventListener('mousemove', moveHandler);
      this.containerEl.addEventListener('mouseup', moveEndHandler);
      this.containerEl.addEventListener('mouseleave', moveEndHandler);
    });

    this.containerEl.addEventListener('wheel', (e) => {
      this.triggerZoom(e.deltaY || e.detail || e.wheelDelta, e);
    });
  }

  triggerPan(position, startPosition, panType, originEvent) {
    for (let i = 0; i < this.panSubscribers.length; i++) {
      this.panSubscribers[i]({
        originEvent,
        startPosition,
        position,
        type: panType,
      });
    }
  }

  triggerClick(position, originEvent) {
    for (let i = 0; i < this.clickSubscribers.length; i++) {
      this.clickSubscribers[i]({
        originEvent,
        position,
      });
    }
  }

  triggerZoom(delta, originEvent) {
    for (let i = 0; i < this.zoomSubscribers.length; i++) {
      this.zoomSubscribers[i]({
        originEvent,
        delta,
      });
    }
  }

  // TODO: заменить на Rx, Observer, Events lib ?
  subscribeToPan(callback) {
    this.panSubscribers.push(callback);
  }

  // TODO
  // unsubscribeToPan(callback) {
  // }

  subscribeToZoom(callback) {
    this.zoomSubscribers.push(callback);
  }

  // TODO
  // unsubscribeToZoom(callback) {
  // }

  subscribeToClick(callback) {
    this.clickSubscribers.push(callback);
  }

  // TODO
  // unsubscribeToClick(callback) {
  // }
}

// TODO: DI, сервис локатор?
export const userEventService = new UserEventService();
