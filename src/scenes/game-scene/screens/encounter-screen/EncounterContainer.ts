import NineSliceButton from '../../../../common/components/NineSliceButton'
import SPRITES from '../../../../constants/sprites'

const { KEY, FRAME } = SPRITES

const CONTAINER_SIZE = {
    WIDTH: 500,
    HEIGHT: 400,
}

class EncounterContainer extends Phaser.GameObjects.Container {
    private popup: Phaser.GameObjects.NineSlice
    public title: Phaser.GameObjects.Text
    public description: Phaser.GameObjects.Text
    public beginButton: NineSliceButton
    constructor(scene: Phaser.Scene) {
        super(scene)

        this.setSize(CONTAINER_SIZE.WIDTH, CONTAINER_SIZE.HEIGHT)
        this.create()
        this.align()
    }

    private create() {
        this.createPopup()
        this.createContent()
        this.createBeginButton()
    }

    private align() {
        Phaser.Display.Align.In.TopLeft(this.title, this, -30, -20)
        Phaser.Display.Align.To.TopLeft(this.description, this, -30, -90)
        Phaser.Display.Align.In.BottomCenter(this.beginButton, this, 0, -30)
    }

    private createPopup() {
        this.popup = this.scene.add.nineslice(
            0,
            0,
            KEY,
            FRAME.POPUP,
            CONTAINER_SIZE.WIDTH,
            CONTAINER_SIZE.HEIGHT,
            10,
            10,
            10,
            10
        )
        this.popup.setOrigin(0.5)
        this.popup.setAlpha(1)
        this.popup.setInteractive()
        this.popup.setDepth(1)

        this.add(this.popup)
    }

    private createContent() {
        this.title = this.scene.add.text(0, 0, 'Encounter', {
            fontFamily: 'VT323',
            fontSize: 48,
            color: '#000000',
            align: 'left',
        })
        // .setOrigin(0.5, 0)

        this.description = this.scene.add.text(0, 0, 'This is an encounter description.', {
            fontFamily: 'VT323',
            fontSize: 18,
            color: '#000000',
            align: 'left',
            wordWrap: { width: this.width - 60 },
        })
        // .setOrigin(0.5, 0)

        this.add(this.title)
        this.add(this.description)
    }

    private createBeginButton() {
        this.beginButton = new NineSliceButton(this.scene, 0, 0, {
            texture: KEY,
            frame: FRAME.POPUP,
            width: 200,
            height: 50,
            leftWidth: 10,
            rightWidth: 10,
            topHeight: 10,
            bottomHeight: 10,
        })

        const buttonText = this.scene.add.text(0, 0, 'Begin', {
            fontFamily: 'VT323',
            fontSize: 18,
            color: '#000000',
            align: 'center',
        })

        buttonText.setOrigin(0.5, 0.5)
        buttonText.setDepth(1)

        this.beginButton.add(buttonText)

        this.add(this.beginButton)
    }
}

export default EncounterContainer
