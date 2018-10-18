/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\Levels\KillerCollection.ts"/>
///<reference path="..\Levels\Level.ts"/>
///<reference path="..\Levels\LevelOne.ts"/>
///<reference path="..\Levels\LevelTwo.ts"/>
///<reference path="..\GraphicUtils\ItemButton.ts"/>
///<reference path="..\GameObjects\Monkey.ts"/>
///<reference path="..\GameObjects\Difficulty.ts"/>
///<reference path="..\GameObjects\Chest.ts"/>
///<reference path="..\GameObjects/Zom2.ts"/>
///<reference path="..\GameObjects/Zom1.ts"/>
///<reference path="..\GameObjects/Boss.ts"/>
// FLAG IN GAME
let IS_CHEATING: boolean = false; // true ::: BAT TU

module MonkeyRun {
    export class Game extends Phaser.State {
        currentDifficulty:Difficulty;
        difficulties:Array<Difficulty>;
        shouldChangeDifficulty:boolean;

        currentLevel:Level;
        levelOne:LevelOne;
        levelTwo:LevelTwo;
        killerCollection:KillerCollection;

        knifeButton:ItemButton;
        grenadeButton:ItemButton;
        gmoButton:ItemButton;
        shotgunButton:ItemButton;

        monkey:Monkey;
        zom1List:Array<Zom1>;
        Zom2list: Array<Zom2>;
        Zom3list: Array<Zom3>;

        topGroup:Phaser.Group;
        thrownItems:Array<Phaser.Sprite>;
        pickUpItems:Array<Phaser.Sprite>;
        chestItems:Array<Chest>;

        randomChestsSpawnTime:number;
        randomZom1SpawnTime:number;
        randomZom2SpawnTime:number;
        randomZom3SpawnTime:number;

        text:Phaser.Text;
        pause_label: Phaser.Text;
        upKey:Phaser.Key;

        gmoSound:Phaser.Sound;
        grenadeSound:Phaser.Sound;
        shotgunSound:Phaser.Sound;
        knifeSound:Phaser.Sound;
        level1Sound: Phaser.Sound;
        level2Sound: Phaser.Sound;
        constructor() {
            super();

        }

        create() {

            //ground
            this.difficulties = [];
            this.difficulties.push(new Difficulty(0, 10, 20, 1000, 6000, 3, 1500, 3000, 4500, 8000,  800, 5000, 5,800, 5000, 6, 5));
            this.difficulties.push(new Difficulty(1, 8, 15, 1000, 4500, 4, 1000, 2200, 3500, 6500,  800, 3500, 5,800, 5000, 7, 5));
            this.difficulties.push(new Difficulty(2, 6, 10, 500, 4000, 5, 800, 1800, 2500, 5000,  300, 3000, 6,800, 5000, 9, 6));
            this.difficulties.push(new Difficulty(3, 5, 8, 500, 3000, 6, 800, 1800, 1800, 4000,  300, 2500, 7,800, 5000, 11, 6));
            this.difficulties.push(new Difficulty(4, 4, 20, 1000, 6000, 7, 1500, 3000, 4500, 8000,  800, 5000, 8,800, 5000, 6, 7));
            this.difficulties.push(new Difficulty(5, 3, 15, 1000, 4500,8, 1000, 2200, 3500, 6500,  800, 3500, 8,800, 5000, 7, 8));
            this.currentDifficulty = this.difficulties[0];
            this.shouldChangeDifficulty = true;
            console.log(this.currentDifficulty);

            this.levelOne = new LevelOne(this.game);
            this.levelOne.create(this.currentDifficulty);
            this.levelTwo = new LevelTwo(this.game);
            this.levelTwo.create(this.currentDifficulty);
            this.currentLevel = this.levelTwo;
            this.killerCollection = new KillerCollection(this.game);
            this.killerCollection.create();

            this.monkey = new Monkey(this.game);

            this.zom1List = [];
            this.randomZom1SpawnTime = this.game.time.now;

            this.Zom2list = [];
            this.randomZom2SpawnTime = this.game.time.now;

            this.Zom3list = [];
            this.randomZom3SpawnTime = this.game.time.now;

            this.thrownItems = [];
            this.pickUpItems = [];
            this.chestItems = [];
            this.randomChestsSpawnTime = this.game.time.now + Phaser.Timer.SECOND * 3;
            this.randomZom2SpawnTime = this.game.time.now + Phaser.Timer.SECOND * 5;
            this.randomZom3SpawnTime = this.game.time.now + Phaser.Timer.SECOND * 5;
            this.randomZom1SpawnTime = this.game.time.now + Phaser.Timer.SECOND * 10;


            this.grenadeButton = new ItemButton(this.game, 1200, 650, "grenadeButton", 99, this.monkey, "throwGrenade");
            this.shotgunButton = new ItemButton(this.game, 1100, 650, "shotgunButton", 8, this.monkey, "shotgun");
            this.knifeButton = new ItemButton(this.game, 1000, 650, "knifeButton", 0, this.monkey, "throwKnife");
            this.gmoButton = new ItemButton(this.game, 800, 650, "gmoButton", 80, this.monkey, "gmo");

            this.topGroup = this.game.add.group();
            this.topGroup.addMultiple([this.grenadeButton, this.grenadeButton.spriteBW, this.grenadeButton.ammoText,
                this.shotgunButton, this.shotgunButton.spriteBW, this.shotgunButton.ammoText,
                this.knifeButton, this.knifeButton.spriteBW, this.knifeButton.ammoText,
                this.gmoButton, this.gmoButton.spriteBW, this.gmoButton.ammoText,]);
            this.topGroup.addMultiple([this.monkey.states, this.monkey.states2]);
            this.game.world.bringToTop(this.levelOne.levelGroup);
            this.game.world.bringToTop(this.killerCollection.killerGroup);
            this.game.world.bringToTop(this.topGroup);
            this.triggerLevel(0);

            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);

