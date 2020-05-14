import Renderer2D from "@inwebo/render.js/src/Renderer2D";

export default class RenderSprite extends Renderer2D{
    _draw(...subject) {
        /**
         * @type {Sprite}
         */
        const s = subject[0][0];
        this.getCtx().putImageData(s.imgData,0,0);
    }
}