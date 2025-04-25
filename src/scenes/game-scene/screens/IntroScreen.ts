// import { sleep } from "../../../utils/utils";

import Screen from '../../../common/components/Screen'
import { GameScene } from '../GameScene'

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const text = [
    ['It takes years to build a city.', 'Brick by brick. Dream by dream.'],
    [
        'But when the earth moves, Mother Nature needs only minutes to tear it all apart.',
        'Towers fall like paper. Streets crack open like wounds.',
        'Life, so carefully built, is shattered without mercy.',
    ],
    [
        'Yet in the rubble, the human spirit rises.',
        '72 hours after the quake, the race against time has begun.',
    ],
    [
        'Hands reach into the dust. Voices call out through the ruins.',
        'Every life saved is a victory. Every heartbeat found is a rebellion against the darkness.',
    ],
    [
        'You are the commander.',
        'Time is running out.',
        'Every decision you make could be the difference between life and death',
    ],
]

class IntroScreen extends Screen {
    public scene: GameScene
    private background: Phaser.GameObjects.Rectangle
    private msgText: Phaser.GameObjects.Text

    constructor(scene: GameScene) {
        super(scene)

        this.scene = scene

        this.setSize(1024, 576)

        this.create()
        this.align()
    }

    public open(data?: any): void {
        super.open(data)
        this.runOpenAnimation()
    }

    public close(): void {
        this.runCloseAnimation()
    }

    private create() {
        this.createBackground()
        this.createText()
    }

    private align() {
        Phaser.Display.Align.In.Center(this.msgText, this, 0, 0)
    }

    private createBackground() {
        this.background = this.scene.add.rectangle(0, 0, this.width, this.height, 0x000000, 1)
        this.background.setOrigin(0.5)
        this.background.setAlpha(1)

        this.add(this.background)
    }

    private createText() {
        this.msgText = this.scene.add
            .text(0, 0, '', {
                fontFamily: 'VT323',
                fontSize: 20,
                color: '#ffffff',
                align: 'center',
            })
            .setOrigin(0.5)

        this.add(this.msgText)
        this.msgText.setPosition(this.width / 2, this.height / 2)
    }

    private async runOpenAnimation() {
        this.msgText.setText('') // Clear the text before starting the animation
        for (const paragraph of text) {
            for (const line of paragraph) {
                this.msgText.text += '\n' // Add a new line after the text is done
                await this.runTextAnimation(line)
                await sleep(0) // Wait for 1 second before the next line
            }
            await sleep(0) // Wait for 2 seconds before the next paragraph
            this.msgText.setText('') // Clear the text for the next paragraph
        }

        this.runCloseAnimation()
    }

    private runCloseAnimation() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.msgText.setText('') // Clear the text when closing
                super.close() // Call the close method from the Screen class
                this.scene.runStartAnimation() // Start the game scene animation
            },
        })
    }

    private async runTextAnimation(text: string) {
        let currentIndex = 0

        return new Promise<void>((resolve) => {
            const typeNextCharacter = () => {
                if (currentIndex < text.length) {
                    this.msgText.text += text[currentIndex]
                    currentIndex++
                    setTimeout(typeNextCharacter, 5) // Adjust the delay as needed
                } else {
                    console.log('Typing done')
                    resolve() // Resolve the promise when typing is done
                }
            }

            typeNextCharacter()
        })
    }

    private async runDeleteAnimation() {
        let currentIndex = this.msgText.text.length

        return new Promise<void>((resolve) => {
            const deleteNextCharacter = () => {
                if (currentIndex > 0) {
                    this.msgText.text = this.msgText.text.slice(0, currentIndex - 1)
                    currentIndex--
                    setTimeout(deleteNextCharacter, 20) // Adjust the delay as needed
                } else {
                    resolve() // Resolve the promise when deletion is done
                }
            }

            deleteNextCharacter()
        })
    }
}

export default IntroScreen
