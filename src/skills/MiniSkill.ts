import { Player } from "../objects/Player";

export class MiniSkill implements TankGame.IPlayerSkill {
    icon: string
    player: Player;
    duration: number;
    cooldown: number;
    activate(): void {
        console.log('MiniSkill activated');
    }
    constructor(player: Player) {
        this.duration = 3000;
        this.cooldown = 10000;
        this.player = player;
    }
}