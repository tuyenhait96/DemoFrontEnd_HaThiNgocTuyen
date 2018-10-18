var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var IS_CHEATING = false; // true ::: BAT TU
var MonkeyRun;
(function (MonkeyRun) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super.call(this) || this;
        }
        Game.prototype.create = function () {
            //ground
            this.difficulties = [];
            this.difficulties.push(new MonkeyRun.Difficulty(0, 10, 20, 1000, 6000, 3, 1500, 3000, 4500, 8000, 800, 5000, 5, 800, 5000, 6, 5));
            this.difficulties.push(new MonkeyRun.Difficulty(1, 8, 15, 1000, 4500, 4, 1000, 2200, 3500, 6500, 800, 3500, 5, 800, 5000, 7, 5));
            this.difficulties.push(new MonkeyRun.Difficulty(2, 6, 10, 500, 4000, 5, 800, 1800, 2500, 5000, 300, 3000, 6, 800, 5000, 9, 6));
            this.difficulties.push(new MonkeyRun.Difficulty(3, 5, 8, 500, 3000, 6, 800, 1800, 1800, 4000, 300, 2500, 7, 800, 5000, 11, 6));
            this.difficulties.push(new MonkeyRun.Difficulty(4, 4, 20, 1000, 6000, 7, 1500, 3000, 4500, 8000, 800, 5000, 8, 800, 5000, 6, 7));
            this.difficulties.push(new MonkeyRun.Difficulty(5, 3, 15, 1000, 4500, 8, 1000, 2200, 3500, 6500, 800, 3500, 8, 800, 5000, 7, 8));
            this.currentDifficulty = this.difficulties[0];
            this.shouldChangeDifficulty = true;
            console.log(this.currentDifficulty);
            this.levelOne = new MonkeyRun.LevelOne(this.game);
            this.levelOne.create(this.currentDifficulty);
            this.levelTwo = new MonkeyRun.LevelTwo(this.game);
            this.levelTwo.create(this.currentDifficulty);
            this.currentLevel = this.levelTwo;
            this.killerCollection = new MonkeyRun.KillerCollection(this.game);
            this.killerCollection.create();
            this.monkey = new MonkeyRun.Monkey(this.game);
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
            this.grenadeButton = new MonkeyRun.ItemButton(this.game, 1200, 650, "grenadeButton", 99, this.monkey, "throwGrenade");
            this.shotgunButton = new MonkeyRun.ItemButton(this.game, 1100, 650, "shotgunButton", 8, this.monkey, "shotgun");
            this.knifeButton = new MonkeyRun.ItemButton(this.game, 1000, 650, "knifeButton", 0, this.monkey, "throwKnife");
            this.gmoButton = new MonkeyRun.ItemButton(this.game, 800, 650, "gmoButton", 80, this.monkey, "gmo");
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
        };
        Game.prototype.update = function () {
            var _this = this;
            if (!this.killerCollection.gameOver) {
                this.currentLevel.update(this.killerCollection, this.monkey, this.currentDifficulty);
                this.killerCollection.update();
                this.monkey.update(this.currentLevel.ground, this.killerCollection);
                this.zom1List.forEach(function (zo1) {
                    zo1.update(_this.currentLevel, _this.killerCollection, _this.zom1List, _this.monkey, _this.thrownItems, _this.pickUpItems, _this.currentDifficulty);
                });
                this.Zom2list.forEach(function (Zom2) {
                    Zom2.update(_this.currentLevel, _this.killerCollection, _this.Zom2list, _this.monkey, _this.thrownItems, _this.pickUpItems, _this.currentDifficulty);
                });
                this.Zom3list.forEach(function (Zom3) {
                    Zom3.update(_this.levelTwo, _this.killerCollection, _this.Zom3list, _this.monkey, _this.thrownItems, _this.pickUpItems, _this.currentDifficulty);
                });
                this.chestItems.forEach(function (chest) {
                    chest.update(_this.monkey, _this.grenadeButton, _this.shotgunButton, _this.gmoButton, _this.chestItems);
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
                    this.game.physics.arcade.collide(this.currentLevel.ground.image, this.monkey.monkeyHead, function () {
                        _this.monkey.monkeyHead.rotation -= 0.1;
                        _this.monkey.monkeyHead.body.velocity.x = 0;
                    });
                    this.game.physics.arcade.collide(this.currentLevel.ground.secondImage, this.monkey.monkeyHead, function () {
                        _this.monkey.monkeyHead.rotation -= 0.1;
                        _this.monkey.monkeyHead.body.velocity.x = 0;
                    });
                    this.monkey.monkeyHead.rotation += 0.1;
                }
            }
            if (this.killerCollection.gameOver && this.monkey.currentState !== MonkeyRun.MonkeyStates.DEAD) {
                this.gameOver();
            }
        };
        Game.prototype.gameOver = function () {
            var _this = this;
            this.grenadeButton.inputEnabled = false;
            this.knifeButton.inputEnabled = false;
            this.gmoButton.inputEnabled = false;
            this.shotgunButton.inputEnabled = false;
            this.monkey.currentState = MonkeyRun.MonkeyStates.DEAD;
            var maximumScore = localStorage.getItem("maxScore");
            if (maximumScore === null) {
                localStorage.setItem("maxScore", this.killerCollection.score.toString());
                maximumScore = this.killerCollection.score.toString();
            }
            else {
                if (parseInt(maximumScore) <= this.killerCollection.score) {
                    maximumScore = this.killerCollection.score.toString();
                    localStorage.setItem("maxScore", this.killerCollection.score.toString());
                }
            }
            this.killerCollection.bloodEmitter.start(this.monkey.states.position.x, this.monkey.states.position.y - 200, true, 2000, 30);
            this.game.time.events.add(2000, function () {
                _this.game.state.start("GameOver", false, false, _this.killerCollection.score, maximumScore);
            }, this);
        };
        Game.prototype.spawnChests = function () {
            if (this.randomChestsSpawnTime < this.game.time.now) {
                this.randomChestsSpawnTime = this.game.time.now + Math.abs(RNG(this.currentDifficulty.rngChestLow, this.currentDifficulty.rngChestHigh) * 1000);
                var chest = new MonkeyRun.Chest(this.game);
                this.topGroup.add(chest.chest);
                this.chestItems.push(chest);
            }
        };
        Game.prototype.spawnZom1 = function () {
            if (this.randomZom1SpawnTime < this.game.time.now) {
                this.randomZom1SpawnTime = this.game.time.now + RNG(this.currentDifficulty.rngZom1Low, this.currentDifficulty.rngZom1High);
                var zo1 = new MonkeyRun.Zom1(this.game, this.currentDifficulty.zo1Speed);
                this.killerCollection.killerGroup.addChildAt(zo1.states, 6);
                this.killerCollection.killerGroup.addChildAt(zo1.states2, 6);
                this.zom1List.push(zo1);
            }
        };
        Game.prototype.spawnZom2 = function () {
            if (this.randomZom2SpawnTime < this.game.time.now) {
                this.randomZom2SpawnTime = this.game.time.now + RNG(this.currentDifficulty.rngZom2Low, this.currentDifficulty.rngZom2High);
                var zoombie = new MonkeyRun.Zom2(this.game, this.currentDifficulty.Zom2Speed);
                this.killerCollection.killerGroup.addChildAt(zoombie.states, 6);
                this.killerCollection.killerGroup.addChildAt(zoombie.states2, 6);
                this.Zom2list.push(zoombie);
            }
        };
        Game.prototype.spawnZom3 = function () {
            if (this.randomZom3SpawnTime < this.game.time.now) {
                this.randomZom3SpawnTime = this.game.time.now + RNG(this.currentDifficulty.rngZom3Low, this.currentDifficulty.rngZom3High);
                var zoombie = new MonkeyRun.Zom3(this.game, this.currentDifficulty.Zom3Speed);
                this.killerCollection.killerGroup.addChildAt(zoombie.states, 6);
                this.killerCollection.killerGroup.addChildAt(zoombie.states2, 6);
                this.Zom3list.push(zoombie);
            }
        };
        Game.prototype.pauseGameAfterDone = function () {
            this.game.paused = true;
            var style = { fill: '#990000' };
            this.text = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, "Bạn đã hoàn thành màn chơi!!!\n    Click chuột trái để tiếp tục", style);
            this.text.anchor.set(0.5, 0.5);
            this.text.strokeThickness = 10;
            this.text.stroke = '#ffffff';
        };
        Game.prototype.updateDifficulties = function () {
            if (this.killerCollection.score === 5 && this.shouldChangeDifficulty) {
                this.game.sound.stopAll();
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.level2Sound.play();
                this.triggerLevel(1);
            }
            else if (this.killerCollection.score === 15 && this.shouldChangeDifficulty) {
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.game.sound.stopAll();
                this.level1Sound.play();
                this.triggerLevel(2);
            }
            else if (this.killerCollection.score === 25 && this.shouldChangeDifficulty) {
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.game.sound.stopAll();
                this.level2Sound.play();
                this.triggerLevel(3);
            }
            else if (this.killerCollection.score === 35 && this.shouldChangeDifficulty) {
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.game.sound.stopAll();
                this.level1Sound.play();
                this.triggerLevel(4);
            }
            else if (this.killerCollection.score === 45 && this.shouldChangeDifficulty) {
                this.pauseGameAfterDone();
                this.shouldChangeDifficulty = false;
                this.game.sound.stopAll();
                this.level2Sound.play();
                this.triggerLevel(5);
            }
            if (this.killerCollection.score % 10 === 1 && this.killerCollection.score > 10) {
                this.shouldChangeDifficulty = true;
            }
        };
        Game.prototype.monkeyThrowItems = function () {
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
                this.monkey.shootShotgun(this.zom1List, this.Zom2list, this.killerCollection, this.pickUpItems, this.currentDifficulty);
                this.shotgunSound.play();
            }
            if (this.gmoButton.buttonPressed) {
                this.gmoButton.buttonPressed = false;
                this.monkey.pickUpGMO();
                this.gmoSound.play();
            }
        };
        Game.prototype.thrownItemsUpdate = function () {
            var _this = this;
            this.thrownItems.forEach(function (item) {
                item.rotation += 0.2;
                if (item.x > _this.game.width) {
                    _this.thrownItems.splice(_this.thrownItems.indexOf(item, 1));
                    item.destroy();
                }
            });
        };
        Game.prototype.pickupItemsUpdate = function (difficulty) {
            var _this = this;
            this.pickUpItems.forEach(function (item) {
                item.rotation -= 0.2;
                _this.game.physics.arcade.collide(item, _this.currentLevel.ground.image, function () {
                    item.rotation += 0.2;
                    item.position.x -= difficulty.levelSpeed;
                });
                _this.game.physics.arcade.collide(item, _this.currentLevel.ground.secondImage, function () {
                    item.rotation += 0.2;
                    item.position.x -= difficulty.levelSpeed;
                });
                _this.game.physics.arcade.overlap(item, _this.monkey.states, function () {
                    _this.monkey.pickUpKnife();
                    _this.pickUpItems.splice(_this.pickUpItems.indexOf(item), 1);
                    _this.knifeButton.pickUpItem(1);
                    item.body.setSize(0, 0);
                    item.destroy();
                }, null, _this.monkey);
                if (item.position.x < -item.width || item.position.y > _this.game.height) {
                    _this.pickUpItems.splice(_this.pickUpItems.indexOf(item), 1);
                    item.destroy();
                }
            });
        };
        Game.prototype.render = function () {
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
        };
        Game.prototype.triggerLevel = function (difficultyIndex) {
            var _this = this;
            this.currentDifficulty = this.difficulties[difficultyIndex];
            // this.zom1List.forEach((zo1)=>{
            //     zo1.states.destroy();
            //     zo1.states2.destroy();
            // },this);
            //
            //
            // this.zom1List = [];
            this.pickUpItems.forEach(function (item) {
                item.destroy();
            });
            this.pickUpItems = [];
            this.currentLevel.walls = [];
            this.currentLevel.platforms.forEach(function (platform) {
                platform.destroy();
            });
            this.currentLevel.platforms = [];
            var gameTween = this.game.add.tween(this.game.world);
            gameTween.to({ alpha: 0 }, 200, Phaser.Easing.Default, true, 0, 0, true);
            gameTween.onLoop.add(function () {
                if (_this.currentLevel === _this.levelOne) {
                    _this.currentLevel = _this.levelTwo;
                    _this.game.world.bringToTop(_this.levelTwo.levelGroup);
                    _this.game.world.bringToTop(_this.killerCollection.killerGroup);
                    _this.game.world.bringToTop(_this.topGroup);
                }
                else {
                    _this.currentLevel = _this.levelOne;
                    _this.game.world.bringToTop(_this.levelOne.levelGroup);
                    _this.game.world.bringToTop(_this.killerCollection.killerGroup);
                    _this.game.world.bringToTop(_this.topGroup);
                }
            }, this);
            this.levelOne.ground.velocity = this.currentDifficulty.levelSpeed;
            this.levelTwo.ground.velocity = this.currentDifficulty.levelSpeed;
            this.levelTwo.grass.velocity = this.currentDifficulty.levelSpeed;
        };
        return Game;
    }(Phaser.State));
    MonkeyRun.Game = Game;
})(MonkeyRun || (MonkeyRun = {}));
