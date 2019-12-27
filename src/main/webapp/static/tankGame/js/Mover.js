// 移动对象，继承自碰撞检测对象
Mover = function () {
    this.Direction = EnumDirection.Up;
    this.Speed = 1;
}
Mover.prototype = new HitTestObject();
Mover.prototype.Move = function (battleField) {

    if (this.lock) {
        return;/* 停用或者尚在步进中,操作无效 */
    }

    // 敌人坦克有30%几率变换方向
    if ((this instanceof EnimyTank) && Math.random() * 100 > 30) {
        this.Direction = parseInt(Math.random() * 4);
    }

    // 根据方向设置坦克的背景图片
    this.UI.style.backgroundPosition = "0 -" + this.Direction * 40 + "px";

    // 碰撞检测
    if (this.HitTest(battleField)) { return this.OnHitTest(battleField); }

    // 如果方向是上和下，vp就是top；如果方向是上和左，val就是-1
    var vp = ["top", "left"][((this.Direction == EnumDirection.Up) || (this.Direction == EnumDirection.Down)) ? 0 : 1];
    var val = ((this.Direction == EnumDirection.Up) || (this.Direction == EnumDirection.Left)) ? -1 : 1;
    this.lock = true;/* 加锁 */
    // 把当前对象保存到This 闭包，Interver函数中的this就为window对象了。
    var This = this;
    // 记录对象移动起始位置
    var startmoveP = parseInt(This.UI.style[vp]);
    var xp = This.XPosition, yp = This.YPosition;
    // 返回坦克的下一个位置
    var nextPoint = this.GetNextAxes(xp, yp);

    var subMove = setInterval(function () {
        if (This instanceof EnimyTank) {
            // 如果敌人坦克被销毁，则停止步进
            if (This.UI == null) {
                clearInterval(subMove);
            }
        }
        // 开始移动，每次移动5px
        if (This.UI) {
            This.UI.style[vp] = parseInt(This.UI.style[vp]) + 5 * val + "px";
        }
        // 每次移动一个单元格 40px
        if (This.UI && Math.abs((parseInt(This.UI.style[vp]) - startmoveP)) >= 40) {

            clearInterval(subMove);
            This.lock = false;/* 解锁,允许再次步进 */
            // 记录对象移动后在表格中的位置
            This.XPosition = Math.round(This.UI.offsetLeft / 40);
            This.YPosition = Math.round(This.UI.offsetTop / 40);

            if (!(This instanceof Bomb)) {

                battleField[nextPoint.y][nextPoint.x].occupier = This;  /*占用新位置*/
                // 清空对象原来位置占有
                battleField[yp][xp].occupier = null;
            }

            // 炮弹继续移动
            if (This instanceof Bomb) { This.Move(battleField) }
        }
    }, 80 - this.Speed * 10);

}