class Screen extends Phaser.GameObjects.Container {
    protected backgroundMask: Phaser.GameObjects.Rectangle
    protected screenData: { [key: string]: any }

    constructor(scene: Phaser.Scene) {
        super(scene)

        this.setSize(1024, 576)

        this.backgroundMask = this.scene.add.rectangle(0, 0, this.width, this.height, 0x000000, 0.5)
        this.backgroundMask.setOrigin(0.5)
        this.backgroundMask.setInteractive()

        this.add(this.backgroundMask)

        Phaser.Display.Align.In.Center(this.backgroundMask, this, 0, 0)

        this.setActive(false)
        this.setVisible(false)
        this.backgroundMask.setAlpha(0)
        this.screenData = {}
    }

    public open(data?: any) {
        console.log('Opening screen', data)
        this.backgroundMask.setAlpha(1)
        this.setActive(true)
        this.setVisible(true)
        console.log('Screen data:', data)
        if (data) {
            this.screenData = data
        } else {
            this.screenData = {}
        }
    }

    public close() {
        console.log('Closing screen')
        this.backgroundMask.setAlpha(0)
        this.setActive(false)
        this.setVisible(false)
    }
}

export default Screen
