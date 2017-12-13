//1.原型链继承
//问题：1.引用类型的属性被所有实例共享
//name2.Child调用父类构造函数时，无法向上传参
// fnamenction Parent() {
//     this.name=['xiaoming','xiaohong'];
// }

// Parent.prototype.getName=function() {
//     console.log(this.name);
// };

// function Child() {

// }

// Child.prototype=new Parent();
// var child1=new Child();
// console.log(child1.name);
// child1.name.push('damao');
// console.log(child1.name);

//2.构造函数继承

//解决的问题:1.避免了引用类型的属性被所有实例共享
//2.可以在Child中向Parent传参

//缺陷:方法都在构造函数中定义，每次构建实例都会创建一遍方法
// function Parent(name) {
//     this.name =name;
// }

// function Child(name) {
//     Parent.call(this,name);
// }

// var child1=new Child('xiaoming');
// console.log(child1.name);

//3.组合继承
// function Parent(name) {
//     this.name = name;
//     this.colors = ['red', 'blue', 'green'];
// }

// Parent.prototype.getName = function () {
//     console.log(this.name);
// };

// function Child(name,age) {
//     Parent.call(this,name);
//     this.age=age;
// }

// Child.prototype = new Parent();

// var child1 = new Child('kevin', '18');

// child1.colors.push('black');

// console.log(child1.name); // kevin
// console.log(child1.age); // 18
// console.log(child1.colors); // ["red", "blue", "green", "black"]

// var child2 = new Child('daisy', '20');

// console.log(child2.name); // daisy
// console.log(child2.age); // 20
// console.log(child2.colors); // ["red", "blue", "green"]


//4.原型式继承
function createObj(o) {
    function f() { }
    f.prototype = o;
    return new f();
}
//5.寄生式继承
function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    };
    return clone;
}
//6.寄生组合式继承
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name);
};

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var proto = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = proto;
}
