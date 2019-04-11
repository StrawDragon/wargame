import { userEventService, USER_PAN_EVENT_TYPE } from './user_event_service';

/**
 * Модель отвечающая за манипуляцию с вьюпортом
 */

export class ViewportModel {
  constructor(offset, canvasSize, scale) {
    this.offset = offset;
    this.canvasSize = canvasSize;
    this.scale = scale;

    this.startPanOffset = this.offset.clone();

    // TODO: Мне не нравиться что эти подписки и их логика здесь. Нужно вынести и управлять моделью из вне.
    // Возможно нужна привязка к game loop'у
    userEventService.subscribeToPan((panEvent) => {
      switch (panEvent.type) {
        case USER_PAN_EVENT_TYPE.MOVE:
        case USER_PAN_EVENT_TYPE.END: {
          if (this.startPanOffset) {
            this.offset.set(panEvent.startPosition).sub(panEvent.position).add(this.startPanOffset);
          }
          break;
        }
        case USER_PAN_EVENT_TYPE.BEGIN: {
          this.startPanOffset.set(this.offset);
          break;
        }
        default:
          break;
      }
    });

    userEventService.subscribeToZoom((zoomEvent) => {
      const deltaScale = zoomEvent.delta > 0 ? -0.01 : 0.01;
      const deltaOffset = this.offset.clone();

      deltaOffset.add(this.canvasSize);
      deltaOffset.scalarMul(deltaScale / 2);

      this.scale += deltaScale;
      this.offset.sub(deltaOffset);
    });
  }
}
