import { Player } from '../objects/player';
import { Enemy } from '../objects/enemy';
import { Obstacle } from '../objects/obstacles/obstacle';
import { Bullet } from '../objects/bullet';
import { InputHandler } from '../input/InputHandler';
import { UIContainer } from '../user-interface/UIContainer';
import { PauseButton } from '../user-interface/PauseButton';
import { GameConfig } from '../config';
import { ResumeButton } from '../user-interface/ResumeButton';

enum gameState { PLAYING, PAUSED, GAMEOVER }
export class GameScene extends Phaser.Scene {
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

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    this.physics.world.setFPS(144);
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
    this.InputHandler = new InputHandler(this);
    this.InputHandler.attach(this.player);
    this.cameras.main.startFollow(this.player);
    this.gameState = gameState.PLAYING;
    // this.input.keyboard!.on('keydown-SPACE', () => {
    //   if (this.gameState === gameState.PLAYING) {
    //     console.log('pause');
    //     this.pauseGame();
    //   } else if (this.gameState === gameState.PAUSED) {
    //     this.resumeGame();
    //   }
    // });
  }

  update(): void {
    if (this.gameState !== gameState.PLAYING) return;
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
  public gameOver(): void {
    this.gameState = gameState.GAMEOVER;
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
    this.UIContainer = new UIContainer(this, 0, 0);
    let pauseBtn = new PauseButton(
      {
        scene: this,
        x: GameConfig.width as number,
        y: 0,
        texture: 'pauseDefault',
      },
      'pauseHover'
    ).setOrigin(1, 0);
    this.UIContainer.addButton(pauseBtn);
    this.pausedUI = new UIContainer(this, 0, 0);
    this.pausedUI.addImage(0, 0, 'board', undefined, GameConfig.width as number, GameConfig.height as number);
    let resumeBtn = new ResumeButton(
      {
        scene: this,
        x: GameConfig.width as number / 2,
        y: GameConfig.height as number / 2,
        texture: 'resumeDefault',
    }, 'resumeHover');
    this.pausedUI.addButton(resumeBtn);
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
      // player.updateHealth();
    }
    // bullet.destroy();
    // player.updateHealth();
  }

  private playerBulletHitEnemy(bullet: any, enemy: any): void {
    if (bullet instanceof Bullet && enemy instanceof Enemy)
    {
      enemy.updateHealth();
      bullet.destroy();
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
    }).on('complete', () => {
      console.log('hiding paused UI');
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
    }).on('complete', () => {
      console.log('showing paused UI');
      this.pausedUI.setInteractive();
    });
  }
}
