import {userEventService} from './user_event_service';

/**
 * Модель отвечающая за манипуляцию с вьюпортом
 */
export class ViewportModel {
    constructor(offset, canvasSize, scale) {
        this.offset = offset;
        this.canvasSize = canvasSize;
        this.scale = scale;

        userEventService.subscribeToPan((panEvent) => {
            this.offset.scalarAdd(1);
        });
    }
}
