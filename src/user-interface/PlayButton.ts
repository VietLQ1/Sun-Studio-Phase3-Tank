import { Button } from "./Button";

export class PlayButton extends Button {
    constructor(aParams: TankGame.IImageConstructor, overTexture: string) {
        super(aParams);
        this.overTexture = overTexture;
    }
    protected onUp() {
        super.onUp();
        if (!this.downed)
        {
            return;
        }
        this.downed = false;
        if (this.scene.scene.isActive('GameScene')) {
            this.scene.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.scene.restart();
                this.scene.data.reset();
            });
            this.scene.cameras.main.fadeOut(500);
        }
        this.scene.sound.stopAll();
        const fx = this.scene.cameras.main.postFX.addWipe();
        this.scene.scene.transition({
            target: 'GameScene',
            duration: 500,
            moveBelow: true,
            onUpdate: (progress: number) => {
                fx.progress = progress;
            }
        });
    }
}