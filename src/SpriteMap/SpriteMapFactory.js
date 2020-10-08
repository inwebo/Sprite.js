/**
 * Validate a JSON input
 */
export default class SpriteMapFactory {
    constructor(json) {
        this._json = json;
    }

    validate() {
        if(this._json.tiles === undefined) {
            throw "Object's tile attribut is mandatory, see https://github.com/inwebo/Sprite.js/blob/master/docs/assets/img/mario.json";
        }
    }
}