import Sprite from "../Sprite/Sprite";

export default class AnimatedSprite extends Sprite {

    constructor(map) {
        super();
        this._map          = map;
        this._imgData      = map[0];
        this._currentFrame = 0;
    }

    step() {
        this._currentFrame += 1;
        if(this._currentFrame > this._map.length - 1) {
            this._currentFrame = 0;
        }

        this._imgData       = this._map[this._currentFrame];
    }
}