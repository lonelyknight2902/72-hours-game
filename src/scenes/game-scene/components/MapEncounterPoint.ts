import SPRITES from '../../../constants/sprites'
import LevelsUtils from '../../../utils/LevelsUtils'
import { GameScene } from '../GameScene'

class MapEncounterPoint extends Phaser.GameObjects.Container {
    public scene: GameScene
    private point: Phaser.GameObjects.Image
    private key: string

    constructor(scene: GameScene, key: string, x: number, y: number) {
        super(scene)
        this.scene = scene
        this.setPosition(x, y)
        this.key = key

        this.create()
        this.enableInput()
        this.checkIfResolved()
    }

    private create() {
        this.createPoint()
    }

    private enableInput() {
        this.point.setInteractive({
            cursor: 'pointer',
        })
        this.point.on('pointerdown', this.runEncounter)

        this.scene.events.on('encounterResolved', this.checkIfResolved)
    }

    private createPoint() {
        this.point = this.scene.add.image(0, 0, SPRITES.KEY, SPRITES.FRAME.POPUP)
        this.add(this.point)
    }

    private checkIfResolved = () => {
        // console.log('MapEncounterPoint checkIfResolved', this.key, this.scene.resolvedEncounters)
        console.log('MapEncounterPoint checkIfResolved', this.scene)
        if (this.scene.resolvedEncounters.has(this.key)) {
            this.setVisible(false)
            this.point.disableInteractive()
        }
    }

    private runEncounter = () => {
        this.scene.screenManager.openScreen('encounter', {
            key: this.key,
        })
    }
}

export default MapEncounterPoint
