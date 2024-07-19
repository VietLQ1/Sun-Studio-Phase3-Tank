import { Player } from "../objects/Player";

export class UltimateSkill implements TankGame.IPlayerSkill {
    duration: number;
    cooldown: number;
    player: Player;
    activate(): void {
        console.log('UltimateSkill activated');
    }
    constructor(player: Player) {
        this.duration = 5000;
        this.cooldown = 20000;
        this.player = player;
    }
}