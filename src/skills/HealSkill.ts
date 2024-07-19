import { Player } from "../objects/Player";
import { UltimateSkill } from "./UltimateSkill";

export class HealSkill extends UltimateSkill
{
    constructor(player: Player) {
        super(player);
        this.icon = 'heal';
    }
    activate(): void {
        let healInterval = setInterval(() => {
            this.player.updateHealth(0.05);
        }, 1000);
        this.player.scene.time.delayedCall(this.duration, () => {
            clearInterval(healInterval);
        });
    }
}