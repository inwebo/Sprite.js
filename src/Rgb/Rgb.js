import { Vector2D } from "@inwebo/vector";

/**
 * Basic RGB representation.
 *
 * this._x = R, this._y = G, this._z = B
 * If R | G | B greater than 255 they will be clamped at 255.
 */
export default class Rgb extends Vector2D {

    /**
     * @return {number} [0, 255]
     */
    getRed() {
        return super.getX();
    }

    /**
     * @return {number} [0, 255]
     */
    getGreen() {
        return super.getY();
    }

    /**
     * @return {number} [0, 255]
     */
    getBlue() {
        return this._z;
    }

    /**
     * @param {Number} value
     */
    setZ(value) {
        this._z = value;
    }

    /**
     * @return {Number}
     */
    getZ() {
        return this._z;
    }

    /**
     * @param {Number} x R
     * @param {Number} y G
     * @param {Number} z B
     */
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this._z = z;

        this.clamp(new Vector2D(0,0), new Vector2D(256, 256))
    }

    /**
     * @param {Rgb} vector
     * @return {boolean}
     */
    equals(vector) {
        return super.equals(vector) && this._z === vector.getZ();
    }

    /**
     * @param {Vector2D} min
     * @param {Vector2D} max
     * @param {boolean} strict
     * @return {Rgb}
     */
    clamp(min, max, strict = true) {
        super.clamp(min, max, strict);

        if(strict === true) {
            if(this.getZ() < min.getX()) {
                this.setZ(min.getX());
            }

            if(this.getZ() > max.getY()) {
                this.setZ(max.getY());
            }
        }

        return this;
    }
}