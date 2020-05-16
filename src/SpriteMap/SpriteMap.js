import Sprite from "../Sprite/Sprite";
import AnimatedSprite from "../AnimatedSprite/AnimatedSprite";

export default class SpriteMap {

    /**
     * @return {Map}
     */
    getMap() {
        return this._map;
    }

    /**
     * @param {Object} json
     * @param {CanvasRenderingContext2D} context Original canvas context
     */
    constructor(json, context) {
        this._json      = json;
        this._context   = context;
        this._map       = new Map();
        this.build();
    }

    /**
     * @param {Object} value
     * @return {Sprite}
     */
    _buildSprite(value) {
        const imageData = this
            ._context
            .getImageData(value.origin[0], value.origin[1], value.size[0], value.size[1])
        ;

        const sprite = new Sprite(imageData);

        if(value.transparency != null) {
            sprite.setTransparencyColor(value.transparency[0], value.transparency[1], value.transparency[2]);
        }

        return sprite;
    }

    build() {
        for (let [name, values] of Object.entries(this._json)) {
            const isAnimated = values.duration != null;

            if(!isAnimated) {
                this._map.set(name, this._buildSprite(values));
            } else {
                const buffer = [];
                for (let [animationName, frames] of Object.entries(values.frames)) {
                    buffer.push(this._buildSprite(frames));
                }

                const animatedSprite = new AnimatedSprite(buffer, values.duration);

                this._map.set(name, animatedSprite);
            }
        }
    }
}