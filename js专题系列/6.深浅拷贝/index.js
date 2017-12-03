//浅拷贝
var arr=[1,23,4];
var copyArr=arr.concat();
//arr.slice();
//浅拷贝的问题：拷贝的是基本类型就会拷贝一份，拷贝的是
//对象或者数组拷贝的就是引用，改变了数组新旧都会发生改变

//粗暴地方法
JSON.parse(JSON.stringify(arr));
//局限性：不能拷贝函数

//具体实现：
var shallowCopy=function(obj) {
    if (typeof obj!=='object') {
        return;
    }  
    var newObj=obj instanceof Array?[]:{};
    for (var key  in obj) {
        if (object.hasOwnProperty()) {
            newObj[key]=obj[key];
        }
    }
    return newObj;
};

var deepCopy=function(obj) {
    if (typeof obj!=='object') {
        return;
    }
    var newObj=obj instanceof Array?[]:{};
    for(var key in obj){
        if (obj.hasOwnProperty) {
            newObj[key]=typeof obj[key]==='object'?deepCopy(obj[key]):obj[key];
        }
    }
    return newObj;
};