/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\Levels\Level.ts"/>
///<reference path="..\Levels\KillerCollection.ts"/>
///<reference path="Monkey.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var Zom2States;
    (function (Zom2States) {
        Zom2States[Zom2States["IDLE"] = 0] = "IDLE";
        Zom2States[Zom2States["RUNNING"] = 1] = "RUNNING";
        Zom2States[Zom2States["SHOTGUN_DEATH"] = 2] = "SHOTGUN_DEATH";
        Zom2States[Zom2States["GRENADE_DEATH"] = 3] = "GRENADE_DEATH";
        Zom2States[Zom2States["KNIFE_DEATH"] = 4] = "KNIFE_DEATH";
        Zom2States[Zom2States["THROWN_BY_GMO"] = 5] = "THROWN_BY_GMO";
        Zom2States[Zom2States["DEAD"] = 6] = "DEAD";
    })(Zom2States = MonkeyRun.Zom2States || (MonkeyRun.Zom2States = {}));
    ;
    var Zom2 = /** @class */ (function () {
        function Zom2(game, velocity) {
            this.game = game;
            this.velocity = velocity;
            this.currentState = Zom2States.RUNNING;
            this.isDead = false;
            this.bloodThrown = false;
            this.states = this.game.add.sprite(1300, 400, "Zom2");
            this.states.animations.add("attack", [34, 35, 36, 37, 38, 39], 14);
            this.states.animations.add("knifeDeath", [6, 7, 8, 9, 10, 11, 12, 13], 20);
            this.states.animations.add("grenadeDeath", [6, 7, 8, 9, 10, 11, 12, 13], 30);
            this.states.animations.add("idle", [19, 20, 21, 22], 14);
            this.states.animations.add("run", [34, 35, 36, 37, 38, 39], 14);
            this.states.animations.add("shotgunDeath", [6, 7, 8, 9, 10, 11, 12, 13], 30);
            this.states.scale.set(-1, 1); //-1 đi bên phải,+1 đi qua trái,độ rộng của khung đỏ
            this.states.anchor.set(0.5, 0.5);
            this.game.physics.arcade.enable(this.states);
            this.states.body.setSize(100, 100, -50, 10);
            this.states.body.fixedRotation = true;
            this.states.body.gravity.y = 1000;
            this.states2 = this.game.add.sprite(1300, 400, "Zom2");
            this.states2.animations.add("gmo_death", [6, 7, 8, 9, 10, 11, 12, 13], 20);
            this.states2.animations.add("sawDeath", [6, 7, 8, 9, 10, 11, 12, 13], 20);
            this.states2.scale.set(-1, 1);
            this.states2.anchor.set(0.5, 0.5);
            this.states2.alpha = 0;
            if (Math.random() < 0.5) {
                this.states.animations.play("run", null, true);
            }
            else {
                this.states.animations.play("attack", null, true);
            }
        }
        Zom2.prototype.update = function (currentLevel, killerCollection, Zom2List, monkey, thrownItems, pickUpItems, difficulty) {
            this.states.position.x -= this.velocity;
            this.game.physics.arcade.collide(this.states, currentLevel.ground.image);
            this.game.physics.arcade.collide(this.states, currentLevel.ground.secondImage);
            this.Zom2MonkeyCollision(monkey, killerCollection);
            this.Zom2ItemCollision(thrownItems, killerCollection, pickUpItems, difficulty);
            this.shotgunAndSawDeath(killerCollection);
            this.gmoBlood(killerCollection);
            this.removeZom2FromGame(killerCollection, Zom2List);
        };
        Zom2.prototype.changeToAttack = function () {
            var _this = this;
            this.states.animations.play("attack", null, false)
                .onComplete.add(function () {
                _this.states.animations.play("run", null, true);
            });
        };
        Zom2.prototype.Zom2MonkeyCollision = function (monkey, killerCollection) {
            var _this = this;
            if (IS_CHEATING == true)
                return;
            this.game.physics.arcade.overlap(this.states, monkey.states, function () {
                if (monkey.currentState !== MonkeyRun.MonkeyStates.GMO) {
                    _this.changeToAttack();
                    _this.collideSpriteSound = _this.game.add.audio("collideSpriteSound");
                    _this.collideSpriteSound.play();
                    monkey.states.health = monkey.states.health - 1;
                    console.log("Máu COW:" + monkey.states.health);
                    monkey.pickUpGMO();
                    killerCollection.updateHealthBar();
                    // monkey.pickUpGMO();
                    if (monkey.states.health === 0) {
                        killerCollection.gameOver = true;
                        _this.collideSpriteSound.play();
                    }
                }
                else if (_this.currentState !== Zom2States.THROWN_BY_GMO) {
                    _this.thrownByGMO();
                    _this.gmoThrow = _this.game.add.audio("gmoThrow");
                    _this.gmoThrow.play();
                }
            }, null, this);
        };
        Zom2.prototype.deathByItem = function (key, difficulty) {
            var _this = this;
            this.states.animations.play(key + "Death", null, false);
            this.isDead = true;
            this.states.body.setSize(0, 0, 0, 20);
            if (key === "grenade") {
                this.states.animations.currentAnim.onComplete.add(function () {
                    _this.states.alpha = 0;
                    _this.currentState = Zom2States.GRENADE_DEATH;
                    _this.grenadeSprite = _this.game.add.audio("grenadeSprite");
                    _this.grenadeSprite.play();
                }, this);
            }
            else if (key === "knife") {
                this.currentState = Zom2States.KNIFE_DEATH;
                this.velocity = difficulty.levelSpeed;
                this.knifeSprite = this.game.add.audio("knifeSprite");
                this.knifeSprite.play();
            }
            else if (key === "shotgun") {
                this.currentState = Zom2States.SHOTGUN_DEATH;
                this.states.animations.currentAnim.onComplete.add(function () {
                    _this.states.bringToTop();
                    _this.velocity = difficulty.levelSpeed;
                }, this);
            }
        };
        Zom2.prototype.Zom2ItemCollision = function (thrownItems, killerCollection, pickUpItems, difficulty) {
            var _this = this;
            thrownItems.forEach(function (item) {
                _this.game.physics.arcade.overlap(item, _this.states, function () {
                    killerCollection.updateKillsText();
                    _this.deathByItem(item.key, difficulty);
                    thrownItems.splice(thrownItems.indexOf(item), 1);
                    item.destroy();
                    var position = _this.states.body;
                    var offset = 100;
                    if (item.key === "grenade") {
                        killerCollection.boneEmitter.start(position.x + offset, position.y - offset + 10, true, 2000, Math.abs(RNG(1, 4)));
                    }
                    killerCollection.bloodEmitter.start(position.x + offset, position.y - offset + 10, true, 800, 50);
                    var shouldThrowKnifeRNG = Math.random();
                    if (shouldThrowKnifeRNG < 0.7) {
                        pickUpItems.push(_this.spawnPickUpKnife(position.x + offset, position.y - offset));
                    }
                }, null, _this);
            }, this);
        };
        Zom2.prototype.spawnPickUpKnife = function (x, y) {
            var knife = this.game.add.sprite(x, y, "knife");
            this.game.physics.arcade.enable(knife);
            knife.anchor.set(0.5, 0.5);
            knife.body.velocity.y = -500;
            knife.body.mass = 0;
            knife.body.collideWorldBounds = false;
            knife.body.setSize(20, 30, 0, 0);
            return knife;
        };
        Zom2.prototype.shotgunAndSawDeath = function (killerCollection) {
            if (this.states.body.x < 100 && this.currentState === Zom2States.SHOTGUN_DEATH) {
                this.states.alpha = 0;
                this.states.body.setSize(0, 0);
                this.states2.alpha = 1;
                this.states2.position.x = this.states.position.x;
                this.states2.position.y = this.states.position.y;
                var positionTween = this.game.add.tween(this.states2.position);
                positionTween.to({ x: -500 }, 2000, Phaser.Easing.Default, true);
                killerCollection.killerGroup.bringToTop(this.states2);
                this.states2.animations.play("sawDeath", null, false);
            }
            if (this.states2.alpha === 1) {
                this.states2.rotation -= 0.02;
            }
            if (this.states2.alpha === 1 &&
                this.states2.position.x < 200 &&
                !this.bloodThrown &&
                this.currentState !== Zom2States.THROWN_BY_GMO) {
                this.bloodThrown = true;
                killerCollection.killerGroup.bringToTop(killerCollection.bloodEmitter.emitter);
                killerCollection.bloodEmitter.start(70, 480, true, 800, 50);
                killerCollection.killerGroup.bringToTop(this.states2);
                // killerCollection.secondSaw.triggerSaw();
                killerCollection.updateKillsText();
            }
        };
        Zom2.prototype.gmoBlood = function (killerCollection) {
            if (this.states2.alpha === 1 &&
                this.states2.position.x < 200 &&
                !this.bloodThrown &&
                this.currentState === Zom2States.THROWN_BY_GMO) {
                this.bloodThrown = true;
                killerCollection.updateKillsText();
                killerCollection.killerGroup.bringToTop(killerCollection.bloodEmitter.emitter);
                killerCollection.bloodEmitter.start(70, 80, true, 800, 400);
                // killerCollection.killerGroup.sendToBack(this.states2);
                // killerCollection.firstSaw.triggerSaw();
            }
        };
        Zom2.prototype.thrownByGMO = function () {
            this.game.physics.arcade.enable(this.states2);
            this.states.alpha = 0;
            this.states.body.setSize(0, 0);
            this.states2.alpha = 1;
            this.states2.position.x = this.states.position.x;
            this.states2.position.y = this.states.position.y;
            this.states2.animations.play("gmo_death", null, true);
            this.states2.body.velocity.y = -1200;
            this.states2.body.velocity.x = -500;
            this.currentState = Zom2States.THROWN_BY_GMO;
        };
        Zom2.prototype.removeZom2FromGame = function (killerCollection, Zom2List) {
            if (this.states.position.x < -200 || this.states2.position.x < -200) {
                this.currentState = Zom2States.DEAD;
            }
            if (this.currentState === Zom2States.DEAD || this.currentState === Zom2States.GRENADE_DEATH) {
                killerCollection.killerGroup.remove(this.states);
                killerCollection.killerGroup.remove(this.states2);
                Zom2List.splice(Zom2List.indexOf(this), 1);
                this.states.destroy();
                this.states2.destroy();
            }
        };
        return Zom2;
    }());
    MonkeyRun.Zom2 = Zom2;
})(MonkeyRun || (MonkeyRun = {}));
