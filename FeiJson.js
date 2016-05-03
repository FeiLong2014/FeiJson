(function () {
    if (!JSON) {
        JSON = {}
    }

    FeiJsonCache = {};

    var oHead = document.getElementsByTagName('HEAD').item(0);

    var isSupportAppend = true;
    try {
        var tempScript = document.createElement('script');
        tempScript.appendChild(document.createTextNode('var c=1;'));
    }
    catch (ex) {
        isSupportAppend = false;
    }

    window.myPaserJson = function (jsonObj) { return jsonObj };

    JSON.parse = function (jsonStr) {
        var oScript = document.createElement('script');
        var vName = '_returnValue' + new Date().getTime();
        var code = 'FeiJsonCache.' + vName + '=myPaserJson(' + jsonStr + ')';
        if (isSupportAppend) {
            oScript.appendChild(document.createTextNode(code));
        } else {
            oScript.text = code;
        }
        oHead.appendChild(oScript);

        //全局变量转为局部变量
        var tempV = FeiJsonCache[vName];

        //清除全局变量 移除临时节点
        delete FeiJsonCache[vName];
        oHead.removeChild(oScript);
        delete oScript

        return tempV;
    }
})();