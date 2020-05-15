import RenderSheet from "../src/RenderSheet/RenderSheet";
import RenderSprite from "../src/RenderSprite/RenderSprite";
import Sprite from "../src/Sprite/Sprite";
import AnimatedSprite from "../src/AnimatedSprite/AnimatedSprite";

const spriteSheet         = './zelda3.png';
const animatedSpriteSheet = './doom2.png';

const img         = new Image();


const animatedImg = new Image();


window.addEventListener("DOMContentLoaded", (event) => {
    // Sheet
    const sheetCanvas   = document.getElementById('sprite-sheet');
    const rendererSheet = new RenderSheet(sheetCanvas);
    // Sprite
    const spriteCanvas  = document.getElementById('sprite');
    const renderSprite  = new RenderSprite(spriteCanvas);

    // Sheet
    const animatedSpriteCanvas  = document.getElementById('animated-sprite-sheet');
    const rendererAnimatedSheet = new RenderSheet(animatedSpriteCanvas);
    // Sprite
    const frame1Canvas  = document.getElementById('animated-sprite');
    const renderFrame1  = new RenderSprite(frame1Canvas);

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

    img.src = spriteSheet;

    animatedImg.onload = () => {
        rendererAnimatedSheet.draw(animatedImg);

        const frame1 = rendererAnimatedSheet.getCtx().getImageData(44, 33, 41, 57);
        const frame2 = rendererAnimatedSheet.getCtx().getImageData(44, 123, 39, 56);
        const frame3 = rendererAnimatedSheet.getCtx().getImageData(44, 213, 39, 56);
        const frame4 = rendererAnimatedSheet.getCtx().getImageData(44, 306, 37, 56);

        const map = [];
        map.push(frame1);
        map.push(frame2);
        map.push(frame3);
        map.push(frame4);

        const animatedSprite = new AnimatedSprite(map);
        animatedSprite.setTransparencyColor(82, 255, 254);

        setInterval(() => {
            animatedSprite.applyTransparency();
            renderFrame1.draw(animatedSprite);
            animatedSprite.step();
        }, 200);
    }

    animatedImg.src = animatedSpriteSheet;
});
