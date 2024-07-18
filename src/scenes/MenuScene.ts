import { GameConfig } from "../config";
import { PlayButton } from "../user-interface/PlayButton";
import { UIContainer } from "../user-interface/UIContainer";

export class MenuScene extends Phaser.Scene {
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  private UIContainer: UIContainer;
  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  init(): void {
    
    this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(GameConfig.width as number, GameConfig.height as number);
    this.sound.stopAll();
    this.sound.play('menuBGM', { loop: true, volume: 0.3});
  }

  create(): void {
    this.UIContainer = new UIContainer(this, 0, 0);
    let playBtn = new PlayButton({
      scene: this,
      x: 0,
      y: 0,
      texture: 'playTextDefault',
    }, 'playTextHover');
    this.UIContainer.addButton(playBtn);
    Phaser.Display.Align.In.Center(playBtn, this.UIContainer.DisplayZone, 0, 100);
    
    let banner = this.UIContainer.addImage(0, 0, 'banner').setOrigin(0.5, 0.5);
    Phaser.Display.Align.In.Center(banner, this.UIContainer.DisplayZone, 0, -150);
    this.UIContainer.setY(GameConfig.height as number + this.UIContainer.height);
    this.UIContainer.disableInteractive();
    this.tweens.add({
      targets: this.UIContainer,
      y: 0,
      duration: 1000,
      ease: 'Power3',
    }).on('complete', () => {
      this.UIContainer.setInteractive();
    });
  }

  update(): void {
  }
}
