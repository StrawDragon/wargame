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
        this.x -= vector.x;
        this.y -= vector.y;
    }

    scalarAdd(n) {
        this.x += n;
        this.y += n;
    }
 
    scalarMul(n) {
        this.x *= n;
        this.y *= n;
    }
}
