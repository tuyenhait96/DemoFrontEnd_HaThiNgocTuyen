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
var MonkeyRun;
(function (MonkeyRun) {
    var Blood = /** @class */ (function (_super) {
        __extends(Blood, _super);
        function Blood(game, x, y) {
            var _this = this;
            _this.game = game;
            _this.radius = 5 + Math.round(RNG(0, 5));
            _this = _super.call(this, _this.game, x, y, game.cache.getBitmapData("Blood")) || this;
            _this.x = x;
            _this.y = y;
            _this.createBlood();
            return _this;
        }
        Blood.prototype.update = function () {
            if (this.alpha > 0.01) {
                this.alpha = this.alpha - RNG(0.005, 0.009);
            }
            _super.prototype.update.call(this);
        };
        Blood.prototype.createBlood = function () {
            var bmd = this.game.add.bitmapData(this.radius * 2, this.radius * 2);
            bmd.circle(bmd.width * 0.5, bmd.height * 0.5, this.radius, "#8B1914");
            this.game.cache.addBitmapData("Blood", bmd);
        };
        return Blood;
    }(Phaser.Particle));
    MonkeyRun.Blood = Blood;
})(MonkeyRun || (MonkeyRun = {}));
