import { UltimateSkill } from "./UltimateSkill";

export class HealSkill extends UltimateSkill
{
    activate(): void {
        let healInterval = setInterval(() => {
            this.player.updateHealth(0.05);
        }, 1000);
        this.player.scene.time.delayedCall(this.duration, () => {
            clearInterval(healInterval);
        });
    }
}