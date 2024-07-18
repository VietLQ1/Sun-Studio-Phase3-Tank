import { GameScene } from "../scenes/GameScene";

export class Bullet extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  private bulletSpeed: number;

  constructor(aParams: TankGame.IBulletConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.rotation = aParams.rotation;
    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage(): void {
    // variables
    this.bulletSpeed = 800;

    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(2);

    // physics
    this.scene.physics.world.enable(this);
    this.scene.physics.velocityFromRotation(
      this.rotation - Math.PI / 2,
      this.bulletSpeed,
      this.body.velocity
    );
    let scene = this.scene as GameScene;
    scene.ignoreOnMiniMap(this);
    this.on(Phaser.GameObjects.Events.DESTROY, () => {
      // console.log('destroyed');
      let explosion = this.scene.add.sprite(this.x, this.y, 'explosion').play('explosion').on('animationcomplete', () => {
        explosion.destroy()});
      this.body.stop();
      scene.ignoreOnMiniMap(explosion);
    });
  }

  update(): void {}
}
