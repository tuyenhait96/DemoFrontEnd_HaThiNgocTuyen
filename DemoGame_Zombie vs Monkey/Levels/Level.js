/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\GraphicUtils\ParallaxBackground.ts"/>
///<reference path="KillerCollection.ts"/>
///<reference path="..\GameObjects\Difficulty.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var Level = /** @class */ (function () {
        function Level(game) {
            this.game = game;
        }
        Level.prototype.create = function (difficulty) {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.enable(this.ground.image);
            this.game.physics.enable(this.ground.secondImage);
            this.game.physics.arcade.gravity.y = 1200;
            this.ground.image.body.immovable = true;
            this.ground.image.body.moves = false;
            this.ground.secondImage.body.immovable = true;
            this.ground.secondImage.body.moves = false;
            this.walls = [];
            this.platforms = [];
            this.randomWallSpawnTime = this.game.time.now;
            this.randomPlatformSpawnTime = this.game.time.now;
        };
        Level.prototype.update = function (killerCollection, monkey, difficulty) {
            this.ground.update();
            this.background.update();
        };
        Level.prototype.spawnPlatform = function (key, difficulty) {
            if (this.randomPlatformSpawnTime + 1500 < this.game.time.now) {
                this.randomPlatformSpawnTime = this.game.time.now + RNG(difficulty.rngPlatformLow, difficulty.rngPlatformHigh);
                var rngPlatformLevel = (this.game.height - 180) - Math.floor(RNG(1, 3)) * 180;
                var platform = this.game.add.sprite(this.game.width, rngPlatformLevel, key);
                //this.levelGroup.addChildAt(platform, 6);
                this.levelGroup.bringToTop(platform);
                this.game.physics.arcade.enable(platform);
                platform.scale.set(0.5);
                platform.body.checkCollision.up = true;
                platform.body.checkCollision.down = false;
                platform.body.checkCollision.left = false;
                platform.body.checkCollision.right = false;
                platform.body.immovable = true;
                platform.body.moves = false;
                this.platforms.push(platform);
            }
        };
        Level.prototype.updatePlatforms = function (monkey, difficulty) {
            var _this = this;
            this.platforms.forEach(function (platform) {
                platform.position.x -= difficulty.levelSpeed;
                _this.game.physics.arcade.collide(monkey.states, platform, function () {
                    monkey.changeToRunning();
                });
                if (platform.position.x < -platform.width) {
                    _this.platforms.splice(_this.platforms.indexOf(platform), 1);
                    platform.destroy();
                }
            }, this);
        };
        Level.prototype.spawnWall = function (key, difficulty) {
            if (this.randomWallSpawnTime + 2300 < this.game.time.now) {
                this.randomWallSpawnTime = this.game.time.now + RNG(difficulty.rngWallLow, difficulty.rngWallHigh);
                var wall = this.game.add.sprite(this.game.width, 586, key);
                wall.anchor.set(0, 1);
                //this.levelGroup.addChildAt(wall,8);
                this.levelGroup.bringToTop(wall);
                this.game.physics.arcade.enable(wall);
                wall.scale.set(RNG(0.7, 0.8));
                wall.body.immovable = true;
                wall.body.moves = false;
                this.walls.push(wall);
            }
        };
        Level.prototype.updateWalls = function (monkey, difficulty) {
            var _this = this;
            if (IS_CHEATING == true)
                return;
            if (monkey.currentState !== MonkeyRun.MonkeyStates.GMO) {
                this.walls.forEach(function (wall) {
                    wall.position.x -= difficulty.levelSpeed;
                    _this.game.physics.arcade.collide(monkey.states, wall, function () {
                        monkey.changeToRunning();
                        if (wall.position.x < -wall.width) {
                            _this.walls.splice(_this.walls.indexOf(wall), 1);
                            wall.destroy();
                        }
                    });
                });
            }
            else {
                this.walls.forEach(function (wall) {
                    wall.position.x -= difficulty.levelSpeed;
                    // this.game.physics.arcade.collide(monkey.states,wall,()=>{
                    //     monkey.changeToRunning();
                    //
                    //     if(wall.position.x< -wall.width){
                    //         this.walls.splice(this.walls.indexOf(wall),1);
                    //         wall.destroy();
                    //     }
                    // })
                });
            }
        };
        return Level;
    }());
    MonkeyRun.Level = Level;
})(MonkeyRun || (MonkeyRun = {}));
