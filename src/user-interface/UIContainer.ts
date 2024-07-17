import { GameConfig } from "../config";
import { Button } from "./Button";

export class UIContainer extends Phaser.GameObjects.Container {
    protected displayZone: Phaser.GameObjects.Zone;
    protected textList: Phaser.GameObjects.Text[] = [];
    protected imageList: Phaser.GameObjects.Image[] = [];
    protected buttonList: Button[] = [];
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.initContainer();
        this.scene.add.existing(this);
    }
    private initContainer() {
        // this.displayOriginX
        this.setDepth(3);
        this.displayZone = this.scene.add.zone(GameConfig.width as number / 2, GameConfig.height as number / 2, GameConfig.width as number, GameConfig.height as number).setScrollFactor(0);
        // this.setScrollFactor(0);
    }
    public addText(x: number, y: number, text: string, style: Phaser.Types.GameObjects.Text.TextStyle) : Phaser.GameObjects.Text {
        const newText = this.scene.add.text(x, y, text, style).setOrigin(0, 0).setScrollFactor(0);
        this.textList.push(newText);
        this.add(newText);
        return newText;
    }
    public addImage(x: number, y: number, texture: string, frame?: string | number, width?: number, height?: number): Phaser.GameObjects.Image {
        const newImage = this.scene.add.image(x, y, texture, frame).setOrigin(0, 0).setScrollFactor(0);
        this.imageList.push(newImage);
        this.add(newImage);
        if (width && height) {
            newImage.displayWidth = width;
            newImage.displayHeight = height;
        }
        return newImage;
    }
    public addButton(button: Button): void {
        button.setScrollFactor(0);
        // console.log(button.scrollFactorX, button.scrollFactorY);
        this.buttonList.push(button);
        this.add(button);
    }
    public disableInteractive(): this {
        this.buttonList.forEach((button) => {
            button.disableInteractive();
        });
        return this;
    }
    public setInteractive(): this {
        this.buttonList.forEach((button) => {
            button.setInteractive();
        });
        return this;
    }
}
