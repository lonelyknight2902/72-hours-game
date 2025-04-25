import { getCharactersArray } from '../../../constants/characters'
import { GameScene } from '../GameScene'
import MapContainer from './MapContainer'
import SquadList from './SquadList'

class GameContainer extends Phaser.GameObjects.Container {
    public scene: GameScene
    private mapContainer: MapContainer
    private squadList: SquadList

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y)

        this.scene = scene

        this.setSize(1024, 576)

        this.createMapContainer()
        this.createSquadList()

        this.align()
    }

    private createMapContainer() {
        this.mapContainer = new MapContainer(this.scene, 1024 / 2 - 100, 576 / 2)
        this.add(this.mapContainer)
    }

    private align() {
        // Phaser.Display.Align.In.RightCenter(this.squadList, this)
        // Phaser.Display.Align.In.Center(this.mapContainer, this)

        console.log(this.squadList.getWorldPoint())
        console.log(this.mapContainer.getWorldPoint())
    }

    private createSquadList() {
        this.squadList = new SquadList(this.scene, 1024 - 100, 0)
        this.add(this.squadList)

        getCharactersArray().forEach((character) => {
            console.log(character)
            this.squadList.addSquadCard(character)
        })

        this.squadList.setDepth(2000)
    }

    public runEarthQuakeAnimation() {
        this.mapContainer.runEarthQuakeAnimation()
    }
}

export default GameContainer
