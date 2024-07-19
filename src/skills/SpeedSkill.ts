import { Player } from "../objects/Player";
import { MiniSkill } from "./MiniSkill";

export class SpeedSkill extends MiniSkill
{
    constructor(player: Player)
    {
        super(player);
        this.icon = 'ghost';
    }
    activate(): void {
        // console.log('SpeedSkill activated');
        this.player.updateSpeed(150);
        let shadow = this.player.scene.add.particles(0, 0, this.player.texture.key,
            {
                quantity: 1,
                blendMode: Phaser.BlendModes.ADD,
                scale: { start: 0.75, end: 0 },
                alpha: { start: 0.5, end: 0 },
                lifespan: 300,
                speed: 10,
            }
        ).startFollow(this.player);
        this.player.scene.time.delayedCall(this.duration, () => {
            this.player.resetSpeed();
            shadow.stop();
            // console.log('SpeedSkill deactivated');
        });
    }
}