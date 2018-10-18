/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="..\GraphicUtils\ParallaxBackground.ts"/>
///<reference path="KillerCollection.ts"/>
///<reference path="..\GameObjects\Difficulty.ts"/>
module MonkeyRun {
    export class Level {
        game:Phaser.Game;

        background:ParallaxBackground;
        ground:ParallaxBackground;
        levelGroup:Phaser.Group;

        walls:Array<Phaser.Sprite>;
        platforms:Array<Phaser.Sprite>;

        randomWallSpawnTime:number;
        randomPlatformSpawnTime:number;

        constructor(game:Phaser.Game) {
            this.game = game;
        }

        create(difficulty:Difficulty) {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.enable(this.ground.image);
            this.game.physics.enable(this.ground.secondImage);
            this.game.physics.arcade.gravity.y = 1200;
            this.ground.image.body.immovable = true;
            this.ground.image.body.moves = false;
            this.ground.secondImage.body.immovable = true;
            this.ground.secondImage.body.moves = false;

            this.walls = [];
            this.platforms = [];

            this.randomWallSpawnTime = this.game.time.now;
            this.randomPlatformSpawnTime = this.game.time.now;


        }

        update(killerCollection:KillerCollection, monkey:Monkey, difficulty:Difficulty) {
            this.ground.update();
            this.background.update();
        }

        spawnPlatform(key:string, difficulty:Difficulty) {
            if (this.randomPlatformSpawnTime + 1500 < this.game.time.now) {
                this.randomPlatformSpawnTime = this.game.time.now + RNG(difficulty.rngPlatformLow, difficulty.rngPlatformHigh);
                var rngPlatformLevel = (this.game.height - 180) - Math.floor(RNG(1, 3))* 180;
                var platform = this.game.add.sprite(this.game.width, rngPlatformLevel, key);
                //this.levelGroup.addChildAt(platform, 6);
                this.levelGroup.bringToTop(platform);
                this.game.physics.arcade.enable(platform);
                platform.scale.set(0.5);
                platform.body.checkCollision.up = true;
                platform.body.checkCollision.down = false;
                platform.body.checkCollision.left = false;
                platform.body.checkCollision.right = false;

                platform.body.immovable = true;
                platform.body.moves=false;

                this.platforms.push(platform);
            }
        }

        updatePlatforms(monkey:Monkey, difficulty:Difficulty){
            this.platforms.forEach((platform)=>{
               platform.position.x -=difficulty.levelSpeed;
                this.game.physics.arcade.collide(monkey.states, platform, ()=>{
                    monkey.changeToRunning();


                });
                if(platform.position.x < -platform.width){
                    this.platforms.splice(this.platforms.indexOf(platform),1);
                    platform.destroy();
                }
            },this);
        }

        spawnWall(key,difficulty){
            if(this.randomWallSpawnTime+2300<this.game.time.now){
                this.randomWallSpawnTime = this.game.time.now + RNG(difficulty.rngWallLow,difficulty.rngWallHigh);
                var wall = this.game.add.sprite(this.game.width, 586,key);
                wall.anchor.set(0,1);
                //this.levelGroup.addChildAt(wall,8);
                this.levelGroup.bringToTop(wall);
                this.game.physics.arcade.enable(wall);
                wall.scale.set(RNG(0.7,0.8));
                wall.body.immovable = true;
                wall.body.moves = false;

                this.walls.push(wall);
            }
        }

        updateWalls(monkey:Monkey, difficulty:Difficulty) {
            if (IS_CHEATING == true)
                return;
            if (monkey.currentState !== MonkeyStates.GMO) {
                this.walls.forEach((wall) => {
                    wall.position.x -= difficulty.levelSpeed;
                    this.game.physics.arcade.collide(monkey.states, wall, () => {
                        monkey.changeToRunning();

                        if (wall.position.x < -wall.width) {
                            this.walls.splice(this.walls.indexOf(wall), 1);
                            wall.destroy();
                        }
                    })
                });
            }
            else {
                this.walls.forEach((wall) => {
                    wall.position.x -= difficulty.levelSpeed;
                    // this.game.physics.arcade.collide(monkey.states,wall,()=>{
                    //     monkey.changeToRunning();
                    //
                    //     if(wall.position.x< -wall.width){
                    //         this.walls.splice(this.walls.indexOf(wall),1);
                    //         wall.destroy();
                    //     }
                    // })
                });
            }
        }



    }
}