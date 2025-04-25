import Screen from '../common/components/Screen'

class ScreenManager {
    private scene: Phaser.Scene
    private screens: Map<string, Screen>
    private screenContainer: Phaser.GameObjects.Container

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.screenContainer = this.scene.add.container()
        this.screenContainer.setDepth(1000)
        this.screenContainer.setSize(1024, 576)
        this.screenContainer.setPosition(512, 288)
        this.screens = new Map()
    }

    public addScreen(key: string, screen: Screen) {
        this.screens.set(key, screen)
        this.screenContainer.add(screen)
    }

    public getScreen(key: string) {
        return this.screens.get(key)
    }

    public removeScreen(key: string) {
        this.screens.delete(key)
    }

    public clearScreens() {
        this.screens.clear()
    }

    public openScreen(key: string, data?: any) {
        const screen = this.getScreen(key)
        console.log('Screen', screen, this.screens, data)
        if (screen) {
            console.log('Bringing to top', screen)
            this.screenContainer.bringToTop(screen)
            console.log('Opening screen', data)
            screen.open(data)
        }
    }

    public closeScreen(key: string) {
        const screen = this.getScreen(key)
        if (screen) {
            screen.close()
        }
    }
}

export default ScreenManager
