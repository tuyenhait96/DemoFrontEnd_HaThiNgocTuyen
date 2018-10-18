/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\Levels\Level.ts"/>
///<reference path="..\Levels\KillerCollection.ts"/>
///<reference path="Monkey.ts"/>
module MonkeyRun{
    export enum Zom3States {IDLE, RUNNING, SHOTGUN_DEATH,
    GRENADE_DEATH, KNIFE_DEATH, THROWN_BY_GMO, DEAD};

    export class Zom3 {
        game: Phaser.Game;
        states:Phaser.Sprite;
        states2:Phaser.Sprite;
        monkey:Monkey;

        velocity:number;
        currentState: Zom3States;
        isDead:boolean;
        bloodThrown:boolean;

        constructor(game:Phaser.Game, velocity){
            this.game = game;
            this.velocity = velocity;
            this.currentState = Zom3States.RUNNING;
            this.isDead = false;
            this.bloodThrown = false;


            this.states = this.game.add.sprite(1300,400, "Zom2");
            this.states.animations.add("attack", [34,35,36,37,38,39], 14);
            this.states.animations.add("knifeDeath", [6,7,8,9,10,11,12,13], 20);
            this.states.animations.add("grenadeDeath", [0, 1, 2, 3, 4], 30);
            this.states.animations.add("idle", [19,20,21,22], 14);
            this.states.animations.add("run", [34,35,36,37,38,39], 14);
            this.states.animations.add("shotgunDeath", [6,7,8,9,10,11,12,13], 30);
            this.states.scale.set(-1,1);//-1 đi bên phải,+1 đi qua trái,độ rộng của khung đỏ
            this.states.anchor.set(0.5,0.5);
            this.game.physics.arcade.enable(this.states);
            this.states.body.setSize(100,100,-50,10);
            this.states.body.fixedRotation = true;
            this.states.body.gravity.y=1000;


            this.states2 = this.game.add.sprite(1300, 400, "Zom2");
            this.states2.animations.add("gmo_death", [6,7,8,9,10,11,12,13],20);
            this.states2.animations.add("sawDeath", [6,7,8,9,10,11,12,13],20);
            this.states2.scale.set(-1,1);
            this.states2.anchor.set(0.5,0.5);
            this.states2.alpha = 0;
            this.states.health=10000;

            if(Math.random()<0.5){
                this.states.animations.play("run",null,true);
            }
            else{
                this.states.animations.play("attack",null, true);
            }


            var randomAnimation = Math.random();

            var positionTween = this.game.add.tween(this.states.position);
            if(Math.random()<0.5){
                // //Vị trí di chuyển
                //
                positionTween.to({x:400,y:100}, 3000, Phaser.Easing.Quintic.Out, true, 0,999 , true);
                // //Duration thời gian di chuyển giữa các lần,x:vị trí di chuyển tới,y:vị trí di chuyển tới
            }
            else{
                positionTween.to({x:500,y:500}, 3000, Phaser.Easing.Quintic.Out, true, 0,999 , true);
            }

            // var alphaTween = this.game.add.tween(this.states);
            // alphaTween.to({alpha : 0.5}, 500, Phaser.Easing.Default, true, 0,4 , true);//Làm mờ hình banh

            // //Vị trí di chuyển
            //
            // positionTween.to({x:400,y:100}, 3000, Phaser.Easing.Quintic.Out, true, 0,999 , true);
            // //Duration thời gian di chuyển giữa các lần,x:vị trí di chuyển tới,y:vị trí di chuyển tới
        }

        update(currentLevel:Level, killerCollection:KillerCollection, Zom3List:Array<Zom3>,monkey:Monkey,
               thrownItems:Array<Phaser.Sprite>,pickUpItems:Array<Phaser.Sprite>, difficulty:Difficulty){
            this.states.position.x -= this.velocity;
            this.game.physics.arcade.collide(this.states,currentLevel.ground.image);
            this.game.physics.arcade.collide(this.states,currentLevel.ground.secondImage);

            this.Zom3MonkeyCollision(monkey, killerCollection);
            this.Zom3ItemCollision(thrownItems, killerCollection, pickUpItems, difficulty);
            this.shotgunAndSawDeath(killerCollection);
            this.gmoBlood(killerCollection);
            this.removeZom3FromGame(killerCollection, Zom3List);
            this.endBoss();


            // var positionTween = this.game.add.tween(this.states.position);
            // if(Math.random()<0.5){
            //     // //Vị trí di chuyển
            //     //
            //     positionTween.to({x:400,y:100}, 3000, Phaser.Easing.Quintic.Out, true, 0,999 , true);
            //     // //Duration thời gian di chuyển giữa các lần,x:vị trí di chuyển tới,y:vị trí di chuyển tới
            // }
            // else{
            //     positionTween.to({x:500,y:500}, 3000, Phaser.Easing.Quintic.Out, true, 0,999 , true);
            // }
        }
        changeToAttack(){
            this.states.animations.play("attack",null,false)
                .onComplete.add(()=>{

                this.states.animations.play("run",null,true);
            });
        }

        Zom3MonkeyCollision(monkey:Monkey, killerCollection:KillerCollection){
            if(IS_CHEATING == true)
                return;
            this.game.physics.arcade.overlap(this.states, monkey.states, ()=>{
                if(monkey.currentState !==MonkeyStates.GMO){
                    this.changeToAttack();
                    // monkey.die();
                    killerCollection.gameOver = true;
                }
                else if (this.currentState !==Zom3States.THROWN_BY_GMO){
                    this.thrownByGMO();
                }
            }, null, this);
        }

