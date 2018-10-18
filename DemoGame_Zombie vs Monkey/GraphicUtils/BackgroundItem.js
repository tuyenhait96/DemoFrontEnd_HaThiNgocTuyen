/// <reference path="../Lib/phaser.d.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var BackgroundItem = /** @class */ (function () {
        function BackgroundItem(game, key, velocity, y, group) {
            var randomScale = RNG(0.5, 0.9);
            this.game = game;
            this.image = this.game.add.image(this.game.width, y, key, 0, group);
            this.image.anchor.set(0, 1);
            this.velocity = velocity;
            this.image.scale.set(randomScale, randomScale);
        }
        BackgroundItem.prototype.update = function () {
            this.image.position.x -= this.velocity;
            //TODO: Maybe add destruction logic here???
        };
        return BackgroundItem;
    }());
    MonkeyRun.BackgroundItem = BackgroundItem;
})(MonkeyRun || (MonkeyRun = {}));
