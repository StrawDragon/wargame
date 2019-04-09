export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get width() {
        return this.x;
    }

    get height() {
        return this.y;
    }

    isEqual(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    sub(vector) {
        this.x = vector.x - this.x;
        this.y = vector.y - this.y;
        return this;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    scalarAdd(n) {
        this.x += n;
        this.y += n;
        return this;
    }
 
    scalarMul(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    set(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }
}
