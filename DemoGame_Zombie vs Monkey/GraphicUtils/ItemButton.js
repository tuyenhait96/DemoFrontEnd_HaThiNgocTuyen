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
///<reference path="..\GameObjects\Monkey.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var ItemButton = /** @class */ (function (_super) {
        __extends(ItemButton, _super);
        function ItemButton(game, x, y, key, ammo, monkey, monkeyAnimation) {
            var _this = this;
            _this.game = game;
            _this.spriteBW = _this.game.add.image(x, y, key + "BW");
            _this.spriteBW.anchor.set(0.5, 0.5);
            _this.ammo = ammo;
            _this.buttonPressed = false;
            _this = _super.call(this, _this.game, x, y, key, function () {
                if (key !== "gmoButton") {
                    _this.throwItem(monkey, monkeyAnimation);
                }
                else {
                    _this.startGMO();
                }
            }, _this) || this;
            _this.anchor.set(0.5, 0.5);
            _this.input.priorityID = 1;
            _this.game.add.existing(_this);
            var ammoTextStyle = { fill: "#8B1914" };
            _this.ammoText = _this.game.add.text(x, y, _this.ammo.toString(), ammoTextStyle);
            _this.ammoText.anchor.set(0, 0);
            _this.ammoText.font = "GROBOLD";
            _this.ammoText.fontSize = 40;
            _this.ammoText.fontWeight = "normal";
            _this.ammoText.strokeThickness = 8;
            _this.ammoText.stroke = "#FFF";
            if (_this.ammo === 0) {
                _this.spriteBW.alpha = 1;
                _this.alpha = 0;
            }
            else {
                _this.spriteBW.alpha = 0;
                _this.alpha = 1;
            }
            return _this;
        }
        ItemButton.prototype.throwItem = function (monkey, monkeyAnimation) {
            var _this = this;
            if (this.ammo > 0) {
                monkey.changeAnimation(monkeyAnimation);
                monkey.states.animations.currentAnim.onComplete.addOnce(function () { _this.buttonPressed = true; }, this);
                monkey.currentState = MonkeyRun.MonkeyStates.THROWING_ITEM;
                this.ammo--;
                this.ammoText.text = this.ammo.toString();
                if (this.ammo === 0) {
                    this.spriteBW.alpha = 1;
                    this.alpha = 0;
                }
            }
        };
        ItemButton.prototype.startGMO = function () {
            if (this.ammo > 0) {
                this.buttonPressed = true;
                this.ammo--;
                this.ammoText.text = this.ammo.toString();
                if (this.ammo === 0) {
                    this.spriteBW.alpha = 1;
                    this.alpha = 0;
                }
            }
        };
        ItemButton.prototype.pickUpItem = function (amount) {
            this.ammo += amount;
            this.ammoText.text = this.ammo.toString();
            this.alpha = 1;
            this.spriteBW.alpha = 0;
            this.pickupChestSound = this.game.add.sound("pickupChestSound");
            this.pickupChestSound.play();
        };
        return ItemButton;
    }(Phaser.Button));
    MonkeyRun.ItemButton = ItemButton;
})(MonkeyRun || (MonkeyRun = {}));
