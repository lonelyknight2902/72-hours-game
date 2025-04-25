class MenuContainer extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Rectangle
    title: Phaser.GameObjects.Image
    touchToContinueText: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene) {
        super(scene)

        this.setSize(1024, 576)
        this.create()
        this.align()
        this.runTouchToContinueAnimation()
    }

    create() {
        this.createBackground()
        this.createTitle()
        this.createTouchToContinueText()
        this.createInput()
    }

    private align() {
        Phaser.Display.Align.In.Center(this.title, this, 0, 0)
        Phaser.Display.Align.In.BottomCenter(this.touchToContinueText, this, 0, -40)
    }

    private createInput() {
        this.scene.input.on('pointerdown', () => {
            // this.scene.scene.start('Game')
            this.runCloseAnimation().then(() => {
                this.scene.scene.start('Game')
            })
        })
    }

    private createBackground() {
        this.background = this.scene.add.rectangle(0, 0, this.width, this.height, 0x000000, 1)
        this.background.setOrigin(0.5)
        this.background.setAlpha(1)

        this.add(this.background)
    }

    private createTitle() {
        this.title = this.scene.add.image(0, 0, 'title')
        this.title.setOrigin(0.5)
        this.title.setAlpha(1)
        this.title.setSize(1024 / 2, 244 / 2)
        this.title.setDisplaySize(1024 / 2, 244 / 2)

        this.add(this.title)
    }

    private createTouchToContinueText() {
        this.touchToContinueText = this.scene.add
            .text(0, 40, 'Touch anywhere to start saving lives', {
                fontFamily: 'VT323',
                fontSize: 20,
                color: '#ffffff',
                align: 'center',
                resolution: 2,
            })
            .setOrigin(0.5)
        this.touchToContinueText.setAlpha(1)

        this.add(this.touchToContinueText)
    }

    private runTouchToContinueAnimation() {
        this.touchToContinueText.setAlpha(0)
        this.touchToContinueText.setVisible(true)

        this.scene.tweens.add({
            targets: this.touchToContinueText,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: -1,
        })
    }

    private async runCloseAnimation() {
        return new Promise<void>((resolve) => {
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    resolve()
                },
            })
        })
    }
}

export default MenuContainer
