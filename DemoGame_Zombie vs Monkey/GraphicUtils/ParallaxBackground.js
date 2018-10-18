/// <reference path="../Lib/phaser.d.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var ParallaxBackground = /** @class */ (function () {
        function ParallaxBackground(game, key, velocity, y, group) {
            var spriteY = y || 0;
            this.game = game;
            this.image = this.game.add.sprite(0, spriteY, key, 0, group);
            this.secondImage = this.game.add.sprite(this.image.width, spriteY, key, 0, group);
            this.velocity = velocity;
        }
        ParallaxBackground.prototype.update = function () {
            this.image.position.x -= this.velocity;
            this.secondImage.position.x -= this.velocity;
            if (this.image.position.x <= -this.image.width) {
                this.image.position.x = this.image.width;
            }
            if (this.secondImage.position.x <= -this.secondImage.width) {
                this.secondImage.position.x = this.secondImage.width;
            }
        };
        return ParallaxBackground;
    }());
    MonkeyRun.ParallaxBackground = ParallaxBackground;
})(MonkeyRun || (MonkeyRun = {}));
