import { IImageConstructor } from "../interfaces/image.interface";

export class Button extends Phaser.GameObjects.Image
{
    protected defaultTexture: string;
    protected overTexture: string;
    constructor(aParams: IImageConstructor)
    {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
        this.defaultTexture = aParams.texture;
        this.overTexture = aParams.texture;
        this.initImage();
        this.initInput();
        this.scene.add.existing(this);
    }

    protected initImage(): void
    {
        this.setOrigin(0.5, 0.5);
        this.setInteractive();
        this.setDepth(1);
    }

    protected initInput(): void
    {
        this.on('pointerover', this.onOver, this);
        this.on('pointerout', this.onOut, this);
        this.on('pointerdown', this.onDown, this);
    }
    protected onOver(): void
    {
        this.setTexture(this.overTexture);
    }
    protected onOut(): void
    {
        this.setTexture(this.defaultTexture);
    }
    protected onDown(): void
    {
        this.setTexture(this.defaultTexture);
        this.scene.sound.play('button');
    }
}