// 碰撞检测对象 继承自顶级对象
HitTestObject = function () { }

HitTestObject.prototype = new TankObject();
// 碰撞检测 参数为地图对象 返回true则不能移动
HitTestObject.prototype.HitTest = function (battleField) {

    var nextObj = this.GetNextBattleFieldCell(battleField);
    if (nextObj == null) {
        return true;// 场景越界
    }
    // 检测是否是障碍物
    if (nextObj.obj instanceof Barrier) {

        if (nextObj.obj instanceof EmptyB) {
            // 判断是否被其他坦克占用  Tank继承自Mover
            return nextObj.occupier instanceof Mover;
        }
        return !nextObj.obj.CanAcross;
    }


}

// 返回对象移动下个位置的地图对象
HitTestObject.prototype.GetNextBattleFieldCell = function (battleField) {

    if (this.Direction == EnumDirection.Up && this.YPosition == 0 ||
        this.Direction == EnumDirection.Down && this.YPosition == 12 ||
        this.Direction == EnumDirection.Left && this.XPosition == 0 ||
        this.Direction == EnumDirection.Right && this.XPosition == 12
        ) {
        return null;/* 场景越界 */
    }

    var y = this.YPosition;
    var x = this.XPosition;
    var nextAxes = this.GetNextAxes(x, y);
    return battleField[nextAxes.y][nextAxes.x];
}

// 得到对象的下个位置的坐标
HitTestObject.prototype.GetNextAxes = function (x, y) {
    var point = { x: x, y: y };
    switch (this.Direction + "") {    // 加空字符转换为字符串类型
        case EnumDirection.Up:
            point.y--; break;
        case EnumDirection.Right:
            point.x++; break;
        case EnumDirection.Down:
            point.y++; break;
        case EnumDirection.Left:
            point.x--; break;
    }
    return point;
}


HitTestObject.prototype.OnHitTest = function (battleField) {
    //  预留给炮弹对象重写
}