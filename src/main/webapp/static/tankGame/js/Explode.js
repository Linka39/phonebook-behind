// 爆炸效果类
Explode = function () {
    this.container = document.getElementById("divMap");
    this.UI = null;
    this.step = 8;  // 共8张图
    this.speed = 50;    // 动画播放速度
}

// 播放爆炸效果
Explode.prototype.Play = function (x,y) {
    this.UI = UtilityClass.CreateE("div", "", "explode", this.container);
    this.MoveTo(x, y);

    var i = 0;
    var This = this;
    var FxTimer = setInterval(function () {
        This.UI.style.backgroundPosition = '0 -' + i * 60 + 'px';
        i++;
        if (i==This.step) {
            clearInterval(FxTimer);
            This.Stop();
        }
    },this.speed);
}

// 播放位置 
Explode.prototype.MoveTo = function (x,y) {

    if (this.UI != null) {
        this.UI.style.left = x * 40 - 10 + "px";
        this.UI.style.top = y * 40 - 10 + "px";
    }

}

// 移除dom元素
Explode.prototype.Stop = function () {
    UtilityClass.RemoveE(this.UI, this.container);
}