// 障碍物基类对象，继承自TankObject
Barrier = function () {
    this.DefenVal = 1;  // 防御力
    this.CanBeAttacked = true;  // 是否可以被攻击
}
Barrier.prototype = new TankObject();
// 墙
WallB = function () { }
WallB.prototype = new Barrier();
// 空地
EmptyB = function () {
    this.CanAcross = true;  // 可被穿过
    this.CanBeAttacked = false;  
}
EmptyB.prototype = new Barrier();
// 河流
RiverB = function () {
    this.DefenVal = 0;
    this.CanBeAttacked = false; // 优先取对象的成员，继承自父类的会被覆盖。
}
RiverB.prototype = new Barrier();
// 钢
SteelB = function () {
    this.DefenVal = 3;
}
SteelB.prototype = new Barrier();
// 草丛对象
TodB = function () {
    this.CanBeAttacked = false;
    this.DefenVal = 0;
    this.CanAcross = true;
}
TodB.prototype = new Barrier();
// 总部
PodiumB = function () {
    this.DefenVal = 5;
}
PodiumB.prototype = new Barrier();



