import { Renderer2D } from "@inwebo/render.js";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
 */
export default class RenderSprite extends Renderer2D{
    _draw([sprite]) {
        if(sprite.hasTransparencyColor()) {
            sprite.applyTransparency();
        }

        this.getCtx().putImageData(sprite.imgData, 0, 0);
    }
}