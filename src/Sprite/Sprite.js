export default class Sprite {

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
        this._transparentColor = [];
    }

    /**
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
     */
    setTransparencyColor(r, g ,b) {
        this._transparentColor = [];
        this._transparentColor.push(r);
        this._transparentColor.push(g);
        this._transparentColor.push(b);
    }

    applyTransparency() {
        if(this._transparentColor.length === 3) {
            for (let i = 0; i < this._imgData.data.length; i += 4) {
                const r = this._imgData.data[i];
                const g = this._imgData.data[i + 1];
                const b = this._imgData.data[i + 2];

                if (
                    r === this._transparentColor[0] &&
                    g === this._transparentColor[1] &&
                    b === this._transparentColor[2]
                ) {
                    this._imgData.data[i + 3] = 0;
                }
            }
        }
    }
}