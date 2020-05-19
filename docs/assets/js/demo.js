import RenderSheet    from '../../../src/RenderSheet/RenderSheet'
import RenderSprite   from '../../../src/RenderSprite/RenderSprite';
import SpriteMap      from '../../../src/SpriteMap/SpriteMap';
import Sprite         from '../../../src/Sprite/Sprite';
import AnimatedSprite from '../../../src/AnimatedSprite/AnimatedSprite';

// Sheet source
const sheetSrc    = './doom.png';
const spriteSheet = new Image();


window.addEventListener("DOMContentLoaded", (event) => {

    //Sheet canvas renderer
    const sheetRenderer = new RenderSheet(document.getElementById('sheetCanvas'));

    //Sprite renderer
    const spriteRenderer = new RenderSprite(document.getElementById('sprite'));

    //Sprite whith transparency renderer
    const transparencyRenderer = new RenderSprite(document.getElementById('spriteTransparency'));

    //Animated sprite renderer
    const spriteTransparencyAnimatedRenderer = new RenderSprite(document.getElementById('spriteTransparencyAnimated'));

    // Set callback, sprite sheet image is loaded and available
    spriteSheet.onload = (e) => {
        // Draw to sheet canvas
        sheetRenderer.draw(spriteSheet);

        // Pick up first frame from sheet canvas
        const frame1 = sheetRenderer.getCtx().getImageData(5, 5, 42, 60);
        // Create sprite object
        const sprite = new Sprite(frame1);
        // And draw it
        spriteRenderer.draw(sprite);

        // Set up transparency color
        sprite.setTransparencyColor(255,0,255);

        transparencyRenderer.draw(sprite);

        // Load all frames in array
        const frames = [];

        const frame2 = sheetRenderer.getCtx().getImageData(5, 70, 42, 60);
        const frame3 = sheetRenderer.getCtx().getImageData(5, 135, 42, 60);
        const frame4 = sheetRenderer.getCtx().getImageData(5, 200, 42, 60);

        frames.push(frame1, frame2, frame3, frame4);

        // Create animated sprite
        const animatedSprite = new AnimatedSprite(frames);

        // Set transparency color
        animatedSprite.setTransparencyColor(255, 0, 255);

        // And animate it
        setInterval(() => {
            spriteTransparencyAnimatedRenderer.draw(animatedSprite);
            animatedSprite.step();
        }, 200);
    };

    spriteSheet.src = sheetSrc;

    fetch("doom.json")
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            try {
                const spriteMap = new SpriteMap(json, sheetRenderer.getCtx());
            } catch (e) {
                console.log(e);
            }
        });

});
