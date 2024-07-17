import { GameScene } from "../scenes/GameScene";
import { Button } from "./Button";

export class PauseButton extends Button {
    constructor(aParams: TankGame.IImageConstructor, overTexture: string) {
        super(aParams);
        this.overTexture = overTexture;
    }
    onUp() {
        super.onUp();
        if (!this.downed)
        {
            return;
        }
        this.downed = false;
        if (this.scene instanceof GameScene)
        {
            this.scene.pauseGame();
        }
    }
}