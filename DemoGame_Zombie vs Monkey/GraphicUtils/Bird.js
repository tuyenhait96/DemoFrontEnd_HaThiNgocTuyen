/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\Levels\KillerCollection.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var Bird = /** @class */ (function () {
        function Bird(game, key, velocity, y, group) {
            this.game = game;
            this.sprite = this.game.add.sprite(this.game.width, y, key, group);
            this.sprite.animations.add("Fly", Phaser.Animation.generateFrameNames("birdfly", 1, 11, ".png", 4), 30);
            this.sprite.animations.play("Fly", null, true);
            this.sprite.anchor.set(0.5, 0.5);
            this.sprite.scale.set(-1, 1);
            this.velocity = velocity;
            this.period = 0;
            this.amplitude = RNG(0, 7);
            this.periodIncrement = RNG(0.15, 0.2);
            this.bloodThrown = false;
        }
        Bird.prototype.update = function (killerCollection) {
            this.sprite.position.x -= this.velocity;
            this.sprite.position.y = this.amplitude * Math.sin(this.period) + this.sprite.position.y;
            this.period += this.periodIncrement;
            if (this.sprite.position.x <= 100 && !this.bloodThrown) {
                this.bloodThrown = true;
                killerCollection.bloodEmitter.start(50, 80, true, 800, 50);
                killerCollection.featherEmitter.start(50, 80, true, 1500, 5);
                killerCollection.firstSaw.changeToBloodierImage();
                killerCollection.thirdSaw.triggerSaw();
            }
        };
        return Bird;
    }());
    MonkeyRun.Bird = Bird;
})(MonkeyRun || (MonkeyRun = {}));
