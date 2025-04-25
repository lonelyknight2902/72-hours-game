import config from './configs/gameConfig';
import { Boot } from './scenes/Boot';
import { GameScene } from './scenes/game-scene/GameScene';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/main-menu/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

export default new Game(config);
