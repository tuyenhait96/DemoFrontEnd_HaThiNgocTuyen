/// <reference path="../Lib/phaser.d.ts"/>
module MonkeyRun{
    export class Boot extends Phaser.State{

        preload(){
            this.game.load.image("PreloaderBackground", "Graphics/Boot/Background.png");
            this.game.load.image("bloodier_saw", "Graphics/Game/Saws/bloodier_saw.png");

            //Monkey
            this.game.load.atlas("Monkey", "Graphics/Game/Monkey/Monkey.png", "Graphics/Game/Monkey/Monkey.json");
            this.game.load.image("MonkeyHead","Graphics/Game/Monkey/MonkeyHead.png");

            //Zom1
            this.game.load.atlas("Zom1", "Graphics/Game/Zom1/Zom1.png", "Graphics/Game/Zom1/Zom1.json");

            //Zombie
            this.game.load.atlas("Zom2", "Graphics/Game/Zom2/Zom2.png", "Graphics/Game/Zom2/Zom2.json");
        }

        create(){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.game.scale.forceLandscape = true;
            //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            //this.game.scale.startFullScreen();
            var bootLogo:Phaser.Image = this.game.add.image(this.game.width*0.5, this.game.height*0.5,"PreloaderBackground");
            bootLogo.anchor.set(0.5,0.5);
            this.game.time.events.add(500,()=>{
               this.game.state.start("Preloader",false,false,5,12321,"asdas");
            },this);
        }
    }
}