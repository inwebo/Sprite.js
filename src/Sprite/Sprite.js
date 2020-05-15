import Rgb from "../Rgb/Rgb";

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
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
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

    applyTransparency() {
        if(this.hasTransparencyColor) {
            for (let i = 0; i < this._imgData.data.length; i += 4) {
                const inputRgb = new Rgb(this._imgData.data[i], this._imgData.data[i + 1], this._imgData.data[i + 2]);

                if (this.getTransparencyColor().equals(inputRgb)) {
                    this._imgData.data[i + 3] = 0;
                }
            }
        }
    }
}