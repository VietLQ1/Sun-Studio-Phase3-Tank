import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';
import { Obstacle } from '../objects/obstacles/Obstacle';
import { Bullet } from '../objects/Bullet';
import { InputHandler } from '../input/InputHandler';
import { UIContainer } from '../user-interface/UIContainer';
import { GameConfig } from '../config';
import { HeaderContainer } from '../user-interface/HeaderContainer';
import { PausedContainer } from '../user-interface/PausedContainer';
import { GameOverContainer } from '../user-interface/GameOverContainer';

enum gameState { PLAYING, PAUSED, GAMEOVER }
export class GameScene extends Phaser.Scene {
  private score: number;
  private gameState: gameState;
  private InputHandler: InputHandler;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.TilemapLayer;

  private player: Player;
  private enemies: Phaser.GameObjects.Group;
  private obstacles: Phaser.GameObjects.Group;

  private UIContainer: UIContainer;
  private pausedUI: UIContainer;
  private gameOverUI: UIContainer;
  private scoreText: Phaser.GameObjects.Text;
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    this.physics.world.setFPS(144);
    this.sound.stopAll();
    this.sound.add('gameBGM', { loop: true, volume: 0.3 }).play();
    this.anims.create({
      key: 'explosion',
      frames: [
        { key: 'explosion1' },
        { key: 'explosion2' },
        { key: 'explosion3' },
        { key: 'explosion4'},
        { key: 'explosion5'},
      ],
      frameRate: 30,
      repeat: 0
    });
    this.score = 0;
    // this.sound.setMute(true);
    // console.log(this.physics.world.fps);
  }

  create(): void {
    // create tilemap from tiled JSON
    this.map = this.make.tilemap({ key: 'levelMap' });
    this.tileset = this.map.addTilesetImage('tiles')!;
    this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0)!;
    this.layer.setCollisionByProperty({ collide: true });
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.obstacles = this.add.group({
      /*classType: Obstacle,*/
      runChildUpdate: true
    });

    this.enemies = this.add.group({
      /*classType: Enemy*/
    });
    this.convertObjects();

    this.initPhysics();
    this.createUI();
    this.cameras.main.fadeIn(500);
    this.InputHandler = new InputHandler(this);
    this.InputHandler.attach(this.player);
    this.cameras.main.startFollow(this.player);
    this.gameState = gameState.PLAYING;
  }

  update(): void {
    if (this.gameState !== gameState.PLAYING) return;
    if (this.enemies.getLength() === 0) {
      this.gameOver(true);
    }
    this.player.update();

    this.enemies.getChildren().forEach((enemy: Phaser.GameObjects.GameObject) => {
      enemy.update();
      if (this.player.active && enemy.active && enemy instanceof Enemy) {
        var angle = Phaser.Math.Angle.Between(
          enemy.body.x,
          enemy.body.y,
          this.player.body.x,
          this.player.body.y
        );

        enemy.getBarrel().angle =
          (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
      }
    }, this);
  }
  public pauseGame(): void {
    // console.log(this.enemies.getLength());
    this.gameState = gameState.PAUSED;
    let body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);
    for (let i = 0; i < this.tweens.getTweens().length; i++) {
      this.tweens.getTweens()[i].pause();
    }
    this.showPausedUI();
    let pBullets = this.player.getBullets().getChildren() as Bullet[];
    pBullets.forEach((bullet) => {
      bullet.body.setVelocity(0);
    });
    let eBullets = this.enemies.getChildren() as Enemy[];
    eBullets.forEach((enemy) => {
      let bullets = enemy.getBullets().getChildren() as Bullet[];
      bullets.forEach((bullet) => {
        bullet.body.setVelocity(0);
      });
    });
  }
  public resumeGame(): void {
    this.hidePausedUI();
    this.gameState = gameState.PLAYING;
    for (let i = 0; i < this.tweens.getTweens().length; i++) {
      this.tweens.getTweens()[i].resume();
    }
    let pBullets = this.player.getBullets().getChildren() as Bullet[];
    pBullets.forEach((bullet) => {
      this.physics.velocityFromRotation(
        bullet.rotation - Math.PI / 2,
        800,
        bullet.body.velocity
      );
    });
    let eBullets = this.enemies.getChildren() as Enemy[];
    eBullets.forEach((enemy) => {
      let bullets = enemy.getBullets().getChildren() as Bullet[];
      bullets.forEach((bullet) => {
        this.physics.velocityFromRotation(
          bullet.rotation - Math.PI / 2,
          800,
          bullet.body.velocity
        );
      });
    });
  }
  public gameOver(isVictory: boolean): void {
    if (this.player.body)
    {
      this.physics.world.remove(this.player.body);
    }
    for (let i = 0; i < this.tweens.getTweens().length; i++) {
      this.tweens.getTweens()[i].pause();
    }
    
    this.player.setActive(false);
    this.UIContainer.disableInteractive();
    this.pausedUI.disableInteractive();
    this.sound.stopAll();
    if (isVictory) {
      this.sound.add('victory', { loop: false, volume: 0.3 }).play();
    }
    this.gameState = gameState.GAMEOVER;
    this.gameOverUI = new GameOverContainer(this, 0, 0);
    // this.gameOverUI.addText(GameConfig.width as number / 2, GameConfig.height as number / 2 - 200, isVictory ? 'VICTORY' : 'GAME OVER', {
    //   fontSize: '60px',
    //   color: '#fff',
    //   fontStyle: 'bold',
    // }).setOrigin(0.5, 0.5);
    // this.gameOverUI.addText(GameConfig.width as number / 2, GameConfig.height as number / 2 + 100, 'Score: ' + this.score, {
    //   fontSize: '40px',
    //   color: '#fff',
    //   fontStyle: 'bold',
    // }).setOrigin(0.5, 0.5);
    (this.gameOverUI as GameOverContainer).setScore(this.score);
    (this.gameOverUI as GameOverContainer).setTitle(isVictory ? 'VICTORY' : 'GAME OVER');

    this.gameOverUI.setAlpha(0);
    this.tweens.add({
      targets: this.gameOverUI,
      alpha: 1,
      duration: 1000,
      ease: 'Sine.easeInOut',
    }).on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
      this.gameOverUI.setInteractive();
    });
  }

  private convertObjects(): void {
    // find the object layer in the tilemap named 'objects'
    const objects = this.map.getObjectLayer('objects')!.objects as any[];

    objects.forEach((object) => {
      if (object.type === 'player') {
        this.player = new Player({
          scene: this,
          x: object.x,
          y: object.y,
          texture: 'tankBlue'
        });
      } else if (object.type === 'enemy') {
        let enemy = new Enemy({
          scene: this,
          x: object.x,
          y: object.y,
          texture: 'tankRed'
        });

        this.enemies.add(enemy);
      } else {
        let obstacle = new Obstacle({
          scene: this,
          x: object.x,
          y: object.y - 40,
          texture: object.type
        });

        this.obstacles.add(obstacle);
      }
    });
  }

  private initPhysics(): void {
    // collider layer and obstacles
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.player, this.obstacles);

    // collider for bullets
    this.physics.add.collider(
      this.player.getBullets(),
      this.layer,
      this.bulletHitLayer,
      undefined,
      this
    );

    this.physics.add.collider(
      this.player.getBullets(),
      this.obstacles,
      this.bulletHitObstacles,
      undefined,
      this
    );

    this.enemies.getChildren().forEach((enemy: Phaser.GameObjects.GameObject) => {
      this.physics.add.overlap(
        this.player.getBullets(),
        enemy,
        this.playerBulletHitEnemy,
        undefined,
        this
      );
      this.physics.add.overlap(
        (enemy as Enemy).getBullets(),
        this.player,
        this.enemyBulletHitPlayer,
        undefined
      );

      this.physics.add.collider(
        (enemy as Enemy).getBullets(),
        this.obstacles,
        this.bulletHitObstacles,
        undefined
      );
      this.physics.add.collider(
        (enemy as Enemy).getBullets(),
        this.layer,
        this.bulletHitLayer,
        undefined
      );
    }, this);
  }
  private createUI(): void {
    this.UIContainer = new HeaderContainer(this, 0, 0);
    this.scoreText = this.UIContainer.addText(10, 10, 'Score: 0', {
      fontSize: '50px',
      color: '#fff',
      fontStyle: 'bold',
    });
    this.events.on('updateScore', () => {
      this.scoreText.setText('Score: ' + this.score);
    });
    this.pausedUI = new PausedContainer(this, 0, 0);
    this.hidePausedUI();
  }
  private bulletHitLayer(bullet: any): void {
    if (bullet instanceof Bullet)
      bullet.destroy();
  }

  private bulletHitObstacles(bullet: any, obstacle: any): void {
    if (bullet instanceof Bullet && obstacle instanceof Obstacle)
      bullet.destroy();
  }

  private enemyBulletHitPlayer(bullet: any, player: any): void {
    if (bullet instanceof Bullet && player instanceof Player)
    {
      bullet.destroy();
      player.updateHealth();
    }
    // bullet.destroy();
    // player.updateHealth();
  }

  private playerBulletHitEnemy(bullet: any, enemy: any): void {
    if (bullet instanceof Bullet && enemy instanceof Enemy)
    {
      this.score += 10;
      // console.log('score: ' + this.score);
      this.events.emit('updateScore');
      enemy.updateHealth();
      bullet.destroy();
      // console.log(this.enemies.getLength());
    }
    // bullet.destroy();
    // enemy.updateHealth();
  }
  private hidePausedUI(): void {
    this.pausedUI.disableInteractive();
    this.tweens.add({
      targets: this.pausedUI,
      y: GameConfig.height as number,
      alpha: 0,
      duration: 150,
      ease: 'Sine.easeInOut',
    }).on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
      // console.log('hiding paused UI');
      this.UIContainer.setVisible(true);
      this.UIContainer.setInteractive();
    });
  }
  private showPausedUI(): void {
    this.UIContainer.disableInteractive();
    this.UIContainer.setVisible(false);
    this.tweens.add({
      targets: this.pausedUI,
      y: 0,
      alpha: 1,
      duration: 200,
      ease: 'Power3',
    }).on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
      // console.log('showing paused UI');
      this.pausedUI.setInteractive();
    });
  }
}