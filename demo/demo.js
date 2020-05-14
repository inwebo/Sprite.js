import RenderSheet from "../src/RenderSheet/RenderSheet";
import RenderSprite from "../src/RenderSprite/RenderSprite";
import Sprite from "../src/Sprite/Sprite";

const spriteSheet = './zelda3.png';
const img         = new Image();
img.src           = spriteSheet;

window.addEventListener("DOMContentLoaded", (event) => {
    const sheetCanvas   = document.getElementById('sprite-sheet');
    const rendererSheet = new RenderSheet(sheetCanvas);

    const spriteCanvas  = document.getElementById('sprite');
    const renderSprite  = new RenderSprite(spriteCanvas);

    img.onload = () => {
        rendererSheet.draw(img);

        /**
         * @type {ImageData}
         */
        const imageData = rendererSheet.getCtx().getImageData(695, 219, 64, 80);

        const sprite = new Sprite(imageData);

        sprite.setTransparencyColor(255,255,255);
        sprite.applyTransparency();

        renderSprite.draw(sprite);
    };
});
