import Rgb from "../Rgb/Rgb";

/**
 * Representation of a sprite as ImageData object. May manipulate pixels to apply transparency to one color.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ImageData
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
     * @param {ImageData} imgData
     */
    constructor(imgData) {
        this._imgData          = imgData;
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
        return !(this._transparentColor == null);
    }

    /**
     * Read UintArray to apply a transparency color to ImageData pixels.
     *
     * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Uint8Array
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
}