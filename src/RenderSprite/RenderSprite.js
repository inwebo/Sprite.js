import Renderer2D from "@inwebo/render.js/src/Renderer2D";

export default class RenderSprite extends Renderer2D{
    _clear(...subject) {
        this.getCtx().fillStyle = 'rgba(255,255,255,0)';
        this.getCtx().fillRect(0,0,  this._canvas.width,this._canvas.height);
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