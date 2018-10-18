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
///<reference path="../GraphicUtils/Banana.ts"/>
///<reference path="..\GraphicUtils\ParallaxBackground.ts"/>
///<reference path="Level.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var LevelOne = /** @class */ (function (_super) {
        __extends(LevelOne, _super);
        function LevelOne(game) {
            return _super.call(this, game) || this;
        }
        LevelOne.prototype.create = function (difficulty) {
            this.levelGroup = this.game.add.group();
            this.background = new MonkeyRun.ParallaxBackground(this.game, "slaughter_background", 2.5, -100, this.levelGroup);
            this.bananaHanger = new MonkeyRun.ParallaxBackground(this.game, "platform", 4, -45, this.levelGroup);
            this.bananaCollection = [];
            this.randomBananaSpawnTime = this.game.time.now;
            this.ground = new MonkeyRun.ParallaxBackground(this.game, "ground", difficulty.levelSpeed, 586, this.levelGroup);
            _super.prototype.create.call(this, difficulty);
        };
        LevelOne.prototype.update = function (killerCollection, monkey, difficulty) {
            _super.prototype.update.call(this, killerCollection, monkey, difficulty);
            this.bananaHanger.update();
            this.spawnBanana();
            this.updateBananas(killerCollection);
            this.spawnPlatform("platformIndoor1", difficulty);
            this.updatePlatforms(monkey, difficulty);
            this.spawnWall("wallIndoor", difficulty);
            this.updateWalls(monkey, difficulty);
        };
        LevelOne.prototype.spawnBanana = function () {
            if (this.game.time.now > this.randomBananaSpawnTime) {
                this.randomBananaSpawnTime = this.game.time.now + RNG(3, 6) * 1000;
                var banana = new MonkeyRun.Banana(this.game, "banana", 4, 50, this.levelGroup);
                this.bananaCollection.push(banana);
                this.levelGroup.addChildAt(banana.sprite, 6);
            }
        };
        LevelOne.prototype.updateBananas = function (killerCollection) {
            this.bananaCollection.forEach(function (banana) {
                banana.update(killerCollection);
                if (banana.sprite.position.x <= -banana.sprite.width) {
                    banana.sprite.alpha = 0;
                    banana.sprite.destroy();
                }
            });
            if (this.bananaCollection[0] && this.bananaCollection[0].sprite.alpha === 0) {
                this.bananaCollection.splice(0, 1);
            }
        };
        return LevelOne;
    }(MonkeyRun.Level));
    MonkeyRun.LevelOne = LevelOne;
})(MonkeyRun || (MonkeyRun = {}));
