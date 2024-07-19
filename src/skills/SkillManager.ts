import { Player } from "../objects/Player";
import { UIContainer } from "../user-interface/UIContainer";

export class SkillManager extends UIContainer
{
    private player: Player;
    private miniSkill: Phaser.GameObjects.Image;
    private ultimateSkill: Phaser.GameObjects.Image;
    private miniSkillText: Phaser.GameObjects.Text;
    private ultimateSkillText: Phaser.GameObjects.Text;
    private miniSkillCooldown: Phaser.GameObjects.Text;
    private ultimateSkillCooldown: Phaser.GameObjects.Text;
    constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
        super(scene, x, y);
        this.player = player;
        this.initSkillUI();
    }
    private initSkillUI(): void {
        let board = this.addImage(0, 0, 'board').setOrigin(0.5, 1).setDisplaySize(200, 100);
        Phaser.Display.Align.In.BottomCenter(board, this.displayZone, 0, 0);
        this.miniSkill = this.addImage(0, 0, this.player.miniSkill.icon);
        this.miniSkillText = this.addText(0, 0, 'E', { fontSize: '32px', color: '#ffffff' });
        this.miniSkillText.setOrigin(0.5, 0.5);
        this.ultimateSkillText = this.addText(0, 0, 'SPACE', { fontSize: '32px', color: '#ffffff' });
        this.ultimateSkill = this.addImage(0, 0, this.player.ultimateSkill.icon);
        Phaser.Display.Align.In.BottomCenter(this.miniSkill, this.displayZone, -50);
        Phaser.Display.Align.In.BottomCenter(this.ultimateSkill, this.displayZone, 50);
        Phaser.Display.Align.In.TopCenter(this.miniSkillText, this.miniSkill, 0, 30);
        Phaser.Display.Align.In.TopCenter(this.ultimateSkillText, this.ultimateSkill, 0, 30);
        this.miniSkillCooldown = this.addText(0, 0, '', { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5, 0.5);
        this.ultimateSkillCooldown = this.addText(0, 0, '', { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5, 0.5);
        Phaser.Display.Align.In.Center(this.miniSkillCooldown, this.miniSkill);
        Phaser.Display.Align.In.Center(this.ultimateSkillCooldown, this.ultimateSkill);
    }
    public updateSkillUI(): void {
        this.miniSkill.setTint(this.player.cooldowns.mini > 0 ? 0x666666 : 0xffffff);
        this.ultimateSkill.setTint(this.player.cooldowns.ultimate > 0 ? 0x666666 : 0xffffff);
        this.miniSkillCooldown.setText(this.player.cooldowns.mini > 0 ? (this.player.cooldowns.mini / 1000).toPrecision(3).toString() : '');
        this.ultimateSkillCooldown.setText(this.player.cooldowns.ultimate > 0 ? (this.player.cooldowns.ultimate / 1000).toPrecision(3).toString() : '');
    }
}