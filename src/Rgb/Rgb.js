export default class Rgb {

    _validateValue(color, value) {
        if(value > 255 || isNaN(value)) {
            throw `${color} is not valid ! ${value} > 255`;
        }
    }

    /**
     * @param {Number} value <= 255
     */
    set r(value) {
        this._validateValue('red', value);
        this._r = value;
    }

    /**
     * @param {Number} value <= 255
     */
    set g(value) {
        this._validateValue('green', value);
        this._g = value;
    }

    /**
     * @param {Number} value <= 255
     */
    set b(value) {
        this._validateValue('blue', value);
        this._b = value;
    }

    /**
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
     */
    constructor(r, g, b) {
        this._r = r;
        this._g = g;
        this._b = b;
    }
}