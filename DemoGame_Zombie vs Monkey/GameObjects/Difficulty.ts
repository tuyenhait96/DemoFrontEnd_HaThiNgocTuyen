module MonkeyRun {
    export class Difficulty {
        index : number;
        rngChestLow : number;
        rngChestHigh : number;
        rngZom1Low : number;
        rngZom1High : number;
        zo1Speed : number;
        rngZom2Low : number;
        rngZom2High : number;
        Zom2Speed : number;
        rngZom3Low:number;
        rngZom3High:number;
        Zom3Speed:number;

        rngPlatformHigh: number;
        rngPlatformLow: number;
        rngWallLow : number;
        rngWallHigh : number;


        levelSpeed: number;

        constructor(index, rngChestLow, rngChestHigh, rngZom1Low, rngZom1High, zo1Speed, rngPlatformLow,
                    rngPlatformHigh, rngWallLow, rngWallHigh,rngZom2Low, rngZom2High, Zom2Speed,rngZom3Low, rngZom3High, Zom3Speed, levelSpeed){
            this.index = index;
            this.rngChestLow = rngChestLow;
            this.rngChestHigh = rngChestHigh;
            this.rngZom1Low = rngZom1Low;
            this.rngZom1High = rngZom1High;
            this.rngZom2Low = rngZom2Low;
            this.rngZom2High = rngZom2High;
            this.Zom2Speed = Zom2Speed;
            this.rngZom3Low = rngZom3Low;
            this.rngZom3High = rngZom3High;
            this.Zom3Speed = Zom3Speed;
            this.zo1Speed = zo1Speed;

            this.rngPlatformLow = rngPlatformLow;
            this.rngPlatformHigh = rngPlatformHigh;
            this.rngWallLow = rngWallLow;
            this.rngWallHigh = rngWallHigh;

            this.levelSpeed = levelSpeed;

        }
    }
}