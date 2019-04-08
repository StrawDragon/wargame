export class Rect {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }

    get left() {
        return this.position.x;
    }

    get right() {
        return this.position.x + this.size.x;
    }

    get top() {
        return this.position.y;
    }

    get bottom() {
        return this.position.y + this.size.y;
    }

    get width() {
        return this.size.width;
    }

    get height() {
        return this.size.height;
    }

    isEqual(rect) {
        return rect.position.isEqual(this.position) && rect.size.isEqual(this.size);
    }
}