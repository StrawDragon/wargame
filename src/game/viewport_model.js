import { userEventService, USER_PAN_EVENT_TYPE } from './user_event_service';

/**
 * Модель отвечающая за манипуляцию с вьюпортом
 */

export default class ViewportModel {
  constructor(offset, canvasSize, scale) {
    this.offset = offset;
    this.canvasSize = canvasSize;
    this.scale = scale;

    this.startPanOffset = this.offset.clone();

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
      this.scale += zoomEvent.delta > 0 ? -0.01 : 0.01;
    });
  }
}
