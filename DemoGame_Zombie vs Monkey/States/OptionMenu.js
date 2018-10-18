/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\GraphicUtils\BloodEmitter.ts"/>
///<reference path="..\GameObjects\Monkey.ts"/>
///<reference path="..\GameObjects\Zom1.ts"/>
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
var MonkeyRun;
(function (MonkeyRun) {
    var OptionMenu = /** @class */ (function (_super) {
        __extends(OptionMenu, _super);
        function OptionMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OptionMenu.prototype.create = function () {
            var _this = this;
            this.game.add.image(0, 0, "OptionScreen");
            // var playButton = this.game.add.button(this.game.width*0.5,this.game.height*0.4,
            //     "PlayButton", this.startGame, this);
            // playButton.input.priorityID = 1;
            // playButton.anchor.set(0.5);
            //
            // var optionButton = this.game.add.button(this.game.width*0.5,this.game.height*0.6,
            //     "optionButton", this.startGame, this);
            // optionButton.input.priorityID = 1;
            // optionButton.anchor.set(0.5);
            //
            this.menuSound = this.game.add.sound("menuSound");
            this.guideButton = this.game.add.button(this.game.width * 0.50, this.game.height * 0.5, "GuideButton", this.guideGame, this);
            this.guideButton.input.priorityID = 1;
            this.guideButton.anchor.set(0.5);
            this.guideButton.inputEnabled = true;
            this.guideButton.events.onInputOver.add(function () {
                _this.menuSound.play();
            }, this);
            this.optionButton = this.game.add.button(this.game.width * 0.51, this.game.height * 0.66, "AboutButton", this.aboutGame, this);
            this.optionButton.input.priorityID = 1;
            this.optionButton.anchor.set(0.5);
            this.optionButton.inputEnabled = true;
            this.optionButton.events.onInputOver.add(function () {
                _this.menuSound.play();
            }, this);
            this.backButton = this.game.add.button(this.game.width * 0.5, this.game.height * 0.85, "BackButton", this.exitGame, this);
            this.backButton.input.priorityID = 1;
            this.backButton.anchor.set(0.5);
            this.backButton.inputEnabled = true;
            this.backButton.events.onInputOver.add(function () {
                _this.menuSound.play();
            }, this);
            this.saw1 = this.game.add.image(100, 100, "bloody_saw");
            this.saw1.anchor.set(0.5);
            this.saw1.scale.set(0.3);
            this.saw2 = this.game.add.image(1130, 500, "bloodier_saw");
            this.saw2.anchor.set(0.4);
            this.saw2.scale.set(0.5);
            this.saw3 = this.game.add.image(50, 600, "bloodier_saw");
            this.saw3.scale.set(0.5);
            this.sawGroup = this.game.add.group();
            this.sawGroup.addMultiple([this.saw1, this.saw2, this.saw3]);
            var bloodEmitter = new MonkeyRun.BloodEmitter(this.game, 50, 1000);
            bloodEmitter.emitter.x = this.game.width * 0.10;
            bloodEmitter.emitter.y = this.game.height * 0.2;
            bloodEmitter.emitter.start(false, 1000, 0, 5000, false);
            var bloodEmitter2 = new MonkeyRun.BloodEmitter(this.game, 80, 1000);
            bloodEmitter2.emitter.x = this.game.width * 0.88;
            bloodEmitter2.emitter.y = this.game.height * 0.8;
            bloodEmitter2.emitter.start(false, 1000, 0, 5000, false);
            this.game.world.bringToTop(this.sawGroup);
        };
        OptionMenu.prototype.update = function () {
            this.saw1.rotation += 0.02;
            this.saw2.rotation += 0.05;
            this.saw3.rotation += 0.02;
        };
        OptionMenu.prototype.exitGame = function () {
            this.game.state.start("Menu");
            //this.game.destroy();
        };
        OptionMenu.prototype.guideGame = function () {
            this.game.state.start("GuideMenu");
            //this.game.destroy();
        };
        OptionMenu.prototype.aboutGame = function () {
            this.game.state.start("AboutMenu");
            //this.game.destroy();
        };
        return OptionMenu;
    }(Phaser.State));
    MonkeyRun.OptionMenu = OptionMenu;
})(MonkeyRun || (MonkeyRun = {}));
