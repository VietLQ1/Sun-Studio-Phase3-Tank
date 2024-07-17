import { IImageConstructor } from "../interfaces/image.interface";
import { Button } from "./Button";

export class SoundButton extends Button {
    constructor(aParams: IImageConstructor) {
        super(aParams);
        this.defaultTexture = "soundOnDefault";
        this.overTexture = "soundOnHover";
        this.setTexture(this.defaultTexture);
    }
    onUp() {
        super.onUp();
        if (!this.downed)
        {
            return;
        }
        this.downed = false;
        this.scene.sound.setMute(!this.scene.sound.mute);
        if (!this.scene.sound.mute)
        {
            this.defaultTexture = "soundOffDefault";
            this.setTexture("soundOffDefault");
            this.overTexture = "soundOffHover";
        }
        else
        {
            this.defaultTexture = "soundOnDefault";
            this.setTexture("soundOnDefault");
            this.overTexture = "soundOnHover";
        }
    }
}