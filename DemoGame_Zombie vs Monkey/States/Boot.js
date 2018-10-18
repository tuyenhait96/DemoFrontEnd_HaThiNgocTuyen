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
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.game.load.image("PreloaderBackground", "Graphics/Boot/Background.png");
            this.game.load.image("bloodier_saw", "Graphics/Game/Saws/bloodier_saw.png");
            //Monkey
            this.game.load.atlas("Monkey", "Graphics/Game/Monkey/Monkey.png", "Graphics/Game/Monkey/Monkey.json");
            this.game.load.image("MonkeyHead", "Graphics/Game/Monkey/MonkeyHead.png");
            //Zom1
            this.game.load.atlas("Zom1", "Graphics/Game/Zom1/Zom1.png", "Graphics/Game/Zom1/Zom1.json");
            //Zombie
            this.game.load.atlas("Zom2", "Graphics/Game/Zom2/Zom2.png", "Graphics/Game/Zom2/Zom2.json");
        };
        Boot.prototype.create = function () {
            var _this = this;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.game.scale.forceLandscape = true;
            //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.game.scale.startFullScreen();
            var bootLogo = this.game.add.image(this.game.width * 0.5, this.game.height * 0.5, "PreloaderBackground");
            bootLogo.anchor.set(0.5, 0.5);
            this.game.time.events.add(500, function () {
                _this.game.state.start("Preloader", false, false, 5, 12321, "asdas");
            }, this);
        };
        return Boot;
    }(Phaser.State));
    MonkeyRun.Boot = Boot;
})(MonkeyRun || (MonkeyRun = {}));
