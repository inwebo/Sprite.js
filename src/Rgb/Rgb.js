import Vector2D from "@inwebo/vector/src/Vector2D";

export default class Rgb extends Vector2D {

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
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
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