import Rgb from "../Rgb/Rgb";
import {Vector2D} from "@inwebo/vector";

/**
 * Representation of a sprite as ImageData object.
 *
 * A sprite HAS an imageData
 * A sprite HAS an origin (NE=0, N=1, NW=2, W=3, SW=4, S=5, SE=6, NE=7) default 0
 * A sprite MAY have a transparency colour, it s a Rgb() instance
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ImageData
 * @see https://github.com/inwebo/Sprite.js/blob/master/src/Rgb/Rgb.js
 */
export default class Sprite {

    /**
     * @return {Rgb|null}
     */
    getTransparencyColor() {
        return this._transparentColor;
    }

    /**
     * @return {ImageData}
     */
    get imgData() {
        return this._imgData;
    }

    /**
     * @param {ImageData}   imgData
     * @param {number|null} origin (NE=0, N=1, NW=2, W=3, SW=4, S=5, SE=6, NE=7)
     * @param {Rgb|null}    transparentColor
     */
    constructor(imgData, origin = null, transparentColor = null) {
        this._imgData          = imgData;
        this._origin           = origin || 0;
        this._transparentColor = null;
    }

    /**
     * @param {Number} r [0, 255] will be clamped if out out bounds
     * @param {Number} g [0, 255] will be clamped if out out bounds
     * @param {Number} b [0, 255] will be clamped if out out bounds
     */
    setTransparencyColor(r, g ,b) {
        this._transparentColor = new Rgb(r, g, b);
    }

    /**
     * @return {Sprite}
     */
    resetTransparencyColor() {
        this._transparentColor = null;

        return this;
    }

    /**
     * @return {boolean}
     */
    hasTransparencyColor() {
        return !(this._transparentColor === null);
    }

    /**
     * Read UintArray to apply a transparency color to ImageData pixels.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Objets_globaux/Uint8Array
     */
    applyTransparency() {
        if(this.hasTransparencyColor()) {
            for (let i = 0; i < this._imgData.data.length; i += 4) {
                const inputRgb = new Rgb(this._imgData.data[i], this._imgData.data[i + 1], this._imgData.data[i + 2]);
                if (this.getTransparencyColor().equals(inputRgb)) {
                    this._imgData.data[i + 3] = 0;
                }
            }
        }
    }

    /**
     * Validate instance origin
     * @return {boolean}
     */
    validateOrigin() {
        return this._validateOrigin(this._origin);
    }

    /**
     * Validate an origin
     * @param {Number} origin
     * @return {boolean}
     * @private
     */
    _validateOrigin(origin) {
        if(Number.isInteger(origin)) {
            if(origin <= 7) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {Number} origin (NE=0, N=1, NW=2, W=3, SW=4, S=5, SE=6, E=7)
     */
    setOrigin(origin = 0) {
        if(this._validateOrigin(origin)) {
            this._origin = origin;
        } else {
            throw `origin ${origin} : MUST BE AN INTEGER (is ${typeof origin}) lower or equal than 7.`;
        }
    }

    /**
     * Return relative coordinates from a pivot point this._origin (NE=0, N=1, NW=2, W=3, SW=4, S=5, SE=6, E=7).
     *
     * @return {Vector2D}
     */
    getCenter() {
        const width  = Math.round(this._imgData.width);
        const height = Math.round(this._imgData.height);

        switch (this._origin) {
            // North east
            case 0:
                return new Vector2D(0, 0);
            // North
            case 1:
                return new Vector2D(Math.round(width/2), 0);
            // North west
            case 2:
                return new Vector2D(width, 0);
            // West
            case 3:
                return new Vector2D(width, Math.round(height/2));
            // South west
            case 4:
                return new Vector2D(width, height);
            // South
            case 5:
                return new Vector2D(Math.round(width/2), height);
            // South east
            case 6:
                return new Vector2D(0, height);
            // East
            case 7:
                return new Vector2D(0, Math.round(height/2));
            default:
                throw `this._origin=${this._origin} : MUST BE AN INTEGER lower or equal than 7. Use Sprite.setOrigin() !`;
        }
    }
}