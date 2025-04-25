import SPRITES from '../../../constants/sprites'

const { KEY, FRAME } = SPRITES

enum StressLevel {
    COMPOSED = 'Composed',
    STRAINED = 'Strained',
    FRACTURED = 'Fractured',
}

const StressLevelColorMap = {
    [StressLevel.COMPOSED]: '#00ff00',
    [StressLevel.STRAINED]: '#ffff00',
    [StressLevel.FRACTURED]: '#ff0000',
}

class SquadCard extends Phaser.GameObjects.Container {
    private avatar: Phaser.GameObjects.Image
    private characterName: Phaser.GameObjects.Text
    private role: Phaser.GameObjects.Text
    private stressLevelText: Phaser.GameObjects.Text
    private stressAmount: number
    private stressLevel: StressLevel

    constructor(scene: Phaser.Scene, x: number, y: number, character: ICharacter) {
        super(scene, x, y)

        this.setSize(200, 64)

        this.avatar = this.scene.add.image(0, 0, KEY, FRAME.AVATAR.DEFAULT)
        this.characterName = this.scene.add.text(0, 0, character.name, {
            fontFamily: 'VT323',
            fontSize: 16,
            color: '#000000',
            align: 'left',
        })
        this.role = this.scene.add.text(0, 0, character.role, {
            fontFamily: 'VT323',
            fontSize: 16,
            color: '#000000',
            align: 'left',
        })
        this.stressLevelText = this.scene.add.text(0, 0, '0', {
            fontFamily: 'VT323',
            fontSize: 16,
            color: '#000000',
            align: 'left',
        })
        this.avatar.setOrigin(0.5)
        this.characterName.setOrigin(0)
        this.role.setOrigin(0)
        this.stressLevelText.setOrigin(0)
        this.add([this.avatar, this.characterName, this.role, this.stressLevelText])
        this.updateStressLevel(0)

        this.align()
    }

    private align() {
        Phaser.Display.Align.In.LeftCenter(this.avatar, this)
        Phaser.Display.Align.In.TopLeft(this.characterName, this, -this.avatar.width - 10, -5)
        Phaser.Display.Align.In.TopLeft(this.role, this, -this.avatar.width - 10, -25)
        Phaser.Display.Align.In.TopLeft(this.stressLevelText, this, -this.avatar.width - 10, -45)
    }

    private updateStressLevel(stressAmount: number) {
        this.stressAmount = stressAmount

        if (stressAmount <= 40) {
            this.stressLevel = StressLevel.COMPOSED
        } else if (stressAmount <= 75) {
            this.stressLevel = StressLevel.STRAINED
        } else {
            this.stressLevel = StressLevel.FRACTURED
        }

        this.stressLevelText.setStyle({ color: StressLevelColorMap[this.stressLevel] })
        this.stressLevelText.setText(this.stressLevel)
    }
}

export default SquadCard
