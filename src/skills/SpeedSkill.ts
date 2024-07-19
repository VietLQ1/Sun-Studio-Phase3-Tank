import { MiniSkill } from "./MiniSkill";

export class SpeedSkill extends MiniSkill
{
    activate(): void {
        console.log('SpeedSkill activated');
        this.player.updateSpeed(150);
        this.player.scene.time.delayedCall(this.duration, () => {
            this.player.resetSpeed();
            console.log('SpeedSkill deactivated');
        });
    }
}