/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="../GraphicUtils/Banana.ts"/>
///<reference path="..\GraphicUtils\ParallaxBackground.ts"/>
///<reference path="Level.ts"/>
module MonkeyRun{
    export class LevelOne extends Level{
        bananaHanger:ParallaxBackground;

        bananaCollection: Array<Banana>;
        randomBananaSpawnTime:number;

        constructor(game:Phaser.Game){
            super(game);
        }

        create(difficulty:Difficulty){
            this.levelGroup = this.game.add.group();
            this.background = new ParallaxBackground(this.game, "slaughter_background", 2.5, -100, this.levelGroup);
            this.bananaHanger = new ParallaxBackground(this.game,"platform",4,-45,this.levelGroup);

            this.bananaCollection = [];
            this.randomBananaSpawnTime = this.game.time.now;
            this.ground = new ParallaxBackground(this.game,"ground", difficulty.levelSpeed,586, this.levelGroup);
            super.create(difficulty);

        }

        update(killerCollection:KillerCollection, monkey:Monkey, difficulty:Difficulty){
            super.update(killerCollection,monkey,difficulty);
            this.bananaHanger.update();
            this.spawnBanana();
            this.updateBananas(killerCollection);
            this.spawnPlatform("platformIndoor1",difficulty);
            this.updatePlatforms(monkey, difficulty);
            this.spawnWall("wallIndoor",difficulty);
            this.updateWalls(monkey, difficulty);
        }

        spawnBanana(){
            if(this.game.time.now > this.randomBananaSpawnTime){
                this.randomBananaSpawnTime = this.game.time.now + RNG(3,6)*1000;
                var banana = new Banana(this.game, "banana", 4, 50, this.levelGroup);
                this.bananaCollection.push(banana);
                this.levelGroup.addChildAt(banana.sprite, 6);
            }
        }

        updateBananas(killerCollection:KillerCollection){
            this.bananaCollection.forEach((banana)=>{
                banana.update(killerCollection);
                if(banana.sprite.position.x <=-banana.sprite.width){
                    banana.sprite.alpha = 0;
                    banana.sprite.destroy();
                }
            });
            if(this.bananaCollection[0] && this.bananaCollection[0].sprite.alpha === 0){
                this.bananaCollection.splice(0,1);
            }


        }
    }
}