            this.gmoSound = this.game.add.audio("gmoSound");
            this.grenadeSound = this.game.add.audio("grenadeSound");
            this.shotgunSound = this.game.add.audio("shotgunSound");
            this.knifeSound = this.game.add.audio("knifeSound");
            this.level1Sound = this.game.add.audio("level1Sound");
            this.level2Sound = this.game.add.audio("level2Sound");
            this.game.sound.stopAll();
            this.level1Sound.play();
        }

        update() {
            if (!this.killerCollection.gameOver) {
                this.currentLevel.update(this.killerCollection, this.monkey, this.currentDifficulty);
                this.killerCollection.update();
                this.monkey.update(this.currentLevel.ground,this.killerCollection);

                this.zom1List.forEach((zo1)=> {
                    zo1.update(this.currentLevel, this.killerCollection, this.zom1List, this.monkey,
                        this.thrownItems, this.pickUpItems, this.currentDifficulty);
                });

                this.Zom2list.forEach((Zom2) => {
                    Zom2.update(this.currentLevel, this.killerCollection, this.Zom2list, this.monkey,
                        this.thrownItems, this.pickUpItems,this.currentDifficulty);
                });

                this.Zom3list.forEach((Zom3) => {
                    Zom3.update(this.levelTwo, this.killerCollection, this.Zom3list, this.monkey,
                        this.thrownItems, this.pickUpItems,this.currentDifficulty);
                });

                this.chestItems.forEach((chest)=> {
                    chest.update(this.monkey, this.grenadeButton, this.shotgunButton, this.gmoButton,this.chestItems);
                }, this);
                this.spawnChests();
                this.spawnZom1();
                this.spawnZom2();
                // this.spawnZom3();

                this.pickupItemsUpdate(this.currentDifficulty);
                this.thrownItemsUpdate();
                this.monkeyThrowItems();
                this.updateDifficulties();



                this.game.world.bringToTop(this.killerCollection.killerGroup);
                this.game.world.bringToTop(this.topGroup);
            }

            else {
                if (this.monkey.monkeyHead) {
                    this.game.physics.arcade.collide(this.currentLevel.ground.image, this.monkey.monkeyHead, ()=> {
                        this.monkey.monkeyHead.rotation -= 0.1;
                        this.monkey.monkeyHead.body.velocity.x = 0;
                    });
                    this.game.physics.arcade.collide(this.currentLevel.ground.secondImage, this.monkey.monkeyHead, ()=> {
                        this.monkey.monkeyHead.rotation -= 0.1;
                        this.monkey.monkeyHead.body.velocity.x = 0;
                    });
                    this.monkey.monkeyHead.rotation += 0.1;
                }

            }

            if(this.killerCollection.gameOver && this.monkey.currentState !== MonkeyStates.DEAD ){
                this.gameOver();
            }
        }

