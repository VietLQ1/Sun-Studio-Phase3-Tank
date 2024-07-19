(()=>{"use strict";var e,t={15:(e,t,s)=>{var i;s(440);class a extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(0),this.createLoadingGraphics(),this.input.setDefaultCursor("url(assets/images/normal.cur), pointer"),this.load.on("progress",(function(e){this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(function(){this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.pack("preload","./assets/pack.json","preload"),this.load.audio("gameBGM","assets/audio/GameBGM.mp3"),this.load.audio("menuBGM","assets/audio/MenuBGM.mp3"),this.load.audio("shootSound","assets/audio/shotFX.mp3"),this.load.audio("explosionSound","assets/audio/explodeFX.mp3"),this.load.audio("button","assets/audio/button.mp3"),this.load.audio("victory","assets/audio/victory.mp3"),this.load.audio("defeat","assets/audio/defeat.mp3")}update(){this.scene.start("MenuScene")}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}class h extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture),this.rotation=e.rotation,this.initImage(),this.scene.add.existing(this)}initImage(){this.bulletSpeed=800,this.setOrigin(.5,.5),this.setDepth(2),this.scene.physics.world.enable(this),this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.bulletSpeed,this.body.velocity);let e=this.scene;e.ignoreOnMiniMap(this),this.on(Phaser.GameObjects.Events.DESTROY,(()=>{let t=this.scene.add.sprite(this.x,this.y,"explosion").play("explosion").on("animationcomplete",(()=>{t.destroy()}));this.body.stop(),e.ignoreOnMiniMap(t)}))}update(){}}class n{constructor(e){this.observers=[],this.scene=e,this.pointer=e.input.activePointer,this.moveKeys={up:e.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),down:e.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),left:e.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),right:e.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)},this.skillKeys={mini:e.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),ultimate:e.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)},this.setupInputs()}attach(e){if(this.observers.includes(e))return console.log("Observer has already been attached.");this.observers.push(e)}detach(e){const t=this.observers.indexOf(e);if(-1===t)return console.log("Nonexistent observer.");this.observers.splice(t,1)}notify(){for(const e of this.observers)e.onNotify(this)}setupInputs(){this.scene.input.on(Phaser.Input.Events.POINTER_DOWN,(e=>{this.pointer=e,this.notify()})),this.scene.input.on(Phaser.Input.Events.POINTER_MOVE,(e=>{this.notify()})),this.scene.input.on(Phaser.Input.Events.POINTER_UP,(e=>{this.notify()})),this.moveKeys.up.on(Phaser.Input.Keyboard.Events.DOWN,(()=>{this.notify()})),this.moveKeys.down.on(Phaser.Input.Keyboard.Events.DOWN,(()=>{this.notify()})),this.moveKeys.left.on(Phaser.Input.Keyboard.Events.DOWN,(()=>{this.notify()})),this.moveKeys.right.on(Phaser.Input.Keyboard.Events.DOWN,(()=>{this.notify()})),this.moveKeys.up.on(Phaser.Input.Keyboard.Events.UP,(()=>{this.notify()})),this.moveKeys.down.on(Phaser.Input.Keyboard.Events.UP,(()=>{this.notify()})),this.moveKeys.left.on(Phaser.Input.Keyboard.Events.UP,(()=>{this.notify()})),this.moveKeys.right.on(Phaser.Input.Keyboard.Events.UP,(()=>{this.notify()})),this.skillKeys.mini.on(Phaser.Input.Keyboard.Events.DOWN,(()=>{this.notify()})),this.skillKeys.ultimate.on(Phaser.Input.Keyboard.Events.DOWN,(()=>{this.notify()}))}}class o{activate(){console.log("MiniSkill activated")}constructor(e){this.duration=3e3,this.cooldown=1e4,this.player=e}}class r extends o{constructor(e){super(e),this.icon="ghost"}activate(){this.player.updateSpeed(150);let e=this.player.scene.add.particles(0,0,this.player.texture.key,{quantity:1,blendMode:Phaser.BlendModes.ADD,scale:{start:.75,end:0},alpha:{start:.5,end:0},lifespan:300,speed:10}).startFollow(this.player);this.player.scene.time.delayedCall(this.duration,(()=>{this.player.resetSpeed(),e.stop()}))}}class l{activate(){console.log("UltimateSkill activated")}constructor(e){this.duration=5e3,this.cooldown=2e4,this.player=e}}class d extends l{constructor(e){super(e),this.icon="heal"}activate(){this.player.setTint(446465);let e=this.player.scene.add.tween({targets:this.player,repeat:-1,yoyo:!0,alpha:.69,duration:1e3}),t=setInterval((()=>{this.player.updateHealth(.05)}),1e3);this.player.scene.time.delayedCall(this.duration,(()=>{clearInterval(t),e.stop(),this.player.setTint(16777215),this.player.setAlpha(1)}))}}class c extends Phaser.GameObjects.Image{onNotify(e){e instanceof n&&(this.cursors=e.pointer,this.direction={up:e.moveKeys.up.isDown,down:e.moveKeys.down.isDown,left:e.moveKeys.left.isDown,right:e.moveKeys.right.isDown},this.activateSkill={mini:e.skillKeys.mini.isDown,ultimate:e.skillKeys.ultimate.isDown})}getBullets(){return this.bullets}constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.initImage(),this.scene.add.existing(this),this.miniSkill=new r(this),this.ultimateSkill=new d(this)}initImage(){var e;this.health=1,this.lastShoot=0,this.speed=269,this.targetPosition=new Phaser.Math.Vector2(this.x,this.y),this.setOrigin(.5,.5),this.setDepth(0),this.angle=180,this.barrel=this.scene.add.image(this.x,this.y,"barrelBlue"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.barrel.angle=180,this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),null===(e=this.scene.input.mouse)||void 0===e||e.disableContextMenu(),this.cursors=this.scene.input.activePointer,this.direction={up:!1,down:!1,left:!1,right:!1},this.activateSkill={mini:!1,ultimate:!1},this.cooldowns={mini:0,ultimate:0},this.scene.physics.world.enable(this),this.body.allowGravity=!1}update(){this.active?(this.cursors.updateWorldPoint(this.scene.cameras.main),this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleInput(),this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleInput(){if(this.direction.up?this.body.setVelocityY(-this.speed):this.direction.down?this.body.setVelocityY(this.speed):this.body.setVelocityY(0),this.direction.left?this.body.setVelocityX(-this.speed):this.direction.right?this.body.setVelocityX(this.speed):this.body.setVelocityX(0),0!==this.body.velocity.x||0!==this.body.velocity.y){let e=Math.atan2(this.body.velocity.y,this.body.velocity.x);e>Math.PI/2&&(e-=2*Math.PI);let t=Phaser.Math.Angle.RotateTo(Phaser.Math.DegToRad(this.angle),e+Math.PI/2);this.angle=Phaser.Math.RadToDeg(t)}this.targetPosition.setTo(this.cursors.worldX,this.cursors.worldY);let e=Phaser.Math.Angle.Between(this.barrel.x,this.barrel.y,this.targetPosition.x,this.targetPosition.y);this.barrel.angle=(e+Math.PI/2)*Phaser.Math.RAD_TO_DEG,this.activateSkill.mini&&0===this.cooldowns.mini&&(this.miniSkill.activate(),this.cooldowns.mini=this.miniSkill.cooldown),this.activateSkill.ultimate&&0===this.cooldowns.ultimate&&(this.ultimateSkill.activate(),this.cooldowns.ultimate=this.ultimateSkill.cooldown),this.cooldowns.mini>0&&(this.cooldowns.mini-=this.scene.sys.game.loop.delta,this.cooldowns.mini<0&&(this.cooldowns.mini=0)),this.cooldowns.ultimate>0&&(this.cooldowns.ultimate-=this.scene.sys.game.loop.delta,this.cooldowns.ultimate<0&&(this.cooldowns.ultimate=0))}handleShooting(){this.cursors.leftButtonDown()&&this.scene.time.now>this.lastShoot&&(this.scene.cameras.main.shake(10,.0025),this.bullets.getLength()<10&&(this.scene.sound.play("shootSound",{volume:.069}),this.bullets.add(new h({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletBlue"})),this.lastShoot=this.scene.time.now+80))}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1),this.health<=.3&&this.health>.25?this.barTween=this.scene.tweens.add({targets:this.lifeBar,alpha:0,duration:100,ease:"Power1",yoyo:!0,repeat:-1}):this.barTween&&(this.lifeBar.alpha=1,this.barTween.stop())}updateHealth(e){if(0!==this.health){if(this.health>0)this.health+=e,this.health>1&&(this.health=1),this.redrawLifebar();else if(this.health=0,this.active=!1,this.scene.cameras.main.shake(100,.01),this.scene instanceof O){let e=this.scene;this.scene.add.sprite(this.x,this.y,"explosion").play("explosion").on("animationcomplete",(()=>{e.gameOver(!1)}))}e<0&&this.scene.sound.play("explosionSound",{volume:.069})}}updateSpeed(e){this.speed+=e}resetSpeed(){this.speed=269,console.log("Speed reset")}}class p extends Phaser.GameObjects.Image{getBarrel(){return this.barrel}getBullets(){return this.bullets}constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.initContainer(),this.scene.add.existing(this)}initContainer(){this.health=1,this.lastShoot=0,this.speed=100,this.setDepth(0),this.barrel=this.scene.add.image(0,0,"barrelRed"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.scene.tweens.add({targets:this,props:{y:this.y-200},delay:0,duration:2e3,ease:"Linear",easeParams:null,hold:0,repeat:-1,repeatDelay:0,yoyo:!0}),this.scene.physics.world.enable(this)}update(){this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleShooting(){this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&(this.bullets.add(new h({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletRed"})),this.lastShoot=this.scene.time.now+400)}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,this.redrawLifebar()):(this.health=0,this.active=!1),this.scene.sound.play("explosionSound",{volume:.069})}}class u extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture),this.initImage(),this.scene.add.existing(this)}initImage(){this.setOrigin(0,0),this.scene.physics.world.enable(this),this.body.setImmovable(!0)}update(){}}class y extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.defaultTexture=e.texture,this.overTexture=e.texture,this.initImage(),this.initInput(),this.scene.add.existing(this),this.downed=!1}initImage(){this.setOrigin(.5,.5),this.setInteractive(),this.setDepth(1)}initInput(){this.on(Phaser.Input.Events.POINTER_OVER,this.onOver,this),this.on(Phaser.Input.Events.POINTER_OUT,this.onOut,this),this.on(Phaser.Input.Events.POINTER_DOWN,this.onDown,this),this.on(Phaser.Input.Events.POINTER_UP,this.onUp,this)}onOver(){this.setTexture(this.overTexture)}onOut(){this.downed=!1,this.setAlpha(1),this.setTexture(this.defaultTexture)}onDown(){this.setAlpha(.75),this.scene.sound.play("button"),this.downed=!0}onUp(){this.setTexture(this.defaultTexture),this.setAlpha(1)}}class m extends y{constructor(e,t){super(e),this.overTexture=t}onUp(){super.onUp(),this.downed&&(this.downed=!1,this.scene instanceof O&&this.scene.pauseGame())}}class g extends Phaser.GameObjects.Container{constructor(e,t,s){super(e,t,s),this.textList=[],this.imageList=[],this.buttonList=[],this.initContainer(),this.scene.add.existing(this)}initContainer(){this.setDepth(3),this.displayZone=this.scene.add.zone(C.width/2,C.height/2,C.width,C.height).setScrollFactor(0)}addText(e,t,s,i){const a=this.scene.add.text(e,t,s,i).setOrigin(0,0).setScrollFactor(0);return this.textList.push(a),this.add(a),a}addImage(e,t,s,i,a,h){const n=this.scene.add.image(e,t,s,i).setOrigin(0,0).setScrollFactor(0);return this.imageList.push(n),this.add(n),a&&h&&(n.displayWidth=a,n.displayHeight=h),n}addButton(e){e.setScrollFactor(0),this.buttonList.push(e),this.add(e)}disableInteractive(){return this.buttonList.forEach((e=>{e.disableInteractive()})),this}setInteractive(){return this.buttonList.forEach((e=>{e.setInteractive()})),this}get DisplayZone(){return this.displayZone}}class f extends g{constructor(e,t,s){super(e,t,s),this.initHeader()}initHeader(){let e=new m({scene:this.scene,x:0,y:0,texture:"pauseDefault"},"pauseHover");this.addButton(e),Phaser.Display.Align.In.TopRight(e,this.displayZone,-10,-10)}}class v extends y{constructor(e,t){super(e),this.overTexture=t}onUp(){if(super.onUp(),!this.downed)return;this.downed=!1;let e=this.scene.cameras.getCamera("miniMap");const t=this.scene.cameras.main.postFX.addWipe(.3,1,1);this.scene.scene.transition({target:"MenuScene",duration:500,moveBelow:!0,onUpdate:s=>{t.progress=s,e.setSize((null==e?void 0:e.width)*(1-s),(null==e?void 0:e.height)*(1-s))}})}}class x extends y{constructor(e,t){super(e),this.overTexture=t}onUp(){if(super.onUp(),!this.downed)return;this.downed=!1,this.scene.scene.isActive("GameScene")&&(this.scene.cameras.main.once("camerafadeoutcomplete",(()=>{this.scene.scene.restart(),this.scene.data.reset()})),this.scene.cameras.main.fadeOut(500)),this.scene.sound.stopAll();const e=this.scene.cameras.main.postFX.addWipe();this.scene.scene.transition({target:"GameScene",duration:500,moveBelow:!0,onUpdate:t=>{e.progress=t}})}}class I extends y{constructor(e,t){super(e),this.overTexture=t}onUp(){super.onUp(),this.downed&&(this.downed=!1,this.scene instanceof O&&this.scene.resumeGame())}}class w extends y{constructor(e){super(e),this.defaultTexture="soundOnDefault",this.overTexture="soundOnHover",this.setTexture(this.defaultTexture)}onUp(){super.onUp(),this.downed&&(this.downed=!1,this.scene.sound.setMute(!this.scene.sound.mute),this.scene.sound.mute?(this.defaultTexture="soundOnDefault",this.setTexture("soundOnDefault"),this.overTexture="soundOnHover"):(this.defaultTexture="soundOffDefault",this.setTexture("soundOffDefault"),this.overTexture="soundOffHover"))}}class b extends g{constructor(e,t,s){super(e,t,s),this.initPaused()}initPaused(){this.displayZone.setSize(C.width/1.8,C.height/1.8);let e=this.addImage(0,0,"board",void 0,C.width/1.8,C.height/1.8).setOrigin(.5,.5);Phaser.Display.Align.In.Center(e,this.displayZone);let t=this.addText(0,0,"PAUSED",{fontSize:"60px",color:"#fff",fontStyle:"bold"}).setOrigin(.5,.5);Phaser.Display.Align.In.TopCenter(t,this.displayZone,0,-50);let s=new I({scene:this.scene,x:0,y:0,texture:"resumeDefault"},"resumeHover");this.addButton(s),Phaser.Display.Align.In.Center(s,this.displayZone);let i=new x({scene:this.scene,x:0,y:0,texture:"restartDefault"},"restartHover");this.addButton(i),Phaser.Display.Align.In.Center(i,this.displayZone,200,0);let a=new v({scene:this.scene,x:0,y:0,texture:"homeDefault"},"homeHover");this.addButton(a),Phaser.Display.Align.In.Center(a,this.displayZone,-200,0);let h=new w({scene:this.scene,x:0,y:0,texture:"soundDefault"});this.addButton(h),Phaser.Display.Align.In.BottomCenter(h,this.displayZone,0,-20)}}class S extends g{constructor(e,t,s){super(e,t,s),this.initGameOver()}initGameOver(){this.displayZone.setSize(C.width/2,C.height/2);let e=this.addImage(0,0,"board",void 0,C.width/2,C.height/2).setOrigin(.5,.5);Phaser.Display.Align.In.Center(e,this.displayZone),this.scoreText=this.addText(0,0,"Your Score: 0",{fontSize:"40px",color:"#fff",fontStyle:"bold"}).setOrigin(.5,.5),Phaser.Display.Align.In.BottomCenter(this.scoreText,this.displayZone,0,-150);let t=this.addText(0,0,"High Score: "+localStorage.getItem("highscore"),{fontSize:"40px",color:"#fff",fontStyle:"bold"}).setOrigin(.5,.5);Phaser.Display.Align.In.BottomCenter(t,this.displayZone,0,-50);let s=new x({scene:this.scene,x:0,y:0,texture:"restartDefault"},"restartHover");this.addButton(s),Phaser.Display.Align.In.Center(s,this.displayZone,200,0);let i=new v({scene:this.scene,x:0,y:0,texture:"homeDefault"},"homeHover");this.addButton(i),Phaser.Display.Align.In.Center(i,this.displayZone,-200,0)}setScore(e){this.scoreText.setText(`Your Score: ${e}`)}setTitle(e){"VICTORY"===e&&this.imageList[0].setTint(5278875)}}class P extends g{constructor(e,t,s,i){super(e,t,s),this.player=i,this.initSkillUI()}initSkillUI(){let e=this.addImage(0,0,"board").setOrigin(.5,1).setDisplaySize(200,100);Phaser.Display.Align.In.BottomCenter(e,this.displayZone,0,0),this.miniSkill=this.addImage(0,0,this.player.miniSkill.icon).disableInteractive(),this.miniSkillText=this.addText(0,0,"E",{fontSize:"32px",color:"#ffffff"}),this.miniSkillText.setOrigin(.5,.5),this.ultimateSkillText=this.addText(0,0,"SPACE",{fontSize:"32px",color:"#ffffff"}),this.ultimateSkill=this.addImage(0,0,this.player.ultimateSkill.icon).disableInteractive(),Phaser.Display.Align.In.BottomCenter(this.miniSkill,this.displayZone,-50),Phaser.Display.Align.In.BottomCenter(this.ultimateSkill,this.displayZone,50),Phaser.Display.Align.In.TopCenter(this.miniSkillText,this.miniSkill,0,30),Phaser.Display.Align.In.TopCenter(this.ultimateSkillText,this.ultimateSkill,0,30),this.miniSkillCooldown=this.addText(0,0,"",{fontSize:"24px",color:"#ffffff"}).setOrigin(.5,.5),this.ultimateSkillCooldown=this.addText(0,0,"",{fontSize:"24px",color:"#ffffff"}).setOrigin(.5,.5),Phaser.Display.Align.In.Center(this.miniSkillCooldown,this.miniSkill),Phaser.Display.Align.In.Center(this.ultimateSkillCooldown,this.ultimateSkill)}updateSkillUI(){this.miniSkill.setTint(this.player.cooldowns.mini>0?6710886:16777215),this.ultimateSkill.setTint(this.player.cooldowns.ultimate>0?6710886:16777215),this.miniSkillCooldown.setText(this.player.cooldowns.mini>0?(this.player.cooldowns.mini/1e3).toPrecision(3).toString():""),this.ultimateSkillCooldown.setText(this.player.cooldowns.ultimate>0?(this.player.cooldowns.ultimate/1e3).toPrecision(3).toString():"")}}!function(e){e[e.PLAYING=0]="PLAYING",e[e.PAUSED=1]="PAUSED",e[e.GAMEOVER=2]="GAMEOVER"}(i||(i={}));class O extends Phaser.Scene{constructor(){super({key:"GameScene"})}init(){this.physics.world.setFPS(144),this.sound.stopAll(),this.sound.add("gameBGM",{loop:!0,volume:.3}).play(),this.anims.get("explosion")||this.anims.create({key:"explosion",frames:[{key:"explosion1"},{key:"explosion2"},{key:"explosion3"},{key:"explosion4"},{key:"explosion5"}],frameRate:30,repeat:0}),this.score=0}create(){this.map=this.make.tilemap({key:"levelMap"}),this.tileset=this.map.addTilesetImage("tiles"),this.layer=this.map.createLayer("tileLayer",this.tileset,0,0),this.layer.setCollisionByProperty({collide:!0}),this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.obstacles=this.add.group({runChildUpdate:!0}),this.enemies=this.add.group({}),this.convertObjects(),this.initPhysics(),this.createUI(),this.createMiniMap(),this.cameras.main.fadeIn(500),this.InputHandler=new n(this),this.InputHandler.attach(this.player),this.cameras.main.startFollow(this.player),this.gameState=i.PLAYING}update(){this.gameState===i.PLAYING&&(0===this.enemies.getLength()&&this.gameOver(!0),this.player.update(),this.enemies.getChildren().forEach((e=>{if(e.update(),this.player.active&&e.active&&e instanceof p){var t=Phaser.Math.Angle.Between(e.body.x,e.body.y,this.player.body.x,this.player.body.y);e.getBarrel().angle=(t+Math.PI/2)*Phaser.Math.RAD_TO_DEG}}),this),this.skillUI.updateSkillUI(),this.updateScore())}ignoreOnMiniMap(e){this.miniMap.ignore(e)}pauseGame(){this.gameState=i.PAUSED,this.player.body.setVelocity(0);for(let e=0;e<this.tweens.getTweens().length;e++)this.tweens.getTweens()[e].pause();this.showPausedUI(),this.player.getBullets().getChildren().forEach((e=>{e.body.setVelocity(0)})),this.enemies.getChildren().forEach((e=>{e.getBullets().getChildren().forEach((e=>{e.body.setVelocity(0)}))}))}resumeGame(){this.hidePausedUI(),this.gameState=i.PLAYING;for(let e=0;e<this.tweens.getTweens().length;e++)this.tweens.getTweens()[e].resume();this.player.getBullets().getChildren().forEach((e=>{this.physics.velocityFromRotation(e.rotation-Math.PI/2,800,e.body.velocity)})),this.enemies.getChildren().forEach((e=>{e.getBullets().getChildren().forEach((e=>{this.physics.velocityFromRotation(e.rotation-Math.PI/2,800,e.body.velocity)}))}))}gameOver(e){this.player.body&&this.physics.world.remove(this.player.body);for(let e=0;e<this.tweens.getTweens().length;e++)this.tweens.getTweens()[e].pause();let t;if(this.player.setActive(!1),this.UIContainer.disableInteractive(),this.pausedUI.disableInteractive(),this.sound.stopAll(),e?this.sound.add("victory",{loop:!1,volume:.3}).play():this.sound.add("defeat",{loop:!1,volume:.3}).play(),this.gameState=i.GAMEOVER,this.gameOverUI=new S(this,0,0),this.gameOverUI.setScore(this.score),this.gameOverUI.setTitle(e?"VICTORY":"GAME OVER"),this.ignoreOnMiniMap(this.gameOverUI),this.gameOverUI.setAlpha(0),e){let e=this.add.image(C.width/2,C.height/2,"victory").setScale(0).setDisplaySize(600,500).setScrollFactor(0).setDepth(5);this.ignoreOnMiniMap(e),t=this.tweens.chain({targets:e,tweens:[{scale:1,ease:Phaser.Math.Easing.Elastic.Out,duration:500},{y:C.height/4,ease:Phaser.Math.Easing.Sine.In,duration:500}]})}else{let e=this.add.image(C.width/2,C.height/2,"defeat").setScale(0).setDisplaySize(600,500).setScrollFactor(0).setDepth(5);this.ignoreOnMiniMap(e),t=this.tweens.chain({targets:e,tweens:[{scale:1,ease:Phaser.Math.Easing.Elastic.Out,duration:500},{y:C.height/4,ease:Phaser.Math.Easing.Sine.In,duration:500}]})}this.tweens.add({targets:this.gameOverUI,alpha:1,duration:1e3,delay:1e3,ease:"Sine.easeInOut"}).on(Phaser.Tweens.Events.TWEEN_COMPLETE,(()=>{this.gameOverUI.setInteractive()}))}convertObjects(){this.map.getObjectLayer("objects").objects.forEach((e=>{if("player"===e.type)this.player=new c({scene:this,x:e.x,y:e.y,texture:"tankBlue"});else if("enemy"===e.type){let t=new p({scene:this,x:e.x,y:e.y,texture:"tankRed"});this.enemies.add(t)}else{let t=new u({scene:this,x:e.x,y:e.y-40,texture:e.type});this.obstacles.add(t)}}))}initPhysics(){this.physics.add.collider(this.player,this.layer),this.physics.add.collider(this.player,this.obstacles),this.physics.add.collider(this.player.getBullets(),this.layer,this.bulletHitLayer,void 0,this),this.physics.add.collider(this.player.getBullets(),this.obstacles,this.bulletHitObstacles,void 0,this),this.enemies.getChildren().forEach((e=>{this.physics.add.overlap(this.player.getBullets(),e,this.playerBulletHitEnemy,void 0,this),this.physics.add.overlap(e.getBullets(),this.player,this.enemyBulletHitPlayer,void 0),this.physics.add.collider(e.getBullets(),this.obstacles,this.bulletHitObstacles,void 0),this.physics.add.collider(e.getBullets(),this.layer,this.bulletHitLayer,void 0)}),this)}createUI(){this.UIContainer=new f(this,0,0),this.scoreText=this.UIContainer.addText(10,10,"Score: 0",{fontSize:"50px",color:"#fff",fontStyle:"bold"}),this.events.on("updateScore",(()=>{this.scoreText.setText("Score: "+this.score)})),this.skillUI=new P(this,0,0,this.player),this.pausedUI=new b(this,0,0),this.hidePausedUI()}createMiniMap(){this.miniMap=this.cameras.add(C.width-300,C.height-200,300,200).setZoom(.1).setName("miniMap"),this.miniMap.ignore(this.UIContainer),this.miniMap.ignore(this.pausedUI),this.miniMap.startFollow(this.player,!0,.5,.5),this.miniMap.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.miniMap.setBackgroundColor(0),this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_START,(()=>{this.miniMap.fadeOut(500)})),this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_IN_START,(()=>{this.miniMap.fadeIn(500)}))}bulletHitLayer(e){e instanceof h&&e.destroy()}bulletHitObstacles(e,t){e instanceof h&&t instanceof u&&e.destroy()}enemyBulletHitPlayer(e,t){e instanceof h&&t instanceof c&&(e.destroy(),t.updateHealth(-.05))}playerBulletHitEnemy(e,t){e instanceof h&&t instanceof p&&(this.score+=10,this.events.emit("updateScore"),t.updateHealth(),e.destroy())}hidePausedUI(){this.pausedUI.disableInteractive(),this.tweens.add({targets:this.pausedUI,y:C.height,alpha:0,duration:150,ease:"Sine.easeInOut"}).on(Phaser.Tweens.Events.TWEEN_COMPLETE,(()=>{this.UIContainer.setVisible(!0),this.UIContainer.setInteractive()}))}showPausedUI(){this.UIContainer.disableInteractive(),this.UIContainer.setVisible(!1),this.tweens.add({targets:this.pausedUI,y:0,alpha:1,duration:200,ease:"Power3"}).on(Phaser.Tweens.Events.TWEEN_COMPLETE,(()=>{this.pausedUI.setInteractive()}))}updateScore(){let e=localStorage.getItem("highscore");e?this.score>parseInt(e)&&localStorage.setItem("highscore",this.score.toString()):(console.log("setting highscore"),localStorage.setItem("highscore",this.score.toString()))}}class T extends Phaser.Scene{constructor(){super({key:"MenuScene"}),this.bitmapTexts=[]}init(){this.add.image(0,0,"background").setOrigin(0).setDisplaySize(C.width,C.height),this.sound.stopAll(),this.sound.play("menuBGM",{loop:!0,volume:.3})}create(){this.UIContainer=new g(this,0,0);let e=new x({scene:this,x:0,y:0,texture:"playTextDefault"},"playTextHover");this.UIContainer.addButton(e),Phaser.Display.Align.In.Center(e,this.UIContainer.DisplayZone,0,100);let t=this.UIContainer.addImage(0,0,"banner").setOrigin(.5,.5);Phaser.Display.Align.In.Center(t,this.UIContainer.DisplayZone,0,-150),this.UIContainer.setY(C.height+this.UIContainer.height),this.UIContainer.disableInteractive(),this.tweens.add({targets:this.UIContainer,y:0,duration:1e3,ease:"Power3"}).on("complete",(()=>{this.UIContainer.setInteractive()}))}update(){}}const C={title:"Tank",version:"0.0.1",width:1600,height:1200,zoom:1,type:Phaser.AUTO,parent:"game",scene:[a,T,O],input:{keyboard:!0},physics:{default:"arcade",arcade:{gravity:{x:0,y:0}}},backgroundColor:"#000000",render:{antialias:!0},scale:{mode:Phaser.Scale.ScaleModes.FIT,autoCenter:Phaser.Scale.Center.CENTER_BOTH}};class D extends Phaser.Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new D(C)}))}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var h=s[e]={exports:{}};return t[e].call(h.exports,h,h.exports,i),h.exports}i.m=t,e=[],i.O=(t,s,a,h)=>{if(!s){var n=1/0;for(d=0;d<e.length;d++){for(var[s,a,h]=e[d],o=!0,r=0;r<s.length;r++)(!1&h||n>=h)&&Object.keys(i.O).every((e=>i.O[e](s[r])))?s.splice(r--,1):(o=!1,h<n&&(n=h));if(o){e.splice(d--,1);var l=a();void 0!==l&&(t=l)}}return t}h=h||0;for(var d=e.length;d>0&&e[d-1][2]>h;d--)e[d]=e[d-1];e[d]=[s,a,h]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,h,[n,o,r]=s,l=0;if(n.some((t=>0!==e[t]))){for(a in o)i.o(o,a)&&(i.m[a]=o[a]);if(r)var d=r(i)}for(t&&t(s);l<n.length;l++)h=n[l],i.o(e,h)&&e[h]&&e[h][0](),e[h]=0;return i.O(d)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[96],(()=>i(15)));a=i.O(a)})();