import { Boot } from '../scenes/Boot';
import { GameScene } from '../scenes/game-scene/GameScene';
import { GameOver } from '../scenes/GameOver';
import { MainMenu } from '../scenes/main-menu/MainMenu';
import { Preloader } from '../scenes/Preloader';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        GameScene,
        GameOver
    ]
}

export default config;