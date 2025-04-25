import { GameScene } from '../GameScene'
import SPRITES from '../../../constants/sprites'
import Screen from '../../../common/components/Screen'
const { KEY, FRAME } = SPRITES

class ClockScreen extends Screen {
    public scene: GameScene
    private clockBackground: Phaser.GameObjects.Image
    private timeText: Phaser.GameObjects.Text
    private totalHours: number = 72
    private currentHours: number = 72

    constructor(scene: GameScene) {
        super(scene)
        this.scene = scene
        this.setName('Clock')

        this.create()
    }

    public open() {
        super.open()
        this.setAlpha(0)
        this.runOpenAnimation()
    }

    private create() {
        // Create clock background

        // Create time text
        this.timeText = this.scene.add
            .text(0, 0, this.formatTime(), {
                fontFamily: 'VT323',
                fontSize: 56,
                color: '#ffffff',
                align: 'center',
            })
            .setOrigin(0.5)

        this.add(this.timeText)
    }

    private formatTime(): string {
        return `${this.currentHours}h`
    }

    public reduceTime(hours: number) {
        const newHours = Math.max(0, this.currentHours - hours)
        const oldHours = this.currentHours
        this.currentHours = newHours

        // Scale up animation
        this.scene.tweens.add({
            targets: this.timeText,
            scale: 1.5,
            y: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Time reduction animation
                this.scene.tweens.addCounter({
                    from: oldHours,
                    to: newHours,
                    duration: 500,
                    onUpdate: (tween) => {
                        const value = Math.floor(tween.getValue())
                        this.timeText.setText(`${value}h`)
                    },
                    onComplete: () => {
                        // Scale down animation
                        this.scene.tweens.add({
                            targets: this.timeText,
                            scale: 1,
                            duration: 500,
                            ease: 'Power2',
                        })

                        this.scene.tweens.add({
                            duration: 500,
                            targets: this.timeText,
                            y: -this.height / 2 + this.timeText.height,
                            ease: Phaser.Math.Easing.Sine.Out,
                        })
                    },
                })
            },
        })
    }

    private runOpenAnimation() {
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 500,
        })

        this.scene.tweens.addCounter({
            from: 0,
            to: 72,
            duration: 2000,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: (tween) => {
                this.timeText.setText(`${tween.getValue().toFixed(0)}h`)
            },
            onComplete: () => {
                this.scene.tweens.add({
                    duration: 500,
                    targets: this.backgroundMask,
                    alpha: 0,
                })

                this.scene.tweens.add({
                    duration: 500,
                    targets: this.timeText,
                    y: -this.height / 2 + this.timeText.height,
                    ease: Phaser.Math.Easing.Sine.Out,
                })
            },
        })
    }
}

export default ClockScreen
