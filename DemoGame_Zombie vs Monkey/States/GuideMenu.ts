/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\GraphicUtils\BloodEmitter.ts"/>
///<reference path="..\GameObjects\Monkey.ts"/>
///<reference path="..\GameObjects\Zom1.ts"/>

module MonkeyRun{
    export class GuideMenu extends Phaser.State{
        saw1:Phaser.Image;
        saw2:Phaser.Image;
        saw3:Phaser.Image;

        button : Phaser.Image;

        sawGroup:Phaser.Group;
        text:Phaser.Text;
        backButton: Phaser.Button;
        menuSound: Phaser.Sound;
        text2: Phaser.Text;

        create(){
            this.game.add.image(0,0,"GuideScreen");
            this.menuSound = this.game.add.sound("menuSound");

            this.backButton = this.game.add.button(this.game.width*0.8, this.game.height*0.8,
                "BackButton", this.exitGame, this);
            this.backButton.input.priorityID = 1;
            this.backButton.anchor.set(0.5);
            this.backButton.inputEnabled = true;
            this.backButton.events.onInputOver.add(()=>{
                this.menuSound.play();
            },this);
            this.saw1=this.game.add.image(1130,100,"bloody_saw");
            this.saw1.anchor.set(0.5);
            this.saw1.scale.set(0.3);

            this.button=this.game.add.image(this.game.width * 0.47,185,"GuideOption");
            this.button.anchor.set(0.5);
            this.button.scale.set(0.3);

            this.button=this.game.add.image(this.game.width * 0.50 ,347,"GuideKill");
            this.button.anchor.set(0.5);
            this.button.scale.set(0.3);


            this.button=this.game.add.image(this.game.width * 0.50 ,570,"GuideBest");
            this.button.anchor.set(0.5);
            this.button.scale.set(0.3);

            this.saw2=this.game.add.image(100,100,"bloodier_saw");
            this.saw2.anchor.set(0.4);
            this.saw2.scale.set(0.5);

            this.saw3=this.game.add.image(50,600,"bloodier_saw");
            this.saw3.scale.set(0.5);

            this.sawGroup=this.game.add.group();
            this.sawGroup.addMultiple([this.saw1,this.saw2,this.saw3])

            var bloodEmitter = new BloodEmitter(this.game,50,1000);
            bloodEmitter.emitter.x = this.game.width*0.88;
            bloodEmitter.emitter.y = this.game.height*0.2;
            bloodEmitter.emitter.start(false,1000,0,5000,false);

            var bloodEmitter2 = new BloodEmitter(this.game,80,1000);
            bloodEmitter2.emitter.x = this.game.width*0.09;
            bloodEmitter2.emitter.y = this.game.height*0.1;
            bloodEmitter2.emitter.start(false,1000,0,5000,false);

            this.game.world.bringToTop(this.sawGroup);



            var style = {fill: '#990000'};
            this.text = this.game.add.text(this.game.width * 0.23, 80, "Monkey dùng vật phẩm tiêu diệt Zombie", style);
            this.text = this.game.add.text(this.game.width * 0.5, 280, "Kill sẽ được cập nhật khi Monkey tiêu diệt 1 Zombie \n", style);
            this.text2 = this.game.add.text(this.game.width * 0.23, 420, "Màn hình GameOver sẽ lưu thành tích của người chơi lúc này \n tại KILLS lưu thành tích cao nhất tại BEST", style);
            this.text.anchor.set(0.5, 0.5);
            this.text.strokeThickness=10;
            this.text.stroke = '#ffffff';


        }
        update(){
            this.saw1.rotation+=0.02;
            this.saw2.rotation+=0.05;
            this.saw3.rotation+=0.02;
        }



        exitGame(){
            this.game.state.start("Menu");
            //this.game.destroy();
        }


    }
}