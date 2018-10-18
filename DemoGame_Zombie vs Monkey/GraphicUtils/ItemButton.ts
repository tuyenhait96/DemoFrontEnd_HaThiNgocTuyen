/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\GameObjects\Monkey.ts"/>
module MonkeyRun{
    export class ItemButton extends Phaser.Button{
        ammo:number;
        spriteBW:Phaser.Image;
        ammoText:Phaser.Text;
        buttonPressed:boolean;
        pickupChestSound: Phaser.Sound;

        constructor(game:Phaser.Game,x:number, y:number, key:string, ammo:number, monkey:Monkey, monkeyAnimation:string){
            this.game = game;
            this.spriteBW = this.game.add.image(x,y,key+"BW");
            this.spriteBW.anchor.set(0.5,0.5);
            this.ammo = ammo;
            this.buttonPressed = false;
            super(this.game,x,y,key,()=>{
                if(key!=="gmoButton"){
                    this.throwItem(monkey, monkeyAnimation);
                }
                else{
                    this.startGMO();
                }
            },this);

            this.anchor.set(0.5,0.5);
            this.input.priorityID = 1;
            this.game.add.existing(this);

            var ammoTextStyle = {fill: "#8B1914"};
            this.ammoText = this.game.add.text(x,y, this.ammo.toString(), ammoTextStyle);
            this.ammoText.anchor.set(0,0);
            this.ammoText.font = "GROBOLD";
            this.ammoText.fontSize = 40;
            this.ammoText.fontWeight = "normal";
            this.ammoText.strokeThickness = 8;
            this.ammoText.stroke = "#FFF";

            if(this.ammo === 0 ){
                this.spriteBW.alpha = 1;
                this.alpha = 0;
            }

            else{
                this.spriteBW.alpha =0;
                this.alpha = 1;
            }
        }

        throwItem(monkey:Monkey, monkeyAnimation:string):void{
            if(this.ammo>0){
                monkey.changeAnimation(monkeyAnimation);
                monkey.states.animations.currentAnim.onComplete.addOnce(()=>{this.buttonPressed = true},this);
                monkey.currentState = MonkeyStates.THROWING_ITEM;
                this.ammo--;
                this.ammoText.text = this.ammo.toString();
                if(this.ammo ===0){
                    this.spriteBW.alpha = 1;
                    this.alpha = 0;
                }
            }
        }
        startGMO(){
            if(this.ammo>0){
                this.buttonPressed = true;
                this.ammo--;
                this.ammoText.text = this.ammo.toString();

                if(this.ammo ===0){
                    this.spriteBW.alpha = 1;
                    this.alpha = 0;
                }
            }
        }

        pickUpItem(amount:number){
            this.ammo += amount;
            this.ammoText.text = this.ammo.toString();
            this.alpha = 1;
            this.spriteBW.alpha = 0;
            this.pickupChestSound = this.game.add.sound("pickupChestSound");
            this.pickupChestSound.play();
        }

    }
}