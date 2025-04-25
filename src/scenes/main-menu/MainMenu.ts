import { Scene } from 'phaser'
import MenuContainer from './components/MenuContainer'

export class MainMenu extends Scene {
    private menuContainer: MenuContainer

    constructor() {
        super('MainMenu')
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000)
        this.menuContainer = new MenuContainer(this)

        this.menuContainer.setPosition(512, 576 / 2)

        this.add.existing(this.menuContainer)

        // this.input.once('pointerdown', () => {

        //     this.scene.start('Game');

        // });

        // console.log('MainMenu scene created!', this.textures.get('texture'))

        // const button = new NineSliceButton(this, 1024 / 2, 768 / 2, {
        //     texture: KEY,
        //     frame: FRAME.POPUP,
        //     width: 200,
        //     height: 50,
        //     leftWidth: 10,
        //     rightWidth: 10,
        //     topHeight: 10,
        //     bottomHeight: 10,
        // })

        // this.add.existing(button)

        // const text = this.add.text(0, 0, 'Play', {
        //     fontFamily: 'Roboto', fontSize: 24, color: '#000000', align: 'center'
        // })

        // text.setOrigin(0.5)

        // button.add(text)

        // const image = this.add.image(1024/2, 768/2, 'texture', 'original/popup/green_pressed.png')

        // button.onClick(() => {
        //     console.log('Button clicked!')
        //     this.scene.start('Game')
        // })
    }
}
