隐式转换：
一元+运算符将其操作数转换为Number类型并反转其正负。
-+0 =>-0   -(-0)=>+0

+new Date()相当于ToNumber(new Date())

ToNumber()遇到对象会变成这种形式:ToPrimitive(new Date())

ToPrimitive(obj,preferredType)
1. 如果obj为原始值，直接返回；
2. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
3. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
4. 否则抛异常。

toString返回对象的字符串表示
valueOf返回对象的原始值(原始值指的是基本数据类型)

1运算符new的优先级高于一元运算符+，所以过程可以分解为：
    var time=new Date()；    
    +time
2.根据上面提到的规则相当于：ToNumber(time)
3.time是个日期对象，根据ToNumber的转换规则，所以相当于：ToNumber(ToPrimitive(time))
4.根据ToPrimitive的转换规则：ToNumber(time.valueOf())，time.valueOf()就是 原始值 得到的是个时间戳，假设time.valueOf()=1503479124652
5.所以ToNumber(1503479124652)返回值是1503479124652这个数字。
