import IMAGES from '../../../constants/images'
import LEVELS, { getLevelsArray } from '../../../constants/levels'
import MapEncounterPoint from './MapEncounterPoint'
import { GameScene } from '../GameScene'
const { MAP_DISASTER, MAP_PEACE } = IMAGES
const { KEY: PEACE_KEY } = MAP_PEACE
const { KEY: DISASTER_KEY } = MAP_DISASTER

class MapContainer extends Phaser.GameObjects.Container {
    public scene: GameScene
    private map: Phaser.GameObjects.Image
    private whiteFlash: Phaser.GameObjects.Rectangle

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y)

        this.scene = scene

        this.setSize(1024, 576)
        this.create()
    }

    private create() {
        this.createMap()
        this.createWhiteFlash()
        this.createEncounterPoints()
    }

    private createMap() {
        this.map = this.scene.add.image(0, 0, PEACE_KEY)
        this.map.setOrigin(0.5)
        this.map.setAlpha(1)
        this.map.setSize(this.width, this.height)
        this.map.setDisplaySize(this.width, this.height)

        this.add(this.map)
    }

    private createWhiteFlash() {
        this.whiteFlash = this.scene.add.rectangle(0, 0, this.width, this.height, 0xffffff)
        this.whiteFlash.setOrigin(0.5)
        this.whiteFlash.setAlpha(0)

        this.add(this.whiteFlash)
    }

    private createEncounterPoints() {
        const encounters = getLevelsArray().map((level) => {
            return new MapEncounterPoint(
                this.scene,
                level.KEY,
                level.COORDINATES.X,
                level.COORDINATES.Y
            )
        })
        this.add(encounters)
    }

    public async runEarthQuakeAnimation() {
        this.whiteFlash.setAlpha(1)
        const disaster = this.scene.textures.get(DISASTER_KEY)
        if (disaster) {
            this.map.setTexture(DISASTER_KEY)
        }
        this.scene.tweens.add({
            targets: this.whiteFlash,
            alpha: 0,
            duration: 5000,
            ease: 'Power2',
        })
    }
}

export default MapContainer
