import { Scene } from 'phaser'
import SPRITES from '../constants/sprites'
import IMAGES from '../constants/images'
import SOUNDS from '../constants/sounds'
import LEVELS, { getLevelsArray } from '../constants/levels'

const { KEY, TEXTURE, ATLAS } = SPRITES

export class Preloader extends Scene {
    constructor() {
        super('Preloader')
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(512, 384, 'background')

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress
        })
        console.log('Preloader scene created!')
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets')

        this.load.image('logo', 'logo.png')
        this.load.image('title', 'title.png')

        // this.load.image('popup', 'popup/green_pressed.png');

        this.load.atlas(KEY, TEXTURE, ATLAS)

        this.load.image(IMAGES.MAP_PEACE.KEY, IMAGES.MAP_PEACE.FILE)
        this.load.image(IMAGES.MAP_DISASTER.KEY, IMAGES.MAP_DISASTER.FILE)

        this.load.audio(SOUNDS.EARTHQUAKE.KEY, SOUNDS.EARTHQUAKE.FILE)
        this.load.audio(SOUNDS.WARNING.KEY, SOUNDS.WARNING.FILE)

        for (const level of getLevelsArray()) {
            this.load.text(level.KEY, level.FILE)
        }

        // this.loadFont('Roboto', 'assets/fonts/RobotoCondensed.ttf')
        this.load.font('Roboto', 'fonts/RobotoCondensed.ttf', 'truetype')

        this.load.font('VT323', 'fonts/VT323.ttf', 'truetype')
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu')
    }
}
