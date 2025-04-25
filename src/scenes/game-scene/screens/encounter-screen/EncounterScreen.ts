import Screen from '../../../../common/components/Screen'
import { ILevelData } from '../../../../types/level'
import LevelsUtils from '../../../../utils/LevelsUtils'
import { GameScene } from '../../GameScene'
import EncounterContainer from './EncounterContainer'

class EncounterScreen extends Screen {
    public scene: GameScene
    private encounterContainer: EncounterContainer
    private sceneData: ILevelData

    constructor(scene: GameScene) {
        super(scene)
        this.scene = scene
        this.setName('EncounterScreen')

        this.create()
        this.createInput()

        this.setAlpha(0)
    }

    private create() {
        this.createEncounterContainer()
    }

    public open(data?: any): void {
        super.open(data)
        this.readLevelFile()
        this.runOpenAnimation()
    }

    public close(): void {
        this.disableInput()
        this.runCloseAnimation()
    }

    private createEncounterContainer() {
        this.encounterContainer = new EncounterContainer(this.scene)
        this.add(this.encounterContainer)
    }

    private createInput() {
        this.backgroundMask.setInteractive()
        this.backgroundMask.setDepth(0)
        this.backgroundMask.on('pointerdown', this.runCloseAnimation)
        this.encounterContainer.beginButton.onClick(this.handleOnClickedBeginEncounter)
    }

    private enableInput() {
        this.backgroundMask.setInteractive()
        this.backgroundMask.on('pointerdown', this.runCloseAnimation)
    }

    private disableInput() {
        this.backgroundMask.removeAllListeners()
        this.backgroundMask.disableInteractive()
        this.backgroundMask.off('pointerdown', this.runCloseAnimation)
    }

    private async runOpenAnimation() {
        return new Promise<void>((resolve) => {
            this.scene.tweens.add({
                targets: this,
                alpha: 1,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    resolve()
                    this.enableInput()
                },
            })
        })
    }

    private runCloseAnimation = async () => {
        return new Promise<void>((resolve) => {
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    super.close()
                    resolve()
                },
            })
        })
    }

    private readLevelFile() {
        const { key } = this.screenData
        console.log('Key:', key)
        const data = LevelsUtils.getLevelData(this.scene, key)
        console.log('Level data:', data.scene_description)
        this.sceneData = data
        this.encounterContainer.title.setText(data.scene_name)
        this.encounterContainer.description.setText(data.scene_description)
    }

    private handleOnClickedBeginEncounter = () => {
        this.scene.screenManager.closeScreen('encounter')
        this.scene.screenManager.openScreen('dialogue', {
            scene: this.sceneData,
        })
    }
}

export default EncounterScreen
