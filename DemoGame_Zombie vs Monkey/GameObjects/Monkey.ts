/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\GraphicUtils\ParallaxBackground.ts"/>
///<reference path="Zom1.ts"/>
///<reference path="Zom2.ts"/>
///<reference path="..\Levels\KillerCollection.ts"/>
///<reference path="..\Levels\KillerCollection.ts"/>
module MonkeyRun {
    export enum MonkeyStates {IDLE, RUNNING, JUMPING, DOUBLE_JUMPING, PICKING_ITEM, THROWING_ITEM,
    GMO, THROWING_ZOMBIE, DEAD}

    export class Monkey {
        game:Phaser.Game;
        states:Phaser.Sprite;
        states2:Phaser.Sprite;
        states3:Phaser.Sprite;
        currentState:MonkeyStates;
        inputBG:Phaser.Sprite;
        monkeyHead:Phaser.Sprite;
        spaceKey:Phaser.Key;
        monkeyAlreadyPushed:boolean;//Đẩy monkey lên từ từ
        monkeyMovingRight:boolean;
        killerCollection:KillerCollection;
        jumpSound: Phaser.Sound;
        dieHealthSound: Phaser.Sound;
        pickupKnifeSound: Phaser.Sound;
        constructor(game:Phaser.Game) {
            this.game = game;
            this.currentState = MonkeyStates.RUNNING;

            this.states = this.game.add.sprite(300, 400, "Monkey");
            this.states.animations.add("doubleJump", [0, 1, 2, 3, 4], 30);
            this.states.animations.add("GMO", [56,57,58, 59,60,61,62,63,64,65,66], 30);
            this.states.animations.add("idle", [12,13,14,15,16], 14);
            this.states.animations.add("jump", [17,18,19,20,21], 13);
            this.states.animations.add("run", [22,23,24,25,26,27,28,29], 18);
            this.states.animations.add("shotgun", [52,53,54,55], 25);
            this.states.animations.add("throwKnife", [48,49,50,51], 25);
            this.states.animations.add("throwGrenade", [44,45,46,47], 25);
            this.states.animations.add("transformGMO", [56,57,58, 59,60,61,62,63,64,65,66], 30);
            this.states.animations.play("run",null,true);

            this.game.physics.arcade.enable(this.states);
            this.states.anchor.set(0.5, 0.5);
            this.states.body.setSize(100,100,25, 8);// set cái khó hinh đỏ khi k có 25, -50,vị trí hình ảnh spirte
            this.states.body.fixedRotation = true;
            this.states.body.gravity.y = 1000;


            this.states2 = this.game.add.sprite(300,300, "Monkey");
            this.states2.animations.add("pickupKnife", [1,4], 15);
            this.states2.animations.add("dying", [6,7,8,9,10,11], 15);

            // this.states3 = this.game.add.sprite(300,300, "Monkey3");
            // this.states3.animations.add("shotgun", [30, 31, 32, 33, 34], 30);
            // this.states3.animations.add("throwKnife", [0, 1, 2, 3, 4], 30);
            // this.states3.animations.add("throwGrenade", [0, 1, 2, 3, 4], 30);

            this.states2.alpha = 0;
            this.states2.anchor.set(0.5, 0.5);

            this.inputBG = this.game.add.sprite(0, 0, "");
            this.inputBG.alpha = 0;
            this.inputBG.width = 1280;
            this.inputBG.height = 720;
            this.inputBG.inputEnabled = true;
            this.inputBG.input.priorityID = 0;
            this.inputBG.events.onInputDown.addOnce(this.jump, this);
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spaceKey.onDown.addOnce(this.jump, this);

            this.monkeyAlreadyPushed = false;
            this.monkeyMovingRight = false;
            this.states.health=3;
            this.killerCollection = new KillerCollection(this.game);
            this.jumpSound = this.game.add.audio("jumpSound");

        }

        update(ground:ParallaxBackground, killerCollection:KillerCollection) {
            if (this.currentState === MonkeyStates.RUNNING) {
                this.states.animations.play("run");
                this.inputBG.events.onInputDown.addOnce(this.jump, this);
                this.spaceKey.onDown.addOnce(this.jump, this);

            }

            if (this.states.animations.currentAnim.loopCount === 10 && this.currentState === MonkeyStates.GMO) {
                this.states.body.immovable = false;
                this.states.body.moves = true;
                this.currentState = MonkeyStates.RUNNING;
            }
            this.game.physics.arcade.collide(this.states, ground.image, this.changeToRunning, null, this);
            this.game.physics.arcade.collide(this.states, ground.secondImage, this.changeToRunning, null, this);

            if (this.states.position.x < 100) {
                this.die();
                killerCollection.gameOver = true;
            }
            this.monkeyPushedFixPosition();

        }

        private monkeyPushedFixPosition() {
            if (this.states.position.x < 300 && !this.monkeyAlreadyPushed) {
                this.monkeyAlreadyPushed = true;
                this.game.time.events.add(5000, ()=> {
                    this.monkeyMovingRight = true;
                });
            }

            if (this.monkeyMovingRight) {
                this.states.position.x += 0.25;
            }
            if (this.states.position.x >= 300) {
                this.monkeyMovingRight = false;
                this.monkeyAlreadyPushed = false;
            }
        }
        endGame(){
            // if(this.states.health===0)
            // {
            //
            //
            //     this.currentState = MonkeyStates.DEAD;
            //
            //     var maximumScore = localStorage.getItem("maxScore");
            //
            //     if(maximumScore===null){
            //         localStorage.setItem("maxScore",this.killerCollection.score.toString());
            //         maximumScore = this.killerCollection.score.toString();
            //     }
            //     else{
            //         if(parseInt(maximumScore)<=this.killerCollection.score){
            //             maximumScore = this.killerCollection.score.toString();
            //             localStorage.setItem("maxScore",this.killerCollection.score.toString());
            //         }
            //     }
            //
            //     this.game.time.events.add(2000, ()=>{
            //         this.game.state.start("GameOver",false,false, this.killerCollection.score, maximumScore);
            //     },this);
            // }
        }
        jump() {
            if (this.currentState === MonkeyStates.RUNNING || this.currentState === MonkeyStates.PICKING_ITEM || this.currentState=== MonkeyStates.GMO ) {
                this.states2.alpha = 0;
                this.states.alpha = 1;
                this.states.body.velocity.y = -1100;
                this.currentState = MonkeyStates.JUMPING;
                this.states.animations.play("jump", null, false);
                this.inputBG.events.onInputDown.addOnce(this.doubleJump, this);
                this.spaceKey.onDown.addOnce(this.doubleJump, this);
                this.jumpSound.play();

            }
        }

