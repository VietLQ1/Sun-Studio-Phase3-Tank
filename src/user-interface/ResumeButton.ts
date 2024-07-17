import { IImageConstructor } from "../interfaces/image.interface";
import { GameScene } from "../scenes/game-scene";
import { Button } from "./Button";

export class ResumeButton extends Button {
    constructor(aParams: IImageConstructor, overTexture: string) {
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
        if (this.scene instanceof GameScene)
        {
            this.scene.resumeGame();
        }
    }
}