/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="States/Preloader.ts"/>
///<reference path="States\Menu.ts"/>
///<reference path="States\GameOver.ts"/>
///<reference path="States\OptionMenu.ts"/>
///<reference path="States\GuideMenu.ts"/>
///<reference path="States\AboutMenu.ts"/>
function RNG(from,to){
    return Math.random()*(to-from)+from;
}

module MonkeyRun {
    class MonkeyRun extends Phaser.Game{
        game: Phaser.Game;
        constructor(width?:number, height?:number) {
            var dpr = devicePixelRatio || 1;

            if (!width) {
                width = screen.width * dpr;
            }
            if (!height) {
                height = screen.height * dpr;
            }
            super(width, height, Phaser.CANVAS, 'phaser-div', {create: this.create});
        }


        create() {
            this.game.stage.backgroundColor = "#FFF";
            //this.game.scale.maxWidth = 1280;
            //this.game.scale.maxHeight = 720;
            this.game.state.add("Preloader", Preloader, false);
            this.game.state.add("Boot", Boot, false);
            this.game.state.add("Menu", Menu, false);
            this.game.state.add("OptionMenu", OptionMenu, false);
            this.game.state.add("GuideMenu", GuideMenu, false);
            this.game.state.add("AboutMenu", AboutMenu, false);
            this.game.state.add("Game", Game, false);
            this.game.state.add("GameOver",GameOver,false);

            this.game.state.start("Boot");

        }
    }

    window.onload = () => {
        new MonkeyRun(1280,720);
    };
}