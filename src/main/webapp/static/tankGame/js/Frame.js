// 游戏载入对象 整个游戏的核心对象
GameLoader = function () {
    this._mapContainer = document.getElementById("divMap");  // 存放游戏地图的div
    this._controller = document.getElementById("controllerInfo"); // 存放手柄的div
    this._selfTank = null;  // 玩家坦克
    this._gameListener = null; // 游戏主循环计时器id
    /*v2.0新加的属性*/
    this._level = 1;
    this._rowCount = 13;
    this._colCount = 13;
    this._battleField = []; // 存储地图对象二维数组

    /*v4.0新加的属性*/
    GameLoader.prototype._enimyTanks = [];  // 敌人坦克集合

}
GameLoader.prototype = {
    Begin: function () {
        // 加载地图
        this.Load();
        // 加载手柄
        this.LoadController();

        // 初始化玩家坦克
        var selfT = new SelfTank();
        selfT.XPosition = 4;
        selfT.YPosition = 12;
        selfT.UpdateUI(this._battleField);
        this._selfTank = selfT;

        // 创建敌人坦克
        var enimyT1 = new EnimyTank();
        enimyT1.XPosition = 0;
        enimyT1.YPosition = 0;
        enimyT1.UpdateUI(this._battleField);
        enimyT1.index = this._enimyTanks.length;
        this._enimyTanks.push(enimyT1);

        // 创建敌人坦克
        enimyT2 = new EnimyTank();
        enimyT2.XPosition = 3;
        enimyT2.YPosition = 0;
        enimyT2.UpdateUI(this._battleField);
        enimyT2.index = this._enimyTanks.length;
        this._enimyTanks.push(enimyT2);

        // 创建敌人坦克
        enimyT3 = new EnimyTank();
        enimyT3.XPosition = 6;
        enimyT3.YPosition = 0;
        enimyT3.UpdateUI(this._battleField);
        enimyT3.index = this._enimyTanks.length;
        this._enimyTanks.push(enimyT3);




        // 添加按键事件
        var warpper = UtilityClass.BindFunction(this, this.OnKeyDown);
        window.onkeydown = warpper;
        warpper = UtilityClass.BindFunction(this, this.OnKeyUp);
        window.onkeyup = warpper;
        // 游戏主循环
        warpper = UtilityClass.BindFunction(this, this.Run);
        /*长定时器监听控制键*/
        this._gameListener = setInterval(warpper, 20);

    }
    // 键盘按下玩家坦克开始移动
    , OnKeyDown: function (e) {
        switch ((window.event || e).keyCode) {
            case 37:
                this._selfTank.Direction = EnumDirection.Left;
                this._selfTank.MovingState = true;
                break;		//左
            case 38:
                this._selfTank.Direction = EnumDirection.Up;
                this._selfTank.MovingState = true;
                break;		//上
            case 39:
                this._selfTank.Direction = EnumDirection.Right;
                this._selfTank.MovingState = true;
                break;		//右
            case 40:
                this._selfTank.Direction = EnumDirection.Down;
                this._selfTank.MovingState = true;
                break;		//下
            case 32:
                this._selfTank.Shot(this._battleField);
                break;		//空格
        }

    }
    // 按键弹起停止移动
    , OnKeyUp: function (e) {
        switch ((window.event || e).keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:
                this._selfTank.MovingState = false;
                break;
        }
    }
    /*游戏主循环运行函数，游戏的心脏，枢纽*/
    , Run: function () {
        // 敌人坦克自动移动
        this.EnimyAutoMove();
        if (this._selfTank.MovingState) {
            this._selfTank.Move(this._battleField);
        }
    }
    , Load: function () {
        // 根据等级初始化地图
        var map = Top_MapLevel[this._level - 1].split(",");
        var mapBorder = UtilityClass.CreateE("div", "", "mapBorder", this._mapContainer);
        // 遍历地图表格中每一个单元格
        for (var i = 0; i < this._rowCount; i++) {
            // 创建div，每一行的地图保存在这个div中
            var divRow = UtilityClass.CreateE("div", "", "", mapBorder);
            // 在一维数组中再创建一个数组
            this._battleField[i] = [];
            for (var j = 0; j < this._colCount; j++) {
                // 读取地图数据，默认值：0
                var v = (map[i] && map[i].charAt(j)) || 0;
                // 插入span元素，一个span元素即为一个地图单位
                var spanCol = UtilityClass.CreateE("span", "", "", divRow);
                spanCol.className = ArrayCss[v];


                // 将地图对象放入二维数组中，便于后面碰撞检测。
                var to = null;
                switch (v) {
                    case EnumMapCellType.Empty:
                        to = new EmptyB();
                        break;
                    case EnumMapCellType.Wall:
                        to = new WallB();
                        break;
                    case EnumMapCellType.Steel:
                        to = new SteelB();
                        break;
                    case EnumMapCellType.Tod:
                        to = new TodB();
                        break;
                    case EnumMapCellType.River:
                        to = new RiverB();
                        break;
                    case EnumMapCellType.Podium:
                        to = new PodiumB();
                        break;
                    default:
                        throw new Error("地图数字越界！");
                        break;
                }

                to.UI = spanCol;
                //这里的j就是X，因为内部循环是横向的，x是横坐标
                to.XPosition = j;
                to.YPosition = i;
                // 将当前的地图对象存入二维数组中obj为障碍物对象，occupier为占有对象
                this._battleField[i][j] = { obj: to, occupier: null, lock: false };

            }   //end for
        }   // end for
        // 放入window全局变量
        window.BattleField = this._battleField;

    }
    , LoadController: function () {
        var upKey = UtilityClass.CreateE("span","","up",this._controller);
    }
    /*敌人坦克自动移动*/
    , EnimyAutoMove: function () {
        for (var i = 0; i < this._enimyTanks.length; i++) {

            if (this._enimyTanks[i] instanceof Mover) {
                 this._enimyTanks[i].Move(this._battleField);
                 if (Math.random() * 100 < 5) { this._enimyTanks[i].Shot(this._battleField) };/* 5%的概率发射炮弹 */
            }
        }
    }

};
