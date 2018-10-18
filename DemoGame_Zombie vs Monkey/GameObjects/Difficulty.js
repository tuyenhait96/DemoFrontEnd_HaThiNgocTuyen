var MonkeyRun;
(function (MonkeyRun) {
    var Difficulty = /** @class */ (function () {
        function Difficulty(index, rngChestLow, rngChestHigh, rngZom1Low, rngZom1High, zo1Speed, rngPlatformLow, rngPlatformHigh, rngWallLow, rngWallHigh, rngZom2Low, rngZom2High, Zom2Speed, rngZom3Low, rngZom3High, Zom3Speed, levelSpeed) {
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
        return Difficulty;
    }());
    MonkeyRun.Difficulty = Difficulty;
})(MonkeyRun || (MonkeyRun = {}));