        deathByItem(key,difficulty:Difficulty){
            this.states.animations.play(key+"attack",null,false);
            // this.isDead = true;
            this.states.body.setSize(0,0,0,20);

            if(key === "grenade"){
                    this.states.health=this.states.health-2000;
                    console.log("MÁU BOSS:"+this.states.health);


                // if()
                // this.states.animations.currentAnim.onComplete.add(()=>{
                //     this.states.alpha = 0;
                //     this.currentState = Zom3States.GRENADE_DEATH;
                // },this);
            }

            // else if (key === "knife"){
            //     this.currentState = Zom3States.KNIFE_DEATH;
            //     this.velocity = difficulty.levelSpeed;
            // }
            // else if (key === "shotgun"){
            //     this.currentState = Zom3States.SHOTGUN_DEATH;
            //     this.states.animations.currentAnim.onComplete.add(()=>{
            //         this.states.bringToTop();
            //         this.velocity = difficulty.levelSpeed;
            //     },this);
            // }
        }
        endBoss(){
            if(this.states.health===0)
            {
                this.states.animations.currentAnim.onComplete.add(()=>{
                        this.states.alpha = 0;
                        this.currentState = Zom3States.GRENADE_DEATH;
                    },this);
            }
        }

        Zom3ItemCollision(thrownItems:Array<Phaser.Sprite>, killerCollection:KillerCollection, pickUpItems:Array<Phaser.Sprite>, difficulty:Difficulty){
            thrownItems.forEach((item)=>{
                this.game.physics.arcade.overlap(item, this.states, ()=>{
                    killerCollection.updateKillsText();
                    this.deathByItem(item.key,difficulty);
                    thrownItems.splice(thrownItems.indexOf(item),1);
                    item.destroy();

                    var position = this.states.body;
                    var offset = 100;
                    if(item.key === "grenade"){
                        killerCollection.boneEmitter.start(position.x+offset, position.y - offset+10,true,2000,Math.abs(RNG(1,4)));
                    }

                    killerCollection.bloodEmitter.start(position.x+offset, position.y - offset+10,true,800,50);

                    var shouldThrowKnifeRNG = Math.random();
                    if(shouldThrowKnifeRNG<0.7){
                        pickUpItems.push(this.spawnPickUpKnife(position.x+offset,position.y-offset));
                    }
                },null,this);
            },this);
        }

        spawnPickUpKnife(x:number, y:number){
            var knife = this.game.add.sprite(x,y,"knife");
            this.game.physics.arcade.enable(knife);
            knife.anchor.set(0.5,0.5);
            knife.body.velocity.y = -500;
            knife.body.mass = 0;
            knife.body.collideWorldBounds = false;
            knife.body.setSize(20,30,0,0);

            return knife;
        }

        shotgunAndSawDeath(killerCollection:KillerCollection){
            if(this.states.body.x<100 && this.currentState === Zom3States.SHOTGUN_DEATH){

                this.states.alpha = 0;
                this.states.body.setSize(0,0);
                this.states2.alpha = 1;
                this.states2.position.x = this.states.position.x;
                this.states2.position.y = this.states.position.y;

                var positionTween = this.game.add.tween(this.states2.position);
                positionTween.to({x:-500},2000, Phaser.Easing.Default,true);
                killerCollection.killerGroup.bringToTop(this.states2);

                this.states2.animations.play("sawDeath",null,false);

            }
            if(this.states2.alpha ===1){
                this.states2.rotation -=0.02;
            }

            if(this.states2.alpha === 1 &&
                this.states2.position.x<200 &&
                !this.bloodThrown &&
                this.currentState!== Zom3States.THROWN_BY_GMO){
                this.bloodThrown = true;
                killerCollection.killerGroup.bringToTop(killerCollection.bloodEmitter.emitter);
                killerCollection.bloodEmitter.start(70,480,true,800,50);
                killerCollection.killerGroup.bringToTop(this.states2);
                killerCollection.secondSaw.triggerSaw();
                killerCollection.updateKillsText();
            }
        }

        gmoBlood(killerCollection:KillerCollection){
            if(this.states2.alpha ===1 &&
                this.states2.position.x<200 &&
                !this.bloodThrown &&
                this.currentState ===Zom3States.THROWN_BY_GMO){
                this.bloodThrown = true;
                killerCollection.updateKillsText();
                killerCollection.killerGroup.bringToTop(killerCollection.bloodEmitter.emitter);
                killerCollection.bloodEmitter.start(70,80,true, 800, 400);
                killerCollection.killerGroup.sendToBack(this.states2);
                killerCollection.firstSaw.triggerSaw();

            }
        }
        thrownByGMO(){
            this.game.physics.arcade.enable(this.states2);
            this.states.alpha = 0;
            this.states.body.setSize(0,0);
            this.states2.alpha = 1;
            this.states2.position.x = this.states.position.x;
            this.states2.position.y = this.states.position.y;
            this.states2.animations.play("gmo_death",null,true);
            this.states2.body.velocity.y = -1200;
            this.states2.body.velocity.x = -500;

            this.currentState = Zom3States.THROWN_BY_GMO;
        }

        removeZom3FromGame(killerCollection:KillerCollection, Zom3List:Array<Zom3>){
            if(this.states.position.x<-200 || this.states2.position.x<-200){
                this.currentState = Zom3States.DEAD;
            }

            if(this.currentState === Zom3States.DEAD || this.currentState === Zom3States.GRENADE_DEATH){
                killerCollection.killerGroup.remove(this.states);
                killerCollection.killerGroup.remove(this.states2);
                Zom3List.splice(Zom3List.indexOf(this),1);
                this.states.destroy();
                this.states2.destroy();

            }

        }
    }
}