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
        this.setDepth(2);
    }
    public addText(x: number, y: number, text: string, style: Phaser.Types.GameObjects.Text.TextStyle) {
        const newText = this.scene.add.text(x, y, text, style);
        this.textList.push(newText);
        this.add(newText);
    }
    public addImage(x: number, y: number, texture: string, frame?: string | number) {
        const newImage = this.scene.add.image(x, y, texture, frame);
        this.imageList.push(newImage);
        this.add(newImage);
    }
    public addButton(button: Button) {
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
