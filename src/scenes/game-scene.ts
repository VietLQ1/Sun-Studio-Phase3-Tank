import { Player } from '../objects/player';
import { Enemy } from '../objects/enemy';
import { Obstacle } from '../objects/obstacles/obstacle';
import { Bullet } from '../objects/bullet';
import { InputHandler } from '../input/InputHandler';

export class GameScene extends Phaser.Scene {
  private InputHandler: InputHandler;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.TilemapLayer;

  private player: Player;
  private enemies: Phaser.GameObjects.Group;
  private obstacles: Phaser.GameObjects.Group;
  
  private target: Phaser.Math.Vector2;

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
    this.InputHandler = new InputHandler(this);
    this.InputHandler.attach(this.player);
    this.cameras.main.startFollow(this.player);
  }

  update(): void {
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
}
