import { Button } from "./Button";

export class HomeButton extends Button {
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
        let miniMap = this.scene.cameras.getCamera('miniMap');
        const fx = this.scene.cameras.main.postFX.addWipe(0.3, 1, 1);
        this.scene.scene.transition({
            target: 'MenuScene',
            duration: 500,
            moveBelow: true,
            onUpdate: (progress: number) => {
                fx.progress = progress;
                miniMap!.setSize(miniMap?.width! * (1 - progress), miniMap?.height! * (1 - progress));
            },
        });
    }
}