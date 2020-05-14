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

    // Origin 695 x 219
    // Dimension 64 x 80


    img.onload = () => {
        rendererSheet.draw(img);

        /**
         * @type {ImageData}
         */
        const imageData = rendererSheet.getCtx().getImageData(695, 219, 64, 80);

        const sprite = new Sprite(imageData);

        sprite.setTransparencyColor(255,255,255);
        sprite.applyTransparency();

        // const data = imageData.data;
        //
        // for (let i = 0; i < data.length; i += 4) {
        //     data[i + 0] = 0;    // R value
        //     data[i + 1] = 190;  // G value
        //     data[i + 2] = 0;    // B value
        //     data[i + 3] = 0;    // A value
        // }
        // const clamp = Uint8ClampedArray.from(imageData.data);
        // imageData = new ImageData(clamp);

        renderSprite.draw(sprite);
    };
});
