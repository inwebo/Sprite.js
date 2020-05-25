import { Renderer2D } from "@inwebo/render.js";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
 */
export default class RenderSprite extends Renderer2D{
    _draw(...subject) {
        /**
         * @type {Sprite}
         */
        const s = subject[0];

        if(s.hasTransparencyColor()) {
            s.applyTransparency();
        }

        this.getCtx().putImageData(s.imgData,0,0);
    }
}