import { GameScene } from '../GameScene'
import SPRITES from '../../../constants/sprites'
import { getCharacterByRoleId } from '../../../constants/characters'

const { KEY, FRAME } = SPRITES

export interface IDialogue {
    speaker: string
    text: string
}

class DialogueContainer extends Phaser.GameObjects.Container {
    private dialogueBox: Phaser.GameObjects.NineSlice
    private speakerName: Phaser.GameObjects.Text
    private dialogueText: Phaser.GameObjects.Text
    private npcAvatar: Phaser.GameObjects.Image
    private continueButton: Phaser.GameObjects.Text
    private currentDialogueIndex: number = 0
    private dialogueQueue: IDialogue[] = []
    private isAnimating: boolean = false
    private onComplete?: () => void
    private typingTimer?: Phaser.Time.TimerEvent

    constructor(scene: GameScene, x: number, y: number, width: number, height: number) {
        super(scene, x, y)
        this.setName('DialogueContainer')

        this.setSize(width, height)

        this.createDialogueBox(width, height)
        this.createContent()
        this.createContinueButton()

        this.add([
            this.dialogueBox,
            this.speakerName,
            this.dialogueText,
            this.npcAvatar,
            this.continueButton,
        ])
    }

    private createDialogueBox(width: number, height: number) {
        this.dialogueBox = this.scene.add
            .nineslice(0, 0, KEY, FRAME.POPUP, width, height, 10, 10, 10, 10)
            .setOrigin(0.5, 1)
            .setAlpha(1)
            .setInteractive()
            .on('pointerdown', () => this.skipTypingAnimation())
    }

    private createContent() {
        // Create speaker name text
        this.speakerName = this.scene.add
            .text(0, 0, '', {
                fontFamily: 'VT323',
                fontSize: 24,
                color: '#0000ff',
                align: 'left',
            })
            .setOrigin(0, 0)

        // Create dialogue text
        this.dialogueText = this.scene.add
            .text(0, 0, '', {
                fontFamily: 'VT323',
                fontSize: 20,
                color: '#000000',
                align: 'left',
                wordWrap: { width: 600 },
            })
            .setOrigin(0, 0)

        // Create NPC avatar placeholder
        this.npcAvatar = this.scene.add
            .image(0, 0, KEY, FRAME.AVATAR.DEFAULT)
            .setOrigin(0, 0)
            .setDisplaySize(100, 100)

        // Position elements
        this.npcAvatar.x = -this.dialogueBox.width / 2 + 20
        this.npcAvatar.y = -this.dialogueBox.height + 20

        this.speakerName.x = -this.dialogueBox.width / 2 + 140
        this.speakerName.y = -this.dialogueBox.height + 20

        this.dialogueText.x = this.speakerName.x
        this.dialogueText.y = this.speakerName.y + 30
    }

    private createContinueButton() {
        this.continueButton = this.scene.add
            .text(0, 0, 'Continue', {
                fontFamily: 'VT323',
                fontSize: 24,
                color: '#0000ff',
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.showNextDialogue())
            .setVisible(false)

        this.continueButton.x = this.dialogueBox.width / 2 - 30
        this.continueButton.y = -20
    }

    public setDialogues(dialogues: IDialogue[], onComplete?: () => void) {
        this.dialogueQueue = dialogues
        this.currentDialogueIndex = 0
        this.onComplete = onComplete
        this.showNextDialogue()
    }

    private showNextDialogue() {
        if (this.isAnimating) return

        if (this.currentDialogueIndex >= this.dialogueQueue.length) {
            this.continueButton.setVisible(false)
            this.onComplete?.()
            return
        }

        this.isAnimating = true
        this.continueButton.setVisible(false)

        const dialogue = this.dialogueQueue[this.currentDialogueIndex]
        console.log('dialogue', dialogue)
        const character = getCharacterByRoleId(dialogue.speaker)
        this.speakerName.setText(character?.name || '')

        // Start typing animation
        const fullText = dialogue.text
        let currentText = ''
        let charIndex = 0

        this.typingTimer = this.scene.time.addEvent({
            delay: 50,
            callback: () => {
                if (charIndex < fullText.length) {
                    currentText += fullText[charIndex]
                    this.dialogueText.setText(currentText)
                    charIndex++
                } else {
                    this.typingTimer?.destroy()
                    this.typingTimer = undefined
                    this.isAnimating = false
                    this.currentDialogueIndex++
                    this.continueButton.setVisible(true)
                }
            },
            loop: true,
        })
    }

    private skipTypingAnimation() {
        if (this.isAnimating && this.typingTimer) {
            this.typingTimer.destroy()
            this.typingTimer = undefined

            // Show the full text immediately
            const dialogue = this.dialogueQueue[this.currentDialogueIndex]
            this.dialogueText.setText(dialogue.text)

            // Update state
            this.isAnimating = false
            this.currentDialogueIndex++
            this.continueButton.setVisible(true)
        }
    }
}

export default DialogueContainer
