/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\Levels\KillerCollection.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var Banana = /** @class */ (function () {
        function Banana(game, key, velocity, y, group) {
            this.game = game;
            this.sprite = this.game.add.sprite(this.game.width, 30, key, 0, group);
            this.velocity = velocity;
            this.sprite.anchor.set(0.5, 0);
            var randomScale = RNG(0.2, 0.4);
            this.sprite.scale.set(randomScale, randomScale);
            this.rotationSpeed = 0;
            this.ROTATION_CONSTANT_SPEED = RNG(0.04, 0.07);
            this.bloodThrown = false;
        }
        Banana.prototype.update = function (killerCollection) {
            this.rotationSpeed += this.ROTATION_CONSTANT_SPEED;
            this.sprite.position.x -= this.velocity;
            this.sprite.rotation = 0.3 * Math.sin(this.rotationSpeed);
            if (this.sprite.position.x <= 100 && !this.bloodThrown) {
                this.bloodThrown = true;
                killerCollection.bloodEmitter.start(50, 80, true, 800, 50);
                killerCollection.firstSaw.changeToBloodierImage();
                killerCollection.thirdSaw.triggerSaw();
            }
        };
        return Banana;
    }());
    MonkeyRun.Banana = Banana;
})(MonkeyRun || (MonkeyRun = {}));
