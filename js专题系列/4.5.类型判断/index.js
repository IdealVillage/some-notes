var class2type={};

//object.prototype.toString方法
//1，如果this值是undefined，就返回[object Undefined]
//2，如果this值是null，就返回[object Null]
//3.让O成为ToNumber(this)的结果
//4.让class成为ToObject的结果
//5.最后返回由"[object"+class+"]"

"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map((item) => {
    class2type["[object " + item + "]"] = item.toLowerCase();
});

function type(obj) {
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === 'function' || typeof obj === 'function' ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}

function isFunction(obj) {
    return type(obj)==="function";
}

var isArray=Array.isArray||function (obj) {
    return type(obj)==='array';
};

var toString=class2type.toString;
var hasOwn=class2type.hasOwnProperty;

//判断是不是纯粹的对象
//除了{}和new Object创建的对象以外，没有原型的对象也是纯粹的对象

function isPlainObject(obj) {
    var proto,Ctor;
    //判断明显不是object和一些宿主对象
    if (!obj||toString.call(obj)!=='[object object]') {
        return false;
    }

    //没有原型的对象
    //用于判断Object.create(null)的情形
    proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return true;
    }

    Ctor = hasOwn.call(proto, "constructor")&& proto.constructor;
    //Ctor的构造函数和Object的构造函数
    return typeof Ctor==='function'&&hasOwn.toString.call(Ctor)===hasOwn.toString.call(Object);
    //hasOwn.toString.call(Ctor)===hasOwn.toString.call(Object)等价于Ctor.constructor.toString()===class2type.constructor.toString
    //但是第一种方法更快
}

//这里发现的&&的小技巧（“短路”原理）
//a&&b:将a,b转换为Boolean类型，再执行逻辑与，true返回b，false返回a
//a||b：将a,b转换为Boolean类型，再执行逻辑或，true返回a，false返回b


function isEmptyObject(obj) {
    var name;
    for(name in obj){
        return false;
    }
    return true;
}

function isWindow(obj) {
    return obj!=null&&obj===obj.Window;
}

//1.是数组
//2.长度为0:arguments对象为类数组对象，没有参数时length===0
//3.数据类型为number，length>0，obj[length-1]要有值:
//[1,,]length为2，中间的逗号就是正常的逗号，右边的逗号表示跳过，这个位置没有值
//但是类数组的length只能为1，因为只有1这一个元素（{0：1，length：1}），length等于数组最后一个元素的key值加一
//[,,3]length为3({2:3,length:3})

function isArrayLike(obj) {
    var length=!!obj && "length" in obj&&obj.length;
    var typeRes=type(obj);

    if (typeRes==='function'||isWindow(obj)) {
        return false;
    }

    return typeRes==='array'||length===0||typeof length==='number'&&length>0&&(length-1)in obj;
}

function isElement(obj) {
    return !!(obj&&obj.nodeType===1);
}


