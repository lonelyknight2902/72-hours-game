import SquadCard from './SquadCard'

class SquadList extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle
    private squadCards: SquadCard[]
    private scrollContainer: Phaser.GameObjects.Container
    private scrollHeight: number
    private isDragging: boolean
    private dragStartY: number
    private dragStartScrollY: number

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.setSize(200, 576)
        this.scrollHeight = 576
        this.isDragging = false

        this.createBackground()
        this.createScrollContainer()
        this.createInput()

        this.squadCards = []
    }

    private createBackground() {
        this.background = this.scene.add.rectangle(0, 576 / 2, this.width, this.height, 0xffffff)
        this.background.setInteractive()
        this.add(this.background)
    }

    private createScrollContainer() {
        this.scrollContainer = this.scene.add.container(0, 0)
        this.add(this.scrollContainer)
    }

    private createInput() {
        this.background.on('pointerdown', this.startDrag)
        this.background.on('pointermove', this.drag)
        this.background.on('pointerup', this.stopDrag)
        this.background.on('pointerout', this.stopDrag)
    }

    private startDrag = (pointer: Phaser.Input.Pointer) => {
        console.log('startDrag')
        this.isDragging = true
        this.dragStartY = pointer.y
        this.dragStartScrollY = this.scrollContainer.y
    }

    private drag = (pointer: Phaser.Input.Pointer) => {
        console.log('drag')
        if (!this.isDragging) return

        const deltaY = pointer.y - this.dragStartY
        const newY = this.dragStartScrollY + deltaY

        // Calculate the maximum scroll position
        const maxScroll = Math.max(0, this.squadCards.length * 100 - this.scrollHeight)
        const clampedY = Phaser.Math.Clamp(newY, -maxScroll, 0)

        this.scrollContainer.setY(clampedY)
    }

    private stopDrag = () => {
        console.log('stopDrag')
        this.isDragging = false
    }

    private align() {
        for (let i = 0; i < this.squadCards.length; i++) {
            this.squadCards[i].setPosition(0, i * 64 + 32)
        }
    }

    public addSquadCard(character: ICharacter) {
        const squadCard = new SquadCard(this.scene, 0, 0, character)
        this.squadCards.push(squadCard)
        this.scrollContainer.add(squadCard)
        this.align()
    }
}

export default SquadList
