var class2Type = {};

"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function (item) {
    class2Type["object " + item + "]"] = item.toLowerCase();
});

function type(obj) {
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === 'object' || typeof obj === 'object' ? class2Type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}

function isWindow(obj) {
    return obj != null && obj === obj.window;
}

function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj);

    if (typeRes === 'function' || isWindow(obj)) {
        return false;
    }

    return typeRes === 'array' || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
}

function each(obj, callback) {
    var length, i = 0;

    //如果是数组或者类数组使用for循环遍历
    if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {//对象则使用for-in
        for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    return obj;
}



