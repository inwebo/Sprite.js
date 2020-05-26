import RenderSprite      from '../../../src/RenderSprite/RenderSprite';
import SpriteMap         from '../../../src/SpriteMap/SpriteMap';
import {AssetsLoader}    from '@inwebo/assetsloader.js';
import {RenderOffScreen} from '@inwebo/render.js';

window.addEventListener("DOMContentLoaded", (event) => {

    const marioSheet              = AssetsLoader.image('assets/img/mario.png');
    const marioJSONMap            = AssetsLoader.json('assets/img/mario.json');
    const renderMarioSpriteRender = new RenderSprite(document.getElementById('mario-walking'));

    Promise.all([marioSheet, marioJSONMap])
        .then(([marioSheet, marioJSONMap]) => {

            const marioSheetOffScreenRenderer = new RenderOffScreen(document.getElementById('mario-walking'), marioSheet);
            const spriteMap = new SpriteMap(marioJSONMap, marioSheetOffScreenRenderer.getCtx());
            const mario     = spriteMap.get('walking');

            setInterval(() => {
                renderMarioSpriteRender.draw(mario);
                mario.step();
            }, mario.getDuration());
        })
        .catch((e) => {
            console.log(e);
        });
});