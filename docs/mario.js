import RenderSheet from "../src/RenderSheet/RenderSheet";
import SpriteMap from "../src/SpriteMap/SpriteMap";
import AnimatedSprite from "../src/AnimatedSprite/AnimatedSprite";
import RenderSprite from "../src/RenderSprite/RenderSprite";

// Prepare canvas
const renderMarioSheetRender  = new RenderSheet(document.getElementById('mario-sheet'));
const renderMarioSpriteRender = new RenderSprite(document.getElementById('mario-walking'));

// Sheet src
const sheerSrc        = './mario.png';
const marioSheetImage = new Image();

window.addEventListener("DOMContentLoaded", (event) => {

    // Sheet is fully loaded callback
    marioSheetImage.onload = (e) => {
        // Render sheet, its pixels are now available
        renderMarioSheetRender.draw(marioSheetImage);

        // Load animation config
        fetch("mario.json")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                try {

                    const frames = [];

                    frames.push(renderMarioSheetRender.getCtx().getImageData(0, 0, 16, 32));
                    frames.push(renderMarioSheetRender.getCtx().getImageData(17, 0, 16, 32));
                    frames.push(renderMarioSheetRender.getCtx().getImageData(34, 0, 16, 32));

                    const marioWalking = new AnimatedSprite(frames);

                    // And animate it
                    setInterval(() => {
                        renderMarioSpriteRender.draw(marioWalking);
                        marioWalking.step();
                    }, 100);

                } catch (e) {
                    console.log(e);
                }
            });

    };

    marioSheetImage.src = sheerSrc;
});