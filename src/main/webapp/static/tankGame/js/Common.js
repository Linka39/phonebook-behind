//地图元素类型枚举
/*
0：空地	
1：墙	
2：钢	
3：树丛		
4：河		
5：总部	
*/

var EnumMapCellType = {
    Empty: "0"
    , Wall: "1"
    , Steel: "2"
    , Tod: "3"
    , River: "4"
    , Podium: "5"
};

// 每个地形对应的样式名称
var ArrayCss = ['empty', 'wall', 'steel', 'tod', 'river', 'podium'];

// 关卡地图
/*关卡*/
var str = '0000000000000';
str += ',0011100111010';
str += ',1000010000200';
str += ',1200333310101';
str += ',0000444400001';
str += ',3313300001011';
str += ',3011331022011';
str += ',3311031011011';
str += ',0101011102010';
str += ',0101011010010';
str += ',0100000000110';
str += ',0100012101101';
str += ',0010015100000';
// 存储关卡地图   0,1,2,3... 分别为1-n ... 关
var Top_MapLevel = [str];


// 坦克移动的四个方向
var EnumDirection = {
    Up: "0",
    Right: "1",
    Down: "2",
    Left: "3"
};


// 通用方法对象
var UtilityClass = {
    // 创建dom元素到parentNode中，可指定id，className
    CreateE: function (type, id, className, parentNode) {
        var J = document.createElement(type);
        if (id) { J.id = id };
        if (className) { J.className = className };
        return parentNode.appendChild(J);
    },  // 移除元素
    RemoveE: function (obj, parentNode) {
        parentNode.removeChild(obj);
    },
    GetFunctionName: function (context, argumentCallee) {
        for (var i in context) {
            if (context[i] == argumentCallee) { return i };
        }
        return "";
    },  // 绑定事件，返回func方法，this为传入的obj
    BindFunction: function (obj, func) {
        return function () {
            func.apply(obj, arguments);
        };
    }
};

Array.prototype.removeAt = function (index) {
    var arr = [], j = 0;
    // 遍历数组，过滤指定位置的元素
    for (var i = 0; i < this.length; i++) {
        if (i != index) {
            arr[j++] = this[i];
        }
    }
    return arr;
}