/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\GraphicUtils\BloodEmitter.ts"/>
///<reference path="..\GraphicUtils\Emitter.ts"/>
///<reference path="..\GraphicUtils\Saw.ts"/>
///<reference path="..\GameObjects\Monkey.ts"/>
var MonkeyRun;
(function (MonkeyRun) {
    var KillerCollection = /** @class */ (function () {
        function KillerCollection(game) {
            this.game = game;
        }
        KillerCollection.prototype.create = function () {
            this.killerGroup = this.game.add.group();
            this.gameOver = false;
            this.monkey = new MonkeyRun.Monkey(this.game);
            this.firstSaw = new MonkeyRun.Saw(this.game, "default_saw", "bloody_saw", "bloodier_saw", 0, 140, 0.4, this.killerGroup);
            this.secondSaw = new MonkeyRun.Saw(this.game, "default_saw", "bloody_saw", "bloodier_saw", 0, 530, 0.5, this.killerGroup);
            this.thirdSaw = new MonkeyRun.Saw(this.game, "default_saw", "bloody_saw", "bloodier_saw", 0, 320, 0.7, this.killerGroup);
            this.sawCollection = [];
            this.sawCollection.push(this.firstSaw);
            this.sawCollection.push(this.secondSaw);
            this.sawCollection.push(this.thirdSaw);
            this.burgerEmitter = new MonkeyRun.Emitter(this.game, 5, 200, ["burger"]);
            this.sausageEmitter = new MonkeyRun.Emitter(this.game, 5, 200, ["sausage"]);
            this.boneEmitter = new MonkeyRun.Emitter(this.game, 5, 500, ["bloody_bone", "bone"]);
            this.featherEmitter = new MonkeyRun.Emitter(this.game, 5, -1000, ["feather"]);
            this.bloodEmitter = new MonkeyRun.BloodEmitter(this.game, 5, 500);
            this.killerGroup.addMultiple([this.bloodEmitter.emitter, this.featherEmitter.emitter,
                this.boneEmitter.emitter, this.sausageEmitter.emitter, this.burgerEmitter.emitter]);
            this.score = 0;
            var killsTextStyle = { fill: "#990000" };
            this.killsText = this.game.add.text(100, this.game.height * 0.85, "KILLS: " + this.score.toString(), killsTextStyle);
            this.killsText.font = "GROBOLD";
            this.killsText.fontSize = 90;
            this.killsText.fontWeight = "normal";
            this.killerGroup.add(this.killsText);
            var healthBarStyle = { fill: "#990000" };
            this.healthBar = this.game.add.text(200, 20, "HEALTH: " + this.monkey.states.health, healthBarStyle);
            this.healthBar.font = "GROBOLD";
            this.healthBar.fontSize = 30;
            this.healthBar.fontWeight = "normal";
            this.killerGroup.add(this.healthBar);
            this.pause_label = this.game.add.text(10, 20, 'PAUSE', { font: "GROBOLD", fill: '#990000' });
            this.pause_label.inputEnabled = true;
            this.pause_label.fontSize = 30;
            this.killerGroup.add(this.pause_label);
            this.pause_label.stroke = '#ffffff';
            this.pauseGame();
            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        };
        KillerCollection.prototype.pauseGame = function () {
            this.pause_label.events.onInputDown.add(function (pauseSound) {
                // console.log("------ STATE PAUSE GAME ::: onInputUp EVENT:");
                // // When the pause button is pressed, we pause the game
                this.game.paused = true;
                var style = { fill: '#990000' };
                this.text = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, "PAUSE GAME!", style);
                this.text.anchor.set(0.5, 0.5);
                this.text.strokeThickness = 5;
                this.text.stroke = '#ffffff';
                var pauseSound = this.game.add.audio("menuSound");
                pauseSound.play();
            }, this);
            // Add a input listener that can help us return from being paused
            this.game.input.onDown.add(function () {
                // console.log("------ STATE PAUSE GAME ::: onDown EVENT:");
                if (this.game.paused) {
                    this.game.paused = false;
                    this.text.destroy();
                    //  this.pause_label = this.game.add.text(10, 10, 'Pause', {font: '24px Arial', fill: '#fff'});
                    var pauseSound = this.game.add.audio("menuSound");
                    pauseSound.play();
                }
            }, this);
        };
        KillerCollection.prototype.update = function () {
            this.sawCollection.forEach(function (saw) {
                saw.update();
            });
            this.burgerEmitter.update();
            this.sausageEmitter.update();
            this.boneEmitter.update();
            this.featherEmitter.update();
            this.healthBar.update();
        };
        KillerCollection.prototype.updateKillsText = function () {
            this.score++;
            this.killsText.text = "KILLS: " + this.score.toString();
        };
        KillerCollection.prototype.updateHealthBar = function () {
            this.monkey.states.health = this.monkey.states.health - 1;
            this.healthBar.text = "HEALTH: " + this.monkey.states.health;
        };
        return KillerCollection;
    }());
    MonkeyRun.KillerCollection = KillerCollection;
})(MonkeyRun || (MonkeyRun = {}));
