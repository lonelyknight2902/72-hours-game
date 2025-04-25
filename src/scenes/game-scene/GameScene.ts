import { Scene } from 'phaser'
import IntroScreen from './screens/IntroScreen'
import { sleep } from '../../utils/utils'
import SOUNDS from '../../constants/sounds'
import EncounterScreen from './screens/encounter-screen/EncounterScreen'
import ScreenManager from '../../managers/ScreenManager'
import GameContainer from './components/GameContainer'
import DialogueScreen from './screens/DialogueScreen'
import ClockScreen from './components/Clock'

export class GameScene extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    msg_text: Phaser.GameObjects.Text
    popup: Phaser.GameObjects.NineSlice
    private introScreen: IntroScreen
    private encounterScreen: EncounterScreen
    public screenManager: ScreenManager
    private gameContainer: GameContainer
    private dialogueScreen: DialogueScreen
    public resolvedEncounters: Set<string> = new Set()
    private clock: ClockScreen

    constructor() {
        super('Game')
    }

    create() {
        this.camera = this.cameras.main
        // this.camera.setPosition(0, 0);
        this.camera.setBackgroundColor(0x000000)
        // this.popup = this.add.nineslice(0, 0, KEY, FRAME.POPUP, 48, 48, 5, 5, 5, 5)

        // this.popup.setSize(0, 0)
        // this.popup.setOrigin(0.5)
        // this.popup.setAlpha(1)

        // this.popup.state = 'close'

        // this.input.on('pointerdown', () => {
        //     console.log('Pointer down event triggered!')
        //     const targetSize = {
        //         width: 100,
        //         height: 200,
        //     }
        //     const pointer = this.input.activePointer
        //     const x = pointer.x - this.popup.width / 2
        //     const y = pointer.y - this.popup.height / 2
        //     if (this.popup.state === 'close') {
        //         this.popup.setPosition(x, y)
        //     }
        //     this.runPopupAnimation()
        // })
        this.createManager()
        this.createGameContainer()
        this.createScreens()
        this.createClock()
        this.loadGameState()

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log('Pointer position:', pointer.x, pointer.y)
        })

        this.screenManager.openScreen('clock')

        // this.mapContainer.setInteractive()
        // this.mapContainer.on('pointerdown', () => {
        //     this.screenManager.openScreen('encounter')
        // })
        // this.screenManager.openScreen('intro')
    }

    private createManager() {
        this.screenManager = new ScreenManager(this)
    }

    private createScreens() {
        this.createIntroScreen()
        this.createEncounterScreen()
        this.createDialogueScreen()
    }

    private createIntroScreen() {
        this.introScreen = new IntroScreen(this)
        this.add.existing(this.introScreen)
        this.screenManager.addScreen('intro', this.introScreen)
    }

    private createEncounterScreen() {
        this.encounterScreen = new EncounterScreen(this)
        this.add.existing(this.encounterScreen)
        this.screenManager.addScreen('encounter', this.encounterScreen)
    }

    private createDialogueScreen() {
        this.dialogueScreen = new DialogueScreen(this)
        this.add.existing(this.dialogueScreen)
        this.screenManager.addScreen('dialogue', this.dialogueScreen)
    }

    private createGameContainer() {
        this.gameContainer = new GameContainer(this, 0, 0)
        this.add.existing(this.gameContainer)
    }

    private createClock() {
        this.clock = new ClockScreen(this)
        this.add.existing(this.clock)
        this.screenManager.addScreen('clock', this.clock)
    }

    public async runStartAnimation() {
        const earthquake = this.sound.add(SOUNDS.EARTHQUAKE.KEY)
        const warning = this.sound.add(SOUNDS.WARNING.KEY)
        earthquake.play()
        warning.play()
        // this.sound.add(SOUNDS.WARNING.KEY)
        // this.sound.play(SOUNDS.EARTHQUAKE.KEY)
        // this.sound.play(SOUNDS.WARNING.KEY)
        this.camera.shake(5000, 0.01, false)
        await sleep(5000)
        this.gameContainer.runEarthQuakeAnimation()
    }

    private runPopupAnimation() {
        if (this.popup.state === 'open') {
            this.tweens.add({
                targets: this.popup,
                width: 100,
                height: 400,
                alpha: 1,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    this.popup.state = 'close'
                },
            })
        } else {
            this.tweens.add({
                targets: this.popup,
                width: 0,
                height: 0,
                alpha: 0,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    this.popup.state = 'open'
                },
            })
        }
    }

    public openDialogue(scene: any) {
        this.screenManager.openScreen('dialogue', { scene })
    }

    private loadGameState() {
        const savedState = localStorage.getItem('gameState')
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState)
                if (parsedState.resolvedEncounters) {
                    this.resolvedEncounters = new Set(parsedState.resolvedEncounters)
                }
                console.log('resolvedEncounters', this.resolvedEncounters)
            } catch (error) {
                console.error('Failed to load game state:', error)
            }
        }
    }

    public saveGameState() {
        const gameState = {
            resolvedEncounters: Array.from(this.resolvedEncounters),
        }
        try {
            localStorage.setItem('gameState', JSON.stringify(gameState))
        } catch (error) {
            console.error('Failed to save game state:', error)
        }
    }

    public reduceTime(hours: number) {
        this.clock.reduceTime(hours)
    }
}
