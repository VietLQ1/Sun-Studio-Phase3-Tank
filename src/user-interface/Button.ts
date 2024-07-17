
export class Button extends Phaser.GameObjects.Image
{
    protected defaultTexture: string;
    protected overTexture: string;
    protected downed: boolean;
    constructor(aParams: TankGame.IImageConstructor)
    {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
        this.defaultTexture = aParams.texture;
        this.overTexture = aParams.texture;
        this.initImage();
        this.initInput();
        this.scene.add.existing(this);
        this.downed = false;
    }

    protected initImage(): void
    {
        this.setOrigin(0.5, 0.5);
        this.setInteractive();
        this.setDepth(1);
    }

    protected initInput(): void
    {
        this.on(Phaser.Input.Events.POINTER_OVER, this.onOver, this);
        this.on(Phaser.Input.Events.POINTER_OUT, this.onOut, this);
        this.on(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
        this.on(Phaser.Input.Events.POINTER_UP, this.onUp, this);
    }
    protected onOver(): void
    {
        this.setTexture(this.overTexture);
    }
    protected onOut(): void
    {
        this.downed = false;
        this.setAlpha(1);
        this.setTexture(this.defaultTexture);
    }
    protected onDown(): void
    {
        // this.setTexture(this.defaultTexture);
        this.setAlpha(0.75);
        this.scene.sound.play('button');
        this.downed = true;
    }
    protected onUp(): void
    {
        this.setTexture(this.defaultTexture);
        this.setAlpha(1);
    }
}