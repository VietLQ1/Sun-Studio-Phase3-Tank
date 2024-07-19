import { Player } from "../objects/Player";
import { UltimateSkill } from "./UltimateSkill";

export class HealSkill extends UltimateSkill
{
    constructor(player: Player) {
        super(player);
        this.icon = 'heal';
    }
    activate(): void {
        this.player.setTint(0x06D001);
        let healEffect = this.player.scene.add.tween({
            targets: this.player,
            repeat: -1,
            yoyo: true,
            alpha: 0.69,
            duration: 1000,
        });
        let healInterval = setInterval(() => {
            this.player.updateHealth(0.05);
        }, 1000);
        this.player.scene.time.delayedCall(this.duration, () => {
            clearInterval(healInterval);
            healEffect.stop();
            this.player.setTint(0xffffff);
            this.player.setAlpha(1);
        });
    }
}