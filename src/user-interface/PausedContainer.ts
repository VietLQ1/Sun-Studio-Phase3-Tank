import { GameConfig } from "../config";
import { HomeButton } from "./HomeButton";
import { PlayButton } from "./PlayButton";
import { ResumeButton } from "./ResumeButton";
import { SoundButton } from "./SoundButton";
import { UIContainer } from "./UIContainer";

export class PausedContainer extends UIContainer {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.initPaused();
    }
    private initPaused(): void {
        this.displayZone.setSize(GameConfig.width as number / 1.8, GameConfig.height as number / 1.8);
        let img = this.addImage(0, 0, 'board', undefined, GameConfig.width as number / 1.8, GameConfig.height as number / 1.8).setOrigin(0.5, 0.5);
        Phaser.Display.Align.In.Center(img, this.displayZone);
        let txt = this.addText(
            0,
            0,
            'PAUSED',
            {
                fontSize: '60px',
                color: '#fff',
                fontStyle: 'bold',
            }
        ).setOrigin(0.5, 0.5);
        Phaser.Display.Align.In.TopCenter(txt, this.displayZone, 0, -50);
        let resumeBtn = new ResumeButton(
            {
                scene: this.scene,
                x: 0,
                y: 0,
                texture: 'resumeDefault',
            }, 'resumeHover');
        this.addButton(resumeBtn);
        Phaser.Display.Align.In.Center(resumeBtn, this.displayZone);
        let replayBtn = new PlayButton(
            {
                scene: this.scene,
                x: 0,
                y: 0,
                texture: 'restartDefault',
            }, 'restartHover');
        this.addButton(replayBtn);
        Phaser.Display.Align.In.Center(replayBtn, this.displayZone, 200, 0);
        let homeBtn = new HomeButton(
            {
                scene: this.scene,
                x: 0,
                y: 0,
                texture: 'homeDefault',
            },
            'homeHover'
        );
        this.addButton(homeBtn);
        Phaser.Display.Align.In.Center(homeBtn, this.displayZone, -200, 0);
        let soundBtn = new SoundButton(
            {
                scene: this.scene,
                x: 0,
                y: 0,
                texture: 'soundOnDefault',
            });
        this.addButton(soundBtn);
        Phaser.Display.Align.In.BottomCenter(soundBtn, this.displayZone, 0, -30);
    }
}