        gameOver(){

            this.grenadeButton.inputEnabled = false;
            this.knifeButton.inputEnabled = false;
            this.gmoButton.inputEnabled = false;
            this.shotgunButton.inputEnabled = false;

            this.monkey.currentState = MonkeyStates.DEAD;

            var maximumScore = localStorage.getItem("maxScore");

            if(maximumScore===null){
                localStorage.setItem("maxScore",this.killerCollection.score.toString());
                maximumScore = this.killerCollection.score.toString();
            }
            else{
                if(parseInt(maximumScore)<=this.killerCollection.score){
                    maximumScore = this.killerCollection.score.toString();
                    localStorage.setItem("maxScore",this.killerCollection.score.toString());
                }
            }

            this.killerCollection.bloodEmitter.start(this.monkey.states.position.x, this.monkey.states.position.y - 200, true,2000,30);
            this.game.time.events.add(2000, ()=>{
                this.game.state.start("GameOver",false,false, this.killerCollection.score, maximumScore);
            },this);
        }




        spawnChests() {
            if (this.randomChestsSpawnTime < this.game.time.now) {
                this.randomChestsSpawnTime = this.game.time.now + Math.abs(RNG(this.currentDifficulty.rngChestLow,
                            this.currentDifficulty.rngChestHigh) * 1000);
                var chest = new Chest(this.game);
                this.topGroup.add(chest.chest);
                this.chestItems.push(chest);

            }
        }

        spawnZom1() {
            if (this.randomZom1SpawnTime < this.game.time.now) {
                this.randomZom1SpawnTime = this.game.time.now + RNG(this.currentDifficulty.rngZom1Low,
                    this.currentDifficulty.rngZom1High);
                var zo1 = new Zom1(this.game, this.currentDifficulty.zo1Speed);
                this.killerCollection.killerGroup.addChildAt(zo1.states,6);
                this.killerCollection.killerGroup.addChildAt(zo1.states2,6);
                this.zom1List.push(zo1);
            }
        }
        spawnZom2() {
            if (this.randomZom2SpawnTime < this.game.time.now) {
                this.randomZom2SpawnTime = this.game.time.now + RNG(this.currentDifficulty.rngZom2Low,
                    this.currentDifficulty.rngZom2High);
                var zoombie = new Zom2(this.game, this.currentDifficulty.Zom2Speed);
                this.killerCollection.killerGroup.addChildAt(zoombie.states,6);
                this.killerCollection.killerGroup.addChildAt(zoombie.states2,6);
                this.Zom2list.push(zoombie);
            }
        }
        spawnZom3() {
            if (this.randomZom3SpawnTime < this.game.time.now) {
                this.randomZom3SpawnTime = this.game.time.now + RNG(this.currentDifficulty.rngZom3Low,
                    this.currentDifficulty.rngZom3High);
                var zoombie = new Zom3(this.game, this.currentDifficulty.Zom3Speed);
                this.killerCollection.killerGroup.addChildAt(zoombie.states,6);
                this.killerCollection.killerGroup.addChildAt(zoombie.states2,6);
                this.Zom3list.push(zoombie);
            }
        }

