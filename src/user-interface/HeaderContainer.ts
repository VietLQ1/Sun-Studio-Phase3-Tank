import { GameConfig } from "../config";
import { PauseButton } from "./PauseButton";
import { UIContainer } from "./UIContainer";

export class HeaderContainer extends UIContainer {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.initHeader();
    }
    private initHeader(): void {
        let pauseBtn = new PauseButton(
            {
                scene: this.scene,
                x: 0,
                y: 0,
                texture: 'pauseDefault',
            },
            'pauseHover'
        );
        this.addButton(pauseBtn);
        Phaser.Display.Align.In.TopRight(pauseBtn, this.displayZone, -10, -10);
        // pauseBtn.setDisplaySize(800,800);
    }
}