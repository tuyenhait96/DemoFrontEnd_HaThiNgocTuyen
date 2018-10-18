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
///<reference path="Level.ts"/>
///<reference path="..\GraphicUtils\BackgroundItem.ts"/>
///<reference path="..\GraphicUtils\Bird.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var LevelTwo = /** @class */ (function (_super) {
        __extends(LevelTwo, _super);
        function LevelTwo(game) {
            return _super.call(this, game) || this;
        }
        LevelTwo.prototype.create = function (difficulty) {
            this.levelGroup = this.game.add.group();
            this.background = new MonkeyRun.ParallaxBackground(this.game, "sky", 2.5, -100, this.levelGroup);
            this.ground = new MonkeyRun.ParallaxBackground(this.game, "floor_outdoor", difficulty.levelSpeed, 586, this.levelGroup);
            this.grass = new MonkeyRun.ParallaxBackground(this.game, "grass", difficulty.levelSpeed, 570, this.levelGroup);
            this.treeCollection = [];
            this.rockCollection = [];
            this.birdCollection = [];
            this.randomTreeSpawnTime = this.game.time.now;
            this.randomRockSpawnTime = this.game.time.now;
            this.randomBirdSpawnTime = this.game.time.now;
            _super.prototype.create.call(this, difficulty);
        };
        LevelTwo.prototype.update = function (killerCollection, monkey, difficulty) {
            _super.prototype.update.call(this, killerCollection, monkey, difficulty);
            this.grass.update();
            this.updateTrees(difficulty);
            this.updateRocks(difficulty);
            this.updateBirds(killerCollection);
            this.spawnPlatform("platformOutdoor", difficulty);
            this.updatePlatforms(monkey, difficulty);
            this.spawnWall("wallOutdoor", difficulty);
            this.updateWalls(monkey, difficulty);
        };
        LevelTwo.prototype.updateTrees = function (difficulty) {
            if (this.game.time.now > this.randomTreeSpawnTime) {
                this.randomTreeSpawnTime = this.game.time.now + RNG(3, 8) * 1000;
                var tree = new MonkeyRun.BackgroundItem(this.game, "tree", difficulty.levelSpeed, 595, this.levelGroup);
                this.treeCollection.push(tree);
                this.levelGroup.addChildAt(tree.image, 6);
            }
            this.treeCollection.forEach(function (tree) {
                tree.update();
                if (tree.image.position.x <= -tree.image.width) {
                    tree.image.alpha = 0;
                    tree.image.kill();
                }
            });
            if (this.treeCollection[0] && this.treeCollection[0].image.alpha === 0) {
                this.treeCollection.splice(0, 1);
            }
        };
        LevelTwo.prototype.updateRocks = function (difficulty) {
            if (this.game.time.now > this.randomRockSpawnTime) {
                this.randomRockSpawnTime = this.game.time.now + RNG(1, 3) * 1000;
                var randomRockNumber = RNG(1, 3) | 0;
                var rock = new MonkeyRun.BackgroundItem(this.game, "rock" + randomRockNumber.toString(), difficulty.levelSpeed, 710, this.levelGroup);
                this.rockCollection.push(rock);
            }
            this.rockCollection.forEach(function (rock) {
                rock.update();
                if (rock.image.position.x <= -rock.image.width) {
                    rock.image.alpha = 0;
                    rock.image.kill();
                }
            });
            if (this.rockCollection[0] && this.rockCollection[0].image.alpha === 0) {
                this.rockCollection.splice(0, 1);
            }
        };
        LevelTwo.prototype.updateBirds = function (killerCollection) {
            if (this.game.time.now > this.randomBirdSpawnTime) {
                this.randomBirdSpawnTime = this.game.time.now + RNG(5, 8) * 1000;
                var bird = new MonkeyRun.Bird(this.game, "Bird", 12, 120, this.levelGroup);
                this.birdCollection.push(bird);
                this.levelGroup.addChildAt(bird.sprite, 6);
            }
            this.birdCollection.forEach(function (bird) {
                bird.update(killerCollection);
                if (bird.sprite.position.x <= 0) {
                    bird.sprite.alpha = 0;
                    bird.sprite.kill();
                }
            });
            if (this.birdCollection[0] && this.birdCollection[0].sprite.alpha === 0) {
                this.birdCollection.splice(0, 1);
            }
        };
        return LevelTwo;
    }(MonkeyRun.Level));
    MonkeyRun.LevelTwo = LevelTwo;
})(MonkeyRun || (MonkeyRun = {}));
