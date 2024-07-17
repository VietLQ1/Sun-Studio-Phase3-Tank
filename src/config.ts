import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { MenuScene } from './scenes/MenuScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Tank',
  version: '0.0.1',
  width: 1600,
  height: 1200,
  zoom: 1,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  backgroundColor: '#000000',
  render: { antialias: true },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH
  }
};
