/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="Blood.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var BloodEmitter = /** @class */ (function () {
        function BloodEmitter(game, width, gravity) {
            this.game = game;
            this.emitter = this.game.add.emitter(100, 100, 2000);
            this.emitter.particleClass = MonkeyRun.Blood;
            this.emitter.width = width;
            this.emitter.makeParticles("Blood");
            this.emitter.gravity = gravity;
            this.emitter.setAlpha(0.8, 0.3);
        }
        BloodEmitter.prototype.start = function (x, y, explode, lifespan, quantity) {
            this.emitter.x = x;
            this.emitter.y = y;
            this.emitter.start(explode, lifespan, 0, quantity, true);
        };
        return BloodEmitter;
    }());
    MonkeyRun.BloodEmitter = BloodEmitter;
})(MonkeyRun || (MonkeyRun = {}));
