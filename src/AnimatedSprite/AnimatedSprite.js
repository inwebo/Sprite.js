import Sprite from "../Sprite/Sprite";

export default class AnimatedSprite extends Sprite {

    /**
     * @return {Number|null}
     */
    getDuration() {
        return this._duration;
    }

    /**
     * @param {[ImageData]} map
     * @param {Number|null} duration
     */
    constructor(map, duration) {
        super(map[0]);
        this._map          = map;
        this._currentFrame = 0;
        this._duration     = duration;
    }

    step() {
        this._currentFrame += 1;
        if(this._currentFrame > this._map.length - 1) {
            this._currentFrame = 0;
        }

        this._imgData = this._map[this._currentFrame];
    }
}