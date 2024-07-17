import { Bullet } from './Bullet';
import { InputHandler } from '../input/InputHandler';
import { GameScene } from '../scenes/GameScene';

export class Player extends Phaser.GameObjects.Image implements ObserverPattern.IObserver {
  body: Phaser.Physics.Arcade.Body;

  // variables
  private health: number;
  private lastShoot: number;
  private speed: number;
  private targetPosition: Phaser.Math.Vector2;
  // children
  private barrel: Phaser.GameObjects.Image;
  private lifeBar: Phaser.GameObjects.Graphics;

  private direction: {up: boolean, down: boolean, left: boolean, right: boolean};
  // game objects
  private bullets: Phaser.GameObjects.Group;

  // input
  private cursors: Phaser.Input.Pointer;
  public onNotify(subject: ObserverPattern.ISubject): void {
    if (subject instanceof InputHandler) {
      this.cursors = subject.pointer;
      this.direction = {
        up: subject.moveKeys.up.isDown,
        down: subject.moveKeys.down.isDown,
        left: subject.moveKeys.left.isDown,
        right: subject.moveKeys.right.isDown
      };
    }
  }
  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  constructor(aParams: TankGame.IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage() {
    // variables
    this.health = 1;
    this.lastShoot = 0;
    this.speed = 269;
    this.targetPosition = new Phaser.Math.Vector2(this.x, this.y);
    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(0);
    this.angle = 180;

    this.barrel = this.scene.add.image(this.x, this.y, 'barrelBlue');
    this.barrel.setOrigin(0.5, 1);
    this.barrel.setDepth(1);
    this.barrel.angle = 180;

    this.lifeBar = this.scene.add.graphics();
    this.redrawLifebar();

    // game objects
    this.bullets = this.scene.add.group({
      /*classType: Bullet,*/
      active: true,
      maxSize: 10,
      runChildUpdate: true
    });

    // input
    this.scene.input.mouse?.disableContextMenu();
    this.cursors = this.scene.input.activePointer;
    this.direction = {up: false, down: false, left: false, right: false};
    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
  }

  update(): void {
    if (this.active) {
      this.barrel.x = this.x;
      this.barrel.y = this.y;
      this.lifeBar.x = this.x;
      this.lifeBar.y = this.y;
      this.handleInput();
      this.handleShooting();
    } else {
      this.destroy();
      this.barrel.destroy();
      this.lifeBar.destroy();
    }
  }

  private handleInput() {
    // move tank forward
    // small corrections with (- MATH.PI / 2) to align tank correctly
    if (this.direction.up) {
      this.body.setVelocityY(-this.speed);
    }
    else if (this.direction.down) {
      this.body.setVelocityY(this.speed);
    }
    else {
      this.body.setVelocityY(0);
    }
    if (this.direction.left) {
      this.body.setVelocityX(-this.speed);
    }
    else if (this.direction.right) {
      this.body.setVelocityX(this.speed);
    }
    else {
      this.body.setVelocityX(0);
    }
    // rotate tank
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0)
    {
      let trigTan = Math.atan2(this.body.velocity.y, this.body.velocity.x);
      if (trigTan > Math.PI/2)
      {
        trigTan = trigTan - 2 * Math.PI;
      }
      let newAngle = Phaser.Math.Angle.RotateTo(Phaser.Math.DegToRad(this.angle), trigTan + Math.PI / 2);
      // console.log(Phaser.Math.RadToDeg(trigTan + Math.PI / 2));
      // console.log(Phaser.Math.RadToDeg(newAngle));
      this.angle = Phaser.Math.RadToDeg(newAngle);
      // console.log(this.angle);
    }
    this.targetPosition.setTo(this.cursors.worldX, this.cursors.worldY);
    // console.log(this.targetPosition);
    // console.log(this.x, this.y);
    // rotate barrel
    let angle = Phaser.Math.Angle.Between(this.barrel.x, this.barrel.y, this.targetPosition.x, this.targetPosition.y);
    this.barrel.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
  }

  private handleShooting(): void {
    if (this.cursors.leftButtonDown() && this.scene.time.now > this.lastShoot) {
      this.scene.cameras.main.shake(10, 0.0025);
      this.scene.tweens.add({
        targets: this,
        props: { alpha: 0.8 },
        delay: 0,
        duration: 5,
        ease: 'Power1',
        easeParams: null,
        hold: 0,
        repeat: 0,
        repeatDelay: 0,
        yoyo: true,
        paused: false
      });

      if (this.bullets.getLength() < 10) {
        this.scene.sound.play('shootSound', { volume: 0.069 });
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            rotation: this.barrel.rotation,
            x: this.barrel.x,
            y: this.barrel.y,
            texture: 'bulletBlue'
          })
        );

        this.lastShoot = this.scene.time.now + 80;
      }
    }
  }

  private redrawLifebar(): void {
    this.lifeBar.clear();
    this.lifeBar.fillStyle(0xe66a28, 1);
    this.lifeBar.fillRect(
      -this.width / 2,
      this.height / 2,
      this.width * this.health,
      15
    );
    this.lifeBar.lineStyle(2, 0xffffff);
    this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15);
    this.lifeBar.setDepth(1);
  }

  public updateHealth(): void {
    if (this.health === 0)
    {
      return;
    }
    if (this.health > 0) {
      this.health -= 0.05;
      this.redrawLifebar();
    } else {
      this.health = 0;
      this.active = false;
      this.scene.cameras.main.shake(100, 0.01);
      if (this.scene instanceof GameScene) {
        let scene = this.scene as GameScene;
        this.scene.add.sprite(this.x, this.y, 'explosion').play('explosion').on('animationcomplete', () => {
          // this.destroy();
          scene.gameOver(false);
        });
      }
    }
    this.scene.sound.play('explosionSound', { volume: 0.069 });
  }
}
