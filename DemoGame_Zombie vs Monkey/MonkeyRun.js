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
/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="States/Preloader.ts"/>
///<reference path="States\Menu.ts"/>
///<reference path="States\GameOver.ts"/>
///<reference path="States\OptionMenu.ts"/>
///<reference path="States\GuideMenu.ts"/>
///<reference path="States\AboutMenu.ts"/>
function RNG(from, to) {
    return Math.random() * (to - from) + from;
}
var MonkeyRun;
(function (MonkeyRun_1) {
    var MonkeyRun = /** @class */ (function (_super) {
        __extends(MonkeyRun, _super);
        function MonkeyRun(width, height) {
            var _this = this;
            var dpr = devicePixelRatio || 1;
            if (!width) {
                width = screen.width * dpr;
            }
            if (!height) {
                height = screen.height * dpr;
            }
            _this = _super.call(this, width, height, Phaser.CANVAS, 'phaser-div', { create: _this.create }) || this;
            return _this;
        }
        MonkeyRun.prototype.create = function () {
            this.game.stage.backgroundColor = "#FFF";
            //this.game.scale.maxWidth = 1280;
            //this.game.scale.maxHeight = 720;
            this.game.state.add("Preloader", MonkeyRun_1.Preloader, false);
            this.game.state.add("Boot", MonkeyRun_1.Boot, false);
            this.game.state.add("Menu", MonkeyRun_1.Menu, false);
            this.game.state.add("OptionMenu", MonkeyRun_1.OptionMenu, false);
            this.game.state.add("GuideMenu", MonkeyRun_1.GuideMenu, false);
            this.game.state.add("AboutMenu", MonkeyRun_1.AboutMenu, false);
            this.game.state.add("Game", MonkeyRun_1.Game, false);
            this.game.state.add("GameOver", MonkeyRun_1.GameOver, false);
            this.game.state.start("Boot");
        };
        return MonkeyRun;
    }(Phaser.Game));
    window.onload = function () {
        new MonkeyRun(1280, 720);
    };
})(MonkeyRun || (MonkeyRun = {}));
