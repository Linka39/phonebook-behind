//  炮弹对象,这个对象需要放在TANK对象前面，有先后顺序
Bomb = function () {
    this.Owner = null;
    this.Power = 1;
    this.Speed = 7;
}

Bomb.prototype = new Mover();
Bomb.prototype.Load = function (x, y) {
    // 创建炮弹对象，初始化位置
    this.UI = UtilityClass.CreateE("div", "", "bomb", document.getElementById("divMap"))
    this.SetPosition(x * 40, y * 40);   /*父类方法*/

}

// 重写HitTest方法
Bomb.prototype.HitTest = function (battleField) {
    var nextObj = this.GetNextBattleFieldCell(battleField);
    if (nextObj == null) {
        return true;
    }
    // 检测是否是障碍物
    if (nextObj.obj instanceof Barrier) {
        // 草地或空地则判断是否存在敌机坦克
        if (nextObj.obj instanceof EmptyB || nextObj.obj instanceof TodB) {

            // 炮弹碰到坦克或子弹则停止
            if (nextObj.occupier instanceof Tank) {
                return true;
            }
        }

        // 河流穿过
        if (this instanceof Bomb && nextObj.obj instanceof RiverB) {
            return false;
        }
        return !nextObj.obj.CanAcross;
    }

}

// 重写OnHitTest方法 当炮弹碰撞到不可穿过对象时调用
Bomb.prototype.OnHitTest = function (battleField) {

    // 播放爆炸效果
    var ex = new Explode();
    var nextObj = this.GetNextBattleFieldCell(battleField);
    // 除了边界都在击中的位置
    if (nextObj) {
        ex.Play(nextObj.obj.XPosition, nextObj.obj.YPosition);
    }
    else {
        ex.Play(this.XPosition, this.YPosition);
    }
    this.Owner.BombUsed--;      /*已用弹药数减一*/
    // 清除占有 移除元素
    // battleField[this.YPosition][this.XPosition].occupier = null;
    UtilityClass.RemoveE(this.UI, document.getElementById("divMap"));

    var nextObj = this.GetNextBattleFieldCell(battleField);
    if (nextObj == null) { return; }
    // 炮弹打到了障碍物
    if (nextObj.obj instanceof Barrier) {
        if (nextObj.obj.CanBeAttacked) {
            nextObj.obj.DefenVal -= this.Power;
            // 障碍物防御值降到0，把障碍物变为空地
            if (nextObj.obj.DefenVal <= 0) {
                var to = new EmptyB();
                to.UI = nextObj.obj.UI;
                to.XPosition = nextObj.obj.XPosition;
                to.YPosition = nextObj.obj.YPosition;
                nextObj.obj = to;
                to.UI.className = "";
                battleField[this.YPosition][this.XPosition].obj.UI.className = "";
            }
        }
            //  如果下一个是草或者空地
        else if (nextObj.obj instanceof EmptyB || nextObj.obj instanceof TodB) {
            // 玩家炮弹打中敌人坦克
            if (nextObj.occupier instanceof EnimyTank && this.Owner instanceof SelfTank) {
                UtilityClass.RemoveE(nextObj.occupier.UI, document.getElementById("divMap"));
                nextObj.occupier.UI = null;
                var arr = GameLoader.prototype._enimyTanks.removeAt(nextObj.occupier.index);
                // 重置坦克索引
                for (var i = 0; i < arr.length; i++) {
                    arr[i].index = i;
                }
                GameLoader.prototype._enimyTanks = arr;
                nextObj.occupier = null;
            }   // 敌人炮弹打中玩家坦克
            else if (nextObj.occupier instanceof SelfTank && this.Owner instanceof EnimyTank) {
                //UtilityClass.RemoveE(nextObj.occupier.UI, document.getElementById("divMap"));
                //nextObj.occupier = null;
            }
        }


    }

}