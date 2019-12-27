//tank对象 继承自Mover
Tank = function () {
    this.BombNum = 2;
    this.BombUsed = 0;
    this.LifeNum = 1;
    //this.BobArray = [];
}


Tank.prototype = new Mover();

// 发射炮弹方法
Tank.prototype.Shot = function (battleField) {
    // 炮弹不足，停止发射
    if (this.BombUsed >= this.BombNum) { return false; }
    var bomb = new Bomb();
    bomb.Load(this.XPosition, this.YPosition);
    this.BombUsed += 1;
    bomb.Owner = this;
    bomb.Direction = this.Direction;
    bomb.Move(battleField);
}


// 敌人坦克对象
EnimyTank = function () {
    this.Direction = EnumDirection.Down;
    this.BombNum = 1;
    this.UI = UtilityClass.CreateE("div", "", "etank", document.getElementById("divMap"));
    this.UI.style.backgroundPosition = "0 -" + this.Direction * 40 + "px";

}

EnimyTank.prototype = new Tank;





// 创建玩家坦克,继承自tank对象
SelfTank = function () {
    this.UI = UtilityClass.CreateE("div", "", "itank", document.getElementById("divMap"));
    this.MovingState = false;
    this.Speed = 4;
}
SelfTank.prototype = new Tank();
