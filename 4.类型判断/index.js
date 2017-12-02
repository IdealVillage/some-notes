var class2type={};

"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item,index) {
   class2type["[obejct "+item+"]"]=item.toLowerCase(); 
});

function type(obj) {
    return typeof obj==='object'||typeof obj==='function'?class2type[Object.prototype.toString.call(obj)]||"object":typeof obj;
}