import { IImageConstructor } from "../interfaces/image.interface";
import { Button } from "./Button";

export class HomeButton extends Button {
    constructor(aParams: IImageConstructor, overTexture: string) {
        super(aParams);
        this.overTexture = overTexture;
    }
    protected onDown() {
        super.onDown();
        const fx = this.scene.cameras.main.postFX.addWipe(0.3, 1, 1);
        this.scene.scene.transition({
            target: 'MenuScene',
            duration: 500,
            moveBelow: true,
            onUpdate: (progress: number) => {
                fx.progress = progress;
            }
        });
    }
}