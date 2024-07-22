
export class Button extends Phaser.GameObjects.Container
{
    protected button: Phaser.GameObjects.Image;
    protected hitArea: Phaser.GameObjects.Zone;
    protected defaultTexture: string;
    protected overTexture: string;
    protected downed: boolean;
    constructor(aParams: TankGame.IImageConstructor)
    {
        super(aParams.scene, aParams.x, aParams.y);
        this.button = new Phaser.GameObjects.Image(aParams.scene, aParams.x, aParams.y, aParams.texture);
        this.add(this.button);
        this.hitArea = new Phaser.GameObjects.Zone(aParams.scene, aParams.x, aParams.y, this.button.width, this.button.height).setInteractive().setScrollFactor(0);
        this.add(this.hitArea);
        this.defaultTexture = aParams.texture;
        this.overTexture = aParams.texture;
        this.initImage();
        this.initInput();
        this.scene.add.existing(this);
        this.downed = false;
    }

    protected initImage(): void
    {
        this.setSize(this.button.width, this.button.height);
        // console.log(this.x, this.y);
        // this.setOrigin(0.5, 0.5);
        // this.setInteractive();
        // this.input!.hitArea.setSize(this.button.width, this.button.height);
        this.setDepth(1);
    }

    protected initInput(): void
    {
        this.hitArea.on(Phaser.Input.Events.POINTER_OVER, this.onOver, this);
        this.hitArea.on(Phaser.Input.Events.POINTER_OUT, this.onOut, this);
        this.hitArea.on(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
        this.hitArea.on(Phaser.Input.Events.POINTER_UP, this.onUp, this);
    }
    protected onOver(): void
    {
        this.button.setTexture(this.overTexture);
    }
    protected onOut(): void
    {
        this.downed = false;
        this.button.setAlpha(1);
        this.button.setTexture(this.defaultTexture);
    }
    protected onDown(): void
    {
        // this.setTexture(this.defaultTexture);
        this.button.setAlpha(0.75);
        this.scene.sound.play('button');
        this.downed = true;
    }
    protected onUp(): void
    {
        this.button.setTexture(this.defaultTexture);
        this.button.setAlpha(1);
    }
}