        doubleJump() {
            if (this.currentState === MonkeyStates.JUMPING) {
                this.currentState = MonkeyStates.DOUBLE_JUMPING;
                this.states.body.velocity.y = -1000;
                this.states.animations.play("doubleJump", null, false);
                this.jumpSound.play();
            }
        }

        changeToRunning() {
            if (this.currentState === MonkeyStates.JUMPING || this.currentState === MonkeyStates.DOUBLE_JUMPING) {
                this.currentState = MonkeyStates.RUNNING;
            }
        }

        changeAnimationRepeating(key:string) {
            this.states.animations.play(key, null, true);
        }

        changeAnimation(key:string) {
            this.states.animations.play(key, null, false).
            onComplete.addOnce(()=> {
                this.states.animations.play("run", null, true);
                this.currentState = MonkeyStates.RUNNING
            });
        }

        spawnGrenade() {
            var grenade = this.game.add.sprite(this.states.body.x + 40, this.states.body.y - 40, "grenade");
            this.game.physics.arcade.enable(grenade);
            grenade.anchor.set(0.5, 0.5);
            grenade.body.velocity.x = 1500;
            grenade.body.velocity.y = -400;

            grenade.body.setSize(1, 200, -100, 80);
            grenade.body.mass = 1000;

            return grenade;
        }

        spawnKnife() {
            var knife = this.game.add.sprite(this.states.body.x + 40, this.states.body.y - 40, "knife");
            this.game.physics.arcade.enable(knife);
            knife.anchor.set(0.5, 0.5);
            knife.body.velocity.x = 800;
            knife.body.velocity.y = -500;
            knife.body.mass = 0;
            knife.body.setSize(1, 200, -100, 80);
            return knife;
        }


        shootShotgun(zom1List: Array<Zom1>,zom2List: Array<Zom2>, killerCollection : KillerCollection, pickUpItems : Array<Phaser.Sprite>, difficulty:Difficulty) {

            for (var i = 0; i < zom1List.length; i++) {
                var zo1 = zom1List[i];
                if (Math.abs(this.states.position.y - zo1.states.position.y) <= 80 &&
                    this.states.position.x < zo1.states.position.x &&
                    zo1.currentState !== Zom1States.SHOTGUN_DEATH) {
                    var position = zo1.states.body;
                    var offset = 100;
                    killerCollection.bloodEmitter.start(position.x + offset, position.y, true, 800, 50);
                    zo1.deathByItem("shotgun",difficulty);
                    pickUpItems.push(zo1.spawnPickUpKnife(position.x + offset, position.y - offset));
                    break;
                }
            }
            for (var i = 0; i < zom2List.length; i++) {
                var zom2 = zom2List[i];
                if (Math.abs(this.states.position.y - zom2.states.position.y) <= 80 &&
                    this.states.position.x < zom2.states.position.x &&
                    zom2.currentState !== Zom2States.SHOTGUN_DEATH) {
                    var position = zom2.states.body;
                    var offset = 100;
                    killerCollection.bloodEmitter.start(position.x + offset, position.y, true, 800, 50);
                    zom2.deathByItem("shotgun",difficulty);
                    pickUpItems.push(zom2.spawnPickUpKnife(position.x + offset, position.y - offset));
                    break;
                }
            }


        }

        pickUpGMO() {
            this.currentState = MonkeyStates.GMO;
            this.states.animations.play("transformGMO", null, false).
            onComplete.add(()=> {
                this.states.animations.play("GMO", null, true);
            });
        }

        pickUpKnife() {
            this.states.alpha = 0;
            this.states2.alpha = 1;
            this.states2.position.x = this.states.position.x;
            this.states2.position.y = 530;
            this.states2.animations.play("pickupKnife", null, false);
            this.pickupKnifeSound = this.game.add.sound("pickupKnifeSound");
            this.pickupKnifeSound.play();
            this.states2.animations.currentAnim.onComplete.addOnce(()=> {
                this.states.alpha = 1;
                this.states2.alpha = 0;
            }, this);


        }

        die() {
            this.states.alpha = 0;
            this.states2.alpha = 1;
            this.states2.position.x = this.states.position.x;
            this.states2.position.y = this.states.position.y;
            this.states2.animations.play("dying", null, false);
            // this.monkeyHead = this.game.add.sprite(this.states2.position.x, this.states2.position.y, "MonkeyHead");
            // this.monkeyHead.anchor.set(0.5, 0.5);
            // this.game.physics.enable(this.monkeyHead);
            // this.monkeyHead.body.velocity.y = -800;
            // this.monkeyHead.body.velocity.x = 30;
            // this.monkeyHead.body.mass = 1000;
            // this.monkeyHead.body.bounce.set(0.3);
            this.dieHealthSound = this.game.add.sound("dieHealthSound");
            this.dieHealthSound.play();
        }
    }
}