        pauseGameAfterDone(){
            this.game.paused = true;
            var style = {fill: '#990000'};
            this.text = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, "Bạn đã hoàn thành màn chơi!!!\n    Click chuột trái để tiếp tục", style);
            this.text.anchor.set(0.5, 0.5);
            this.text.strokeThickness=10;
            this.text.stroke = '#ffffff';
        }
        updateDifficulties(){
            if(this.killerCollection.score === 5 && this.shouldChangeDifficulty){
                this.game.sound.stopAll();
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.level2Sound.play();
                this.triggerLevel(1);
            }

            else if (this.killerCollection.score === 15  && this.shouldChangeDifficulty){
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.game.sound.stopAll();
                this.level1Sound.play();
                this.triggerLevel(2);

            }
            else if(this.killerCollection.score === 25 && this.shouldChangeDifficulty){
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.game.sound.stopAll();
                this.level2Sound.play();
                this.triggerLevel(3);
            }
            else if(this.killerCollection.score === 35 && this.shouldChangeDifficulty){
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.game.sound.stopAll();
                this.level1Sound.play();
                this.triggerLevel(4);
            }
            else if(this.killerCollection.score === 45 && this.shouldChangeDifficulty){
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.game.sound.stopAll();
                this.level2Sound.play();
                this.triggerLevel(5);
            }
            if(this.killerCollection.score %10 === 1 && this.killerCollection.score>10){
                this.shouldChangeDifficulty=true;
            }
        }

        private monkeyThrowItems() {
            if (this.grenadeButton.buttonPressed || this.upKey.justUp) {
                this.grenadeButton.buttonPressed = false;
                this.thrownItems.push(this.monkey.spawnGrenade());
                    this.grenadeSound.play();
            }
            if (this.knifeButton.buttonPressed) {
                this.knifeButton.buttonPressed = false;
                this.thrownItems.push(this.monkey.spawnKnife());
                    this.knifeSound.play();
            }
            if (this.shotgunButton.buttonPressed) {
                this.shotgunButton.buttonPressed = false;
                this.monkey.shootShotgun(this.zom1List,this.Zom2list, this.killerCollection, this.pickUpItems,this.currentDifficulty);
                    this.shotgunSound.play();
            }
            if (this.gmoButton.buttonPressed) {
                this.gmoButton.buttonPressed = false;
                this.monkey.pickUpGMO();
                    this.gmoSound.play();
            }
        }

        private thrownItemsUpdate() {
            this.thrownItems.forEach((item)=> {
                item.rotation += 0.2;
                if (item.x > this.game.width) {
                    this.thrownItems.splice(this.thrownItems.indexOf(item, 1));
                    item.destroy();
                }
            })
        }

        private pickupItemsUpdate(difficulty:Difficulty) {
            this.pickUpItems.forEach((item)=> {
                item.rotation -= 0.2;
                this.game.physics.arcade.collide(item, this.currentLevel.ground.image, ()=> {
                    item.rotation += 0.2;
                    item.position.x -= difficulty.levelSpeed;
                });
                this.game.physics.arcade.collide(item, this.currentLevel.ground.secondImage, ()=> {
                    item.rotation += 0.2;
                    item.position.x -= difficulty.levelSpeed;
                });

                this.game.physics.arcade.overlap(item, this.monkey.states, ()=> {
                    this.monkey.pickUpKnife();
                    this.pickUpItems.splice(this.pickUpItems.indexOf(item), 1);
                    this.knifeButton.pickUpItem(1);
                    item.body.setSize(0, 0);
                    item.destroy();
                }, null, this.monkey);

                if(item.position.x<-item.width || item.position.y>this.game.height){
                    this.pickUpItems.splice(this.pickUpItems.indexOf(item), 1);
                    item.destroy();
                }
            });

        }

        render() {
            // if(this.monkey.states){
            //    this.game.debug.body(this.monkey.states,"#ff0000",false);
            //    this.game.debug.body(this.monkey.states,"#ff0000",false);
            // }
            // if(this.zom1List[0]){
            //    this.game.debug.body(this.zom1List[0].states,"#ff0000",false);
            // }
            //
            // this.game.debug.text("monkey: "+this.monkey.states.position.x,20,20, "#FF0000");
            // if(this.thrownItems[0]){
            //    this.game.debug.body(this.thrownItems[0],"#ff0000",false);
            // }
            //
            // this.game.debug.text("knife: "+this.pickUpItems.length,20,20,"#FF0000");
            //if (this.currentLevel === this.levelTwo && this.levelTwo.treeCollection[0]) {
            //    this.game.debug.text("b: " + this.currentDifficulty.zo1Speed + " l: " + this.currentDifficulty.levelSpeed
            //        + " g: " + this.currentLevel.ground.velocity +
            //        " r: " + this.levelTwo.treeCollection[0].velocity, 20, 20, "#FF0000");
         //}
         //   this.game.debug.text("monkey y: "+this.monkey.states.position.y,20,20,"#FF0000");

        }

        triggerLevel(difficultyIndex:number) {
            this.currentDifficulty = this.difficulties[difficultyIndex];
            // this.zom1List.forEach((zo1)=>{
            //     zo1.states.destroy();
            //     zo1.states2.destroy();
            // },this);
            //
            //
            // this.zom1List = [];

            this.pickUpItems.forEach((item)=>{
                item.destroy();
            });
            this.pickUpItems=[];

            this.currentLevel.walls = [];

            this.currentLevel.platforms.forEach((platform)=>{
                platform.destroy();
            });
            this.currentLevel.platforms = [];

            var gameTween = this.game.add.tween(this.game.world);
            gameTween.to({alpha: 0}, 200, Phaser.Easing.Default, true, 0, 0, true);
            gameTween.onLoop.add(()=> {
                if (this.currentLevel === this.levelOne) {
                    this.currentLevel = this.levelTwo;
                    this.game.world.bringToTop(this.levelTwo.levelGroup);
                    this.game.world.bringToTop(this.killerCollection.killerGroup);
                    this.game.world.bringToTop(this.topGroup);
                }
                else {
                    this.currentLevel = this.levelOne;
                    this.game.world.bringToTop(this.levelOne.levelGroup);
                    this.game.world.bringToTop(this.killerCollection.killerGroup);
                    this.game.world.bringToTop(this.topGroup);

                }
            }, this);
            this.levelOne.ground.velocity = this.currentDifficulty.levelSpeed;
            this.levelTwo.ground.velocity = this.currentDifficulty.levelSpeed;
            this.levelTwo.grass.velocity = this.currentDifficulty.levelSpeed;
        }
    }
}
