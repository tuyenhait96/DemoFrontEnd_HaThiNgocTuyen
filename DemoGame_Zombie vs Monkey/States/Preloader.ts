/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../States/Game.ts"/>
/// <reference path="../States/Boot.ts"/>
///<reference path="..\GraphicUtils\BloodEmitter.ts"/>

module MonkeyRun {
    export class Preloader extends Phaser.State {
        saw:Phaser.Sprite;

        preload() {
//Menu
            this.game.load.image("MainScreen", "Graphics/Boot/main_screen.png");
            this.game.load.image("OptionScreen", "Graphics/Boot/main_screen2.png");
            this.game.load.image("GuideScreen", "Graphics/Boot/guide_screen.png");
            this.game.load.image("PlayButton", "Graphics/Boot/play_butt.png");
            this.game.load.image("QuitButton", "Graphics/Boot/quit_butt.png");
            this.game.load.image("BackButton", "Graphics/Boot/back_butt.png");
            this.game.load.image("AboutButton", "Graphics/Boot/about_butt.png");
            this.game.load.image("OptionButton", "Graphics/Boot/option_butt.png");
            this.game.load.image("GuideButton", "Graphics/Boot/guide_butt.png");
            this.game.load.image("GuideOption", "Graphics/Boot/guide_option.png");
            this.game.load.image("GuideKill", "Graphics/Boot/guide_kill.png");
            this.game.load.image("GuideBest", "Graphics/Boot/guide_best.png");
            this.game.load.image("Field", "Graphics/Boot/field.png");

            //Level 1
            this.game.load.image("sky", "Graphics/Game/Backgrounds/Level 1/sky.png");
            this.game.load.image("floor_outdoor", "Graphics/Game/Backgrounds/Level 1/floor_outdoor.png");
            this.game.load.image("grass", "Graphics/Game/Backgrounds/Level 1/grass.png");
            this.game.load.image("tree", "Graphics/Game/Backgrounds/Level 1/tree.png");
            this.game.load.image("rock1", "Graphics/Game/Backgrounds/Level 1/rock1.png");
            this.game.load.image("rock2", "Graphics/Game/Backgrounds/Level 1/rock2.png");

            //Level 2
            this.game.load.image("banana", "Graphics/Game/Backgrounds/Level 2/banana.png");
            this.game.load.image("slaughter_background", "Graphics/Game/Backgrounds/Level 2/background.png");
            this.game.load.image("platform", "Graphics/Game/Backgrounds/Level 2/platform_top.png");
            this.game.load.image("ground", "Graphics/Game/Backgrounds/Level 2/floor_slaughter.png");

            //Killer Collection
            this.game.load.image("default_saw", "Graphics/Game/Saws/default_saw.png");
            this.game.load.image("bloody_saw", "Graphics/Game/Saws/bloody_saw.png");

            //Particles
            this.game.load.image("bloody_bone", "Graphics/Game/Particles/bloody-bone.png");
            this.game.load.image("bone", "Graphics/Game/Particles/bone.png");
            this.game.load.image("burger", "Graphics/Game/Particles/burger.png");
            this.game.load.image("sausage", "Graphics/Game/Particles/sausage.png");
            this.game.load.image("knife", "Graphics/Game/Particles/knife.png");
            this.game.load.image("bullet", "Graphics/Game/Particles/bullet.png");
            this.game.load.image("grenade", "Graphics/Game/Particles/grenade.png");
            this.game.load.image("feather", "Graphics/Game/Particles/bird-feather.png");

            //Bird

            this.game.load.atlas("Bird", "Graphics/Game/Particles/Bird.png", "Graphics/Game/Particles/Bird.json");

            //Buttons
            this.game.load.image("grenadeButtonBW", "Graphics/Game/Buttons/GrenadeBW.png");
            this.game.load.image("grenadeButton", "Graphics/Game/Buttons/Grenade.png");
            this.game.load.image("knifeButtonBW", "Graphics/Game/Buttons/ChopperBW.png");
            this.game.load.image("knifeButton", "Graphics/Game/Buttons/Chopper.png");
            this.game.load.image("shotgunButtonBW", "Graphics/Game/Buttons/ShotgunBW.png");
            this.game.load.image("shotgunButton", "Graphics/Game/Buttons/Shotgun.png");
            this.game.load.image("gmoButtonBW", "Graphics/Game/Buttons/GmoBW.png");
            this.game.load.image("gmoButton", "Graphics/Game/Buttons/Gmo.png");

            //Chests
            this.game.load.atlas("Chests", "Graphics/Game/Chests/ChestsAtlas.png", "Graphics/Game/Chests/ChestsAtlas.json");

            //Gameover
            this.game.load.image("gameOver1", "Graphics/GameOver/game_over_1.png");
            this.game.load.image("gameOver2", "Graphics/GameOver/game_over_2.png");

            this.game.load.image("platformIndoor1", "Graphics/Game/Platforms/platform_indoor_1.png");
            this.game.load.image("platformIndoor2", "Graphics/Game/Platforms/platform_indoor_2.png");
            this.game.load.image("platformOutdoor", "Graphics/Game/Platforms/platform_outdoor.png");
            this.game.load.image("wallIndoor", "Graphics/Game/Platforms/wall_indoor.png");
            this.game.load.image("wallOutdoor", "Graphics/Game/Platforms/wall_outdoor.png");

            // Audio
            this.game.load.audio("gmoSound","Graphics/Sounds/gmoSound.wav");
            this.game.load.audio("knifeSound","Graphics/Sounds/knifeSound.wav");
            this.game.load.audio("shotgunSound","Graphics/Sounds/shotgunSound.wav");
            this.game.load.audio("grenadeSound","Graphics/Sounds/grenadeSound.wav");
            this.game.load.audio("menuSound","Graphics/Sounds/menuSound.wav");
            this.game.load.audio("jumpSound","Graphics/Sounds/jump.wav");
            this.game.load.audio("inGameMenuSound","Graphics/Sounds/inGame.wav");
            this.game.load.audio("level1Sound","Graphics/Sounds/level1Sound.wav");
            this.game.load.audio("level2Sound","Graphics/Sounds/level2Sound.wav");
            this.game.load.audio("collideSpriteSound","Graphics/Sounds/collideSprite.wav");
            this.game.load.audio("pickupChestSound","Graphics/Sounds/pickupChestSound.wav");
            this.game.load.audio("flowChestSound","Graphics/Sounds/flowChestSound.wav");
            this.game.load.audio("pickupKnifeSound","Graphics/Sounds/pickupKnifeSound.wav");
            this.game.load.audio("dieHealthSound","Graphics/Sounds/dieHealthSound.wav");
            this.game.load.audio("pauseSound","Graphics/Sounds/pauseSound.wav");
            this.game.load.audio("grenadeSprite","Graphics/Sounds/grenadeSprite.wav");
            this.game.load.audio("knifeSprite","Graphics/Sounds/knifeSprite.wav");
            this.game.load.audio("gmoThrow","Graphics/Sounds/gmoThrow.wav");
            this.game.load.audio("gameOver","Graphics/Sounds/gameOver.wav");
        }

        create() {
            //this.game.load.onLoadComplete.add((...));
            this.game.time.events.add(1000, ()=> {
                //this.game.state.start("GameOver",false,false, 0, 5);
                this.game.state.start("Menu");
            });


            var loadingStyle = {fill: "#990000"};
            var loadingText = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, "LOADING", loadingStyle);
            loadingText.font = "GROBOLD";
            loadingText.anchor.set(0.5, 0.5);
            loadingText.fontSize = 90;
            loadingText.fontWeight = "normal";
            loadingText.strokeThickness=3;
            loadingText.stroke = '#ffffff';

            var bloodEmitter = new BloodEmitter(this.game,50,1000);
            bloodEmitter.emitter.x = this.game.width*0.5;
            bloodEmitter.emitter.y = this.game.height*0.4;
            bloodEmitter.emitter.start(false,2000,0,5000,false);

            this.saw = this.game.add.sprite(this.game.width*0.5,this.game.height*0.3,"bloodier_saw");
            this.saw.scale.set(0.5);
            this.saw.anchor.set(0.5);

        }

        update(){
            this.saw.rotation+=0.04;
        }

    }
}