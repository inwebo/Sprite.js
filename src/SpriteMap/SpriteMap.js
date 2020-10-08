import Sprite from "../Sprite/Sprite";
import AnimatedSprite from "../AnimatedSprite/AnimatedSprite";

/**
 * Utility class, will build sprites from a json file.
 */
export default class SpriteMap {

    /**
     * @return {Map<string, Sprite>}
     */
    getSpritesMap() {
        return this._spritesMap;
    }

    /**
     * @param {String} spriteName
     * @return {Sprite|AnimatedSprite}
     */
    get(spriteName) {
        return this._spritesMap.get(spriteName);
    }

    /**
     * @param {Object} json
     * @param {CanvasRenderingContext2D} context Original canvas context
     */
    constructor(json, context) {
        this._json       = json;
        this._context    = context;
        this._spritesMap = new Map();
        this._build();
    }

    /**
     * @param {Object} value
     * @return {Sprite}
     * @private
     */
    _buildSprite(value) {
        if(!Array.isArray(value.dimensions)) {
            throw "Json dimensions entry MUST BE AN array is `${type of value.dimensions}`";
        } else {
            if(value.dimensions[0] === undefined || value.dimensions[1] === undefined) {
                throw "Json dimension[0] or Json dimension[1] is mandatory";
            }
        }

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
     * @private
     */
    _build() {
        const tiles      = this._json.tiles;
        const animations = this._json.animations;

        if(tiles !== undefined) {
            for (let [name, values] of Object.entries(tiles)) {
                this._spritesMap.set(name, this._buildSprite(values));
            }
        }

        if(animations !== undefined) {
            for (let [name, values] of Object.entries(animations)) {
                const loopDuration = values.loopDuration;
                const tiles   = values.tiles;
                const buffer   = [];

                tiles.forEach((frameName) => {
                    buffer.push(this.get(frameName).imgData);
                });

                const animatedSprite = new AnimatedSprite(buffer, loopDuration);

                this.getSpritesMap().set(name, animatedSprite);
            }
        }
    }
}