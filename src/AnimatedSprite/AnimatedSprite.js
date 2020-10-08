import Sprite from "../Sprite/Sprite";

/**
 * Sprites collection to animate.
 */
export default class AnimatedSprite extends Sprite {

    /**
     * @return {Number}
     */
    getLoopDuration() {
        return this._loopDuration;
    }

    /**
     * @return {Number}
     */
    getCurrentFrame() {
        return this._currentFrame;
    }

    /**
     * @param {[ImageData]} map
     * @param {Number} loopDuration
     * @param {Number} startingFrame
     */
    constructor(map, loopDuration, startingFrame = 0) {
        super(map[0]);
        this._map          = map;
        this._loopDuration = loopDuration;
        this._currentFrame = startingFrame;
    }

    /**
     * Loop over Sprite collection
     */
    step() {
        this._currentFrame += 1;
        if(this._currentFrame > this._map.length - 1) {
            this._currentFrame = 0;
        }

        this._imgData = this._map[this._currentFrame];
    }
}