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
  }

  create(): void {
    const displayZone = this.add.zone(0, 0, GameConfig.width as number, GameConfig.height as number);
    this.UIContainer = new UIContainer(this, 0, 0);
    Phaser.Display.Align.In.Center(this.UIContainer, displayZone);
    this.UIContainer.addButton(new PlayButton({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2 + 100,
      texture: 'playTextDefault',
    }, 'playTextHover'));
    
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
        this.sys.canvas.width / 2 - 120,
        this.sys.canvas.height / 2 - 100,
        'font',
        'TANK',
        100
      ).setTint(0xff0000)
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
