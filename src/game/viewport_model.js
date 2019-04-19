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
    this.focusOnMapPoint = this.focusOnMapPoint.bind(this);

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
      const viewCenter = this.canvasSize.clone().scalarMul(0.5);
      const target = this.offset.clone().sub(viewCenter).scalarMul(1 / this.scale);

      this.scale += deltaScale;
      this.focusOnMapPoint(target);
    });
  }

  focusOnMapPoint(vector) {
    const viewCenter = this.canvasSize.clone().scalarMul(0.5);
    const target = vector.clone().scalarMul(this.scale).sub(viewCenter);

    this.offset.set(target);
  }
}
