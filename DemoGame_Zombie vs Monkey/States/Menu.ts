/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\GraphicUtils\BloodEmitter.ts"/>
///<reference path="..\GameObjects\Monkey.ts"/>
///<reference path="..\GameObjects\Zom1.ts"/>
///<reference path="..\Levels\KillerCollection.ts"/>

module MonkeyRun{
    export class Menu extends Phaser.State{
        saw1:Phaser.Image;
        saw2:Phaser.Image;
        saw3:Phaser.Image;

        menuSound: Phaser.Sound;
        inGameMenuSound: Phaser.Sound;
        sawGroup:Phaser.Group;
        changeableValue: number;
        animation: Phaser.Animation;
        buttonPressed : boolean;
        playButton: Phaser.Button;
        optionButton: Phaser.Button;
        quitButton: Phaser.Button;
        create(){
            this.game.add.image(0,0,"MainScreen");
            this.menuSound = this.game.add.sound("menuSound");
            this.playButton = this.game.add.button(this.game.width*0.52,this.game.height*0.5,
                "PlayButton", this.startGame, this);
            this.playButton.input.priorityID = 1;
            this.playButton.anchor.set(0.5);
            this.playButton.inputEnabled = true;
            this.playButton.events.onInputOver.add(()=>{
                this.menuSound.play();
            },this);

            this.optionButton = this.game.add.button(this.game.width*0.51,this.game.height*0.65,
                "OptionButton", this.optionGame, this);
            this.optionButton.input.priorityID = 1;
            this.optionButton.anchor.set(0.5);
            this.optionButton.inputEnabled = true;
            this.optionButton.events.onInputOver.add(()=>{
                this.menuSound.play();
            },this);

            this.quitButton = this.game.add.button(this.game.width*0.5, this.game.height*0.85,
                "QuitButton", this.exitGame, this);
            this.quitButton.input.priorityID = 1;
            this.quitButton.anchor.set(0.5);
            this.quitButton.inputEnabled = true;
            this.quitButton.events.onInputOver.add(()=>{
                this.menuSound.play();
            },this);
            this.saw1=this.game.add.image(100,100,"bloody_saw");
            this.saw1.anchor.set(0.5);
            this.saw1.scale.set(0.3);

            this.saw2=this.game.add.image(1130,500,"bloodier_saw");
            this.saw2.anchor.set(0.4);
            this.saw2.scale.set(0.5);

            this.saw3=this.game.add.image(50,600,"bloodier_saw");
            this.saw3.scale.set(0.5);

            this.sawGroup=this.game.add.group();
            this.sawGroup.addMultiple([this.saw1,this.saw2,this.saw3])

            var bloodEmitter = new BloodEmitter(this.game,50,1000);
            bloodEmitter.emitter.x = this.game.width*0.10;
            bloodEmitter.emitter.y = this.game.height*0.2;
            bloodEmitter.emitter.start(false,1000,0,5000,false);



            // var monkey=new Monkey(this.game);
            // monkey.states.position.set(250,500);
            // monkey.states.scale.set(1.4);
            //
            // monkey.states.anchor.set(0.5,0.5);
            //
            // //   ------------------ Làm cho monkey đứng yên
            // monkey.states.body.immovable=true;
            // monkey.states.body.moves=false;
            // // -----------------------------
            // monkey.changeAnimationRepeating("idle");
            //
            // var zom1=new Zom1(this.game,0);
            // zom1.states.position.set(1100,600);
            //
            // zom1.states.anchor.set(0.5,0.5);
            // zom1.states.scale.set(-1.4,1.4);
            // zom1.states.animations.play("idle",null,true);
            //
            // zom1.states.body.immovable=true;
            // zom1.states.body.moves=false;

            var bloodEmitter2 = new BloodEmitter(this.game,80,1000);
            bloodEmitter2.emitter.x = this.game.width*0.88;
            bloodEmitter2.emitter.y = this.game.height*0.8;
            bloodEmitter2.emitter.start(false,1000,0,5000,false);

            this.game.world.bringToTop(this.sawGroup);
            this.inGameMenuSound = this.game.add.sound("inGameMenuSound");
            this.changeableValue = 1;
                this.inGameMenuSound.play();
             //   this.inGameMenuSound._sound.playbackRate.value= this.changeableValue;
                this.changeableValue=0.02;
        }
        update(){
            this.saw1.rotation+=0.02;
            this.saw2.rotation+=0.05;
            this.saw3.rotation+=0.02;
        }
        startGame(){
            this.game.state.start("Game");
        }

        optionGame(){
            this.game.state.start("OptionMenu");
        }
        exitGame(){
            this.game.destroy();
        }
    }
}