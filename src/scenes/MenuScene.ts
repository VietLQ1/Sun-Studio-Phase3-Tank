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
    if(this.sound.locked)
    {
        this.sound.once('unlocked', () => {
          this.sound.play('menuBGM', { loop: true, volume: 0.3});
        });
    }
    else
    {
      this.sound.play('menuBGM', { loop: true, volume: 0.3});
    }
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
    
    // this.bitmapTexts.push(
    //   this.add.bitmapText(
    //     this.sys.canvas.width / 2 - 120,
    //     this.sys.canvas.height / 2,
    //     'font',
    //     'PRESS S TO PLAY',
    //     30
    //   )
    // );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 ,
        this.sys.canvas.height / 2 - 100,
        'font',
        'TANK?',
        100
      ).setTint(0xff0000).setOrigin(0.5)
    );
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
