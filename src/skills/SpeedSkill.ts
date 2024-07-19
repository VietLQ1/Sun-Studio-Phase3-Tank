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
        console.log('SpeedSkill activated');
        this.player.updateSpeed(150);
        this.player.scene.time.delayedCall(this.duration, () => {
            this.player.resetSpeed();
            console.log('SpeedSkill deactivated');
        });
    }
}