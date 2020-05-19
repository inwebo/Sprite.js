import RenderSheet  from '../../../src/RenderSheet/RenderSheet'
import RenderSprite from '../../../src/RenderSprite/RenderSprite';
import SpriteMap    from '../../../src/SpriteMap/SpriteMap';

// Prepare canvas
const renderMarioSheetRender  = new RenderSheet(document.getElementById('mario-sheet'));
const renderMarioSpriteRender = new RenderSprite(document.getElementById('mario-walking'));



// Sheet src
const sheerSrc        = 'assets/img/mario.png';
const marioSheetImage = new Image();

window.addEventListener("DOMContentLoaded", (event) => {

    // Sheet is fully loaded callback
    marioSheetImage.onload = (e) => {
        // Render sheet, its pixels are now available
        renderMarioSheetRender.draw(marioSheetImage);

        // Load animation config
        fetch("assets/img/mario.json")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                try {
                    const spriteMap = new SpriteMap(json, renderMarioSheetRender.getCtx());
                    const mario     = spriteMap.get('walking');
                    // And animate it
                    setInterval(() => {
                        renderMarioSpriteRender.draw(mario);
                        mario.step();
                    }, mario.getDuration());

                } catch (e) {
                    console.log(e);
                }
            });

    };

    marioSheetImage.src = sheerSrc;
});