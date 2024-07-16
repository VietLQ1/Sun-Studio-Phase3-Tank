import { IImageConstructor } from "../interfaces/image.interface";
import { Button } from "./Button";

export class PlayButton extends Button {
    constructor(aParams: IImageConstructor, overTexture: string) {
        super(aParams);
        this.overTexture = overTexture;
    }
    protected onDown() {
        this.scene.scene.start('GameScene');
    }
    protected onOver() {
        this.setTexture(this.overTexture);
    }
    protected onOut() {
        this.setTexture(this.defaultTexture);
    }
}