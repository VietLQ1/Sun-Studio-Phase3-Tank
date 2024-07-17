import { Button } from "./Button";

export class UIContainer extends Phaser.GameObjects.Container {
    private textList: Phaser.GameObjects.Text[] = [];
    private imageList: Phaser.GameObjects.Image[] = [];
    private buttonList: Button[] = [];
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.initContainer();
        this.scene.add.existing(this);
    }
    private initContainer() {
        // this.displayOriginX
        this.setDepth(3);
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
