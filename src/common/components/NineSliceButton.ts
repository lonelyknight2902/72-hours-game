export interface NineSliceButtonConfig {
    texture: string;
    frame?: string | number;
    width?: number;
    height?: number;
    leftWidth?: number;
    rightWidth?: number;
    topHeight?: number;
    bottomHeight?: number;
}

class NineSliceButton extends Phaser.GameObjects.Container {
    private background : Phaser.GameObjects.NineSlice;
    private hitArea: Phaser.GameObjects.Zone

    private upAnimation: Phaser.Tweens.Tween;
    private downAnimation: Phaser.Tweens.Tween;
    
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config: NineSliceButtonConfig
    ) {
        super(scene, x, y);

        this.createBackground(config)
        this.setSize(config.width || 0, config.height || 0);


        // this.hitArea = this.scene.add.rectangle(0, 0, config.width || 0, config.height || 0);
        this.hitArea = this.scene.make.zone({
            x: 0,
            y: 0,
            width: config.width || 0,
            height: config.height || 0,
        });

        console.log(this.hitArea, this.background);

        this.add(this.hitArea);

            this.hitArea.setInteractive({
                useHandCursor: true,
            })


    }

    public onClick(callback: Function) {
        this.hitArea.off(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.handlePointerDown)
        this.hitArea.off(Phaser.Input.Events.GAMEOBJECT_POINTER_UP)
        this.hitArea.off(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.handlePointerOut)

        this.hitArea.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.handlePointerDown)
        this.hitArea.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleOnClick(callback))
        this.hitArea.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.handlePointerOut)
    }

    private handlePointerDown = () => {
        this.runDownAnimation();
    }

    private handleOnClick = (callback: Function) => () => {
        this.runUpAnimation();
        callback();
    }

    private handlePointerOut = () => {
        this.runUpAnimation();
    }

    private runDownAnimation() {
        if(this.downAnimation) {
            this.downAnimation.stop();
        }

        this.downAnimation = this.scene.tweens.add({
            targets: this,
            scaleX: 0.95,
            scaleY: 0.95,
            duration: 100,
            ease: 'Power2',
            yoyo: true,
            repeat: 0,
        });
    }

    private runUpAnimation() {
        if(this.upAnimation) {
            this.upAnimation.stop();
        }

        this.upAnimation = this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            scaleY: 1,
            duration: 100,
            ease: 'Power2',
            yoyo: false,
            repeat: 0,
        });

        this.upAnimation.once(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
            this.setScale(1, 1);
        })
    }

    private createBackground(config: NineSliceButtonConfig) {
        const { texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight } = config;

        this.background = this.scene.make.nineslice(
           {
                x: 0,
                y: 0,
                key: texture,
                frame: frame,
                width: width || 0,
                height: height || 0,
                leftWidth: leftWidth || 0,
                rightWidth: rightWidth || 0,
                topHeight: topHeight || 0,
                bottomHeight: bottomHeight || 0,
            },
        );

        this.add(this.background);

        // const { displayWidth, displayHeight } = this.background

        // this.hitArea = this.scene.make.zone({
        //     width: displayWidth,
        //     height: displayHeight,
        // })
    }
}

export default NineSliceButton;