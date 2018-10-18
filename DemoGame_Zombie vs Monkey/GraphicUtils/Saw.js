/// <reference path="../Lib/phaser.d.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var Saw = /** @class */ (function () {
        function Saw(game, defaultKey, bloodyKey, bloodierKey, x, y, scale, group) {
            this.game = game;
            this.defaultImage = this.game.add.image(x, y, defaultKey, 0, group);
            this.defaultImage.anchor.set(0.5, 0.5);
            this.defaultImage.scale.set(scale, scale);
            this.bloodyImage = this.game.add.image(x, y, bloodyKey, 0, group);
            this.bloodyImage.anchor.set(0.5, 0.5);
            this.bloodyImage.scale.set(scale, scale);
            this.bloodyImage.alpha = 0;
            this.bloodierImage = this.game.add.image(x, y, bloodierKey, 0, group);
            this.bloodierImage.anchor.set(0.5, 0.5);
            this.bloodierImage.scale.set(scale, scale);
            this.bloodierImage.alpha = 0;
        }
        Saw.prototype.update = function () {
            this.defaultImage.rotation += 0.06;
            this.bloodyImage.rotation += 0.06;
            this.bloodierImage.rotation += 0.06;
        };
        //The idea is to tween the 3 images to alpha 0 or 1 depending on the case
        //State 1
        Saw.prototype.changeToDefaultImage = function () {
            this.defaultImage.alpha = 1;
            var bloodyTween = this.game.add.tween(this.bloodyImage);
            bloodyTween.to({ alpha: 0 }, 200, Phaser.Easing.Default, true);
            var bloodierTween = this.game.add.tween(this.bloodierImage);
            bloodierTween.to({ alpha: 0 }, 200, Phaser.Easing.Default, true);
        };
        //State 2
        Saw.prototype.changeToBloodyImage = function () {
            var _this = this;
            this.defaultImageEvent = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.changeToDefaultImage, this);
            if (this.bloodierImage.alpha === 1) {
                this.bloodyImage.alpha = 1;
                var bloodierTween = this.game.add.tween(this.bloodierImage);
                bloodierTween.to({ alpha: 0 }, 200, Phaser.Easing.Default, true);
            }
            else {
                var bloodyTween = this.game.add.tween(this.bloodyImage);
                bloodyTween.to({ alpha: 1 }, 200, Phaser.Easing.Default, true);
                bloodyTween.onComplete.add(function () {
                    _this.defaultImage.alpha = 0;
                });
                var bloodierTween = this.game.add.tween(this.bloodierImage);
                bloodierTween.to({ alpha: 0 }, 200, Phaser.Easing.Default, true);
            }
        };
        //State3
        Saw.prototype.changeToBloodierImage = function () {
            var _this = this;
            this.game.time.events.remove(this.defaultImageEvent);
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.changeToBloodyImage, this);
            var bloodierTween = this.game.add.tween(this.bloodierImage);
            bloodierTween.to({ alpha: 1 }, 200, Phaser.Easing.Default, true);
            bloodierTween.onComplete.add(function () {
                _this.bloodyImage.alpha = 0;
            });
        };
        Saw.prototype.triggerSaw = function () {
            if (this.defaultImage.alpha === 1) {
                this.changeToBloodyImage();
            }
            else if (this.bloodyImage.alpha === 1) {
                this.changeToBloodierImage();
            }
            else if (this.bloodierImage.alpha === 1) {
                this.changeToBloodierImage();
            }
        };
        return Saw;
    }());
    MonkeyRun.Saw = Saw;
})(MonkeyRun || (MonkeyRun = {}));
