import Sprite from "../Sprite/Sprite";
import AnimatedSprite from "../AnimatedSprite/AnimatedSprite";

/**
 * Utility class, will build sprites from a json file.
 */
export default class SpriteMap {

    /**
     * @return {Map}
     */
    getMap() {
        return this._map;
    }

    /**
     * @param {String} spriteName
     * @return {Sprite|AnimatedSprite}
     */
    get(spriteName) {
        return this._map.get(spriteName);
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
            .getImageData(value.origin[0], value.origin[1], value.dimensions[0], value.dimensions[1])
        ;

        const sprite = new Sprite(imageData);

        if(value.transparency != null) {
            sprite.setTransparencyColor(value.transparency[0], value.transparency[1], value.transparency[2]);
        }

        return sprite;
    }

    /**
     * Parse a json file sprites map to build up sprites object.
     */
    build() {
        const tiles      = this._json.tiles;
        const animations = this._json.animations;

        if(tiles !== undefined) {
            for (let [name, values] of Object.entries(tiles)) {
                this._map.set(name, this._buildSprite(values));
            }
        }

        if(animations !== undefined) {
            for (let [name, values] of Object.entries(animations)) {
                const duration = values.duration;
                const tiles   = values.tiles;
                const buffer   = [];

                tiles.forEach((frameName) => {
                    buffer.push(this.get(frameName).imgData);
                });

                const animatedSprite = new AnimatedSprite(buffer, duration);

                this._map.set(name, animatedSprite);
            }
        }
    }
}