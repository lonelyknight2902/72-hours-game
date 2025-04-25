import Screen from '../../../common/components/Screen'
import SPRITES from '../../../constants/sprites'
import { GameScene } from '../GameScene'
import { ILevelData, IDialogueScene, IChoice } from '../../../types/level'
import DialogueContainer, { IDialogue } from '../components/DialogueContainer'

class DialogueScreen extends Screen {
    public scene: GameScene
    private title: Phaser.GameObjects.Text
    private description: Phaser.GameObjects.Text
    private choices: Phaser.GameObjects.Text[]
    private currentScene: ILevelData
    private currentSceneIndex: number = 0
    private dialogueContainer: DialogueContainer
    private isResolved: boolean = false
    private additionalBackgroundMask: Phaser.GameObjects.Rectangle

    constructor(scene: GameScene) {
        super(scene)
        this.scene = scene
        this.setName('DialogueScreen')

        this.setSize(800, 500)

        this.create()
        this.createInput()

        this.align()

        this.setAlpha(0)
    }

    public open(data?: { scene: ILevelData }): void {
        super.open(data)
        console.log('DialogueScreen open', data)
        if (data?.scene) {
            console.log('DialogueScreen scene open', data.scene)
            this.currentScene = data.scene
            this.currentSceneIndex = 0
            this.isResolved = false
            this.updateContent()
        }
        this.runOpenAnimation()
    }

    private create() {
        this.createAdditionalBackgroundMask()
        this.createContent()
        this.createDialogueContainer()
    }

    private createContent() {
        this.title = this.scene.add
            .text(0, 0, '', {
                fontFamily: 'VT323',
                fontSize: 32,
                color: '#ffffff',
                align: 'left',
            })
            .setOrigin(0.5, 0)

        this.description = this.scene.add
            .text(0, 0, '', {
                fontFamily: 'VT323',
                fontSize: 24,
                color: '#ffffff',
                align: 'left',
                wordWrap: { width: 800 - 60 },
            })
            .setOrigin(0.5, 0)

        this.choices = []

        this.add(this.title)
        this.add(this.description)
    }

    private createAdditionalBackgroundMask() {
        this.additionalBackgroundMask = this.scene.add.rectangle(0, 0, 1024, 576, 0x000000, 0.8)
        this.add(this.additionalBackgroundMask)
    }

    private createDialogueContainer() {
        this.dialogueContainer = new DialogueContainer(
            this.scene as GameScene,
            0,
            600 / 2 - 20,
            800,
            150
        )
        this.add(this.dialogueContainer)
    }

    private createInput() {}

    private align() {
        Phaser.Display.Align.In.TopLeft(this.title, this, -30, -30)
        Phaser.Display.Align.To.BottomLeft(this.description, this.title, 0, 20)

        // Align choices
        this.choices.forEach((choice, index) => {
            if (index === 0) {
                Phaser.Display.Align.To.TopLeft(choice, this.dialogueContainer, 0, 20)
            } else {
                Phaser.Display.Align.To.TopRight(choice, this.dialogueContainer, 0, 20)
            }
        })
    }

    private updateContent() {
        console.log(
            'DialogueScreen updateContent',
            this.currentScene,
            this.currentScene.scene_dialogues
        )
        if (!this.currentScene) return

        const scene = Object.values(this.currentScene.scene_dialogues[this.currentSceneIndex])[0]
        if (!scene) return

        console.log('DialogueScreen updateContent scene', scene)
        this.title.setText(this.currentScene.scene_name)
        this.description.setText(scene.area_context || '')

        // Clear existing choices
        this.choices.forEach((choice) => choice.destroy())
        this.choices = []

        // Queue up dialogues
        const dialogues: IDialogue[] = []
        if (scene.npc_dialogues) {
            Object.entries(scene.npc_dialogues).forEach(([speaker, text]) => {
                dialogues.push({ speaker, text })
            })
        }

        // Set dialogues in container
        this.dialogueContainer.setDialogues(dialogues, () => {
            // Create choices after dialogues are complete
            if (scene.choices) {
                Object.entries(scene.choices).forEach(([key, choice]) => {
                    if (!choice) return
                    const choiceText = this.scene.add
                        .text(0, 0, choice.text, {
                            fontFamily: 'VT323',
                            fontSize: 20,
                            color: '#0000ff',
                            align: 'left',
                            wordWrap: { width: 800 - 60 },
                        })
                        .setOrigin(0.5, 0)
                        .setInteractive({ useHandCursor: true })
                        .on('pointerdown', () => this.handleChoice(choice))

                    this.choices.push(choiceText)
                    this.add(choiceText)
                })
                this.align()
            } else {
                // If there are no choices, wait a moment and then close the screen
                this.scene.time.delayedCall(2000, () => {
                    this.isResolved = true
                    this.runCloseAnimation()
                    this.markEncounterAsResolved()
                })
            }
        })

        this.align()
    }

    private handleChoice(choice: IChoice) {
        // Disable all choices while processing
        this.choices.forEach((choiceText) => choiceText.disableInteractive())

        // Show choice dialogue if it exists
        if (choice.npc_dialogues) {
            const choiceDialogues: IDialogue[] = []
            Object.entries(choice.npc_dialogues).forEach(([speaker, text]) => {
                choiceDialogues.push({ speaker, text })
            })

            this.dialogueContainer.setDialogues(choiceDialogues, () => {
                // After choice dialogue, try to move to next scene
                this.moveToNextScene(choice)
            })
        } else {
            // If no choice dialogue, move directly to next scene
            this.moveToNextScene(choice)
        }
    }

    private moveToNextScene(choice: IChoice) {
        if (choice.option_id) {
            const nextScene = this.currentScene.scene_dialogues.find((scene) => {
                const sceneObject = Object.values(scene)[0]
                return sceneObject.id === choice.option_id
            })
            if (nextScene) {
                this.currentSceneIndex = this.currentScene.scene_dialogues.indexOf(nextScene)
                this.updateContent()
            } else {
                // If no next scene, the situation is resolved
                this.isResolved = true
                this.markEncounterAsResolved()
                this.runCloseAnimation()
            }
        } else {
            // If no option_id, the situation is resolved
            this.isResolved = true
            this.markEncounterAsResolved()
            this.runCloseAnimation()
        }
    }

    private markEncounterAsResolved() {
        console.log('DialogueScreen markEncounterAsResolved', this.currentScene)
        const gameScene = this.scene as GameScene
        if (this.currentScene?.scene_id) {
            gameScene.resolvedEncounters.add(this.currentScene.scene_id)
            gameScene.saveGameState()
            this.scene.events.emit('encounterResolved', this.currentScene.scene_id)

            // Reduce time based on the scene's hour_value
            if (this.currentScene.hour_value) {
                gameScene.reduceTime(this.currentScene.hour_value)
            }
        }
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
}

export default DialogueScreen
