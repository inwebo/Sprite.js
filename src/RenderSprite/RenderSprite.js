import { Renderer2D } from "@inwebo/render.js";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
 */
export default class RenderSprite extends Renderer2D{
    _clear(...subject) {
        this.getCtx().clearRect(0,0, this._canvas.width, this._canvas.height);
    }

    _draw(...subject) {
        /**
         * @type {Sprite}
         */
        const s = subject[0][0];

        if(s.hasTransparencyColor()) {
            s.applyTransparency();
        }

        this.getCtx().putImageData(s.imgData,0,0);
    }
}