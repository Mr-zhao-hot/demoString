# js知识点补充

## arguments

1.可以通过索引进行访问

~~~js
function sum (num1,num2){
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
}
sum(10,20)
~~~

2.由实参决定的

~~~js
// 1.arguments的length值在调用时就已经确定 不会随着函数的执行而改变
// 2.指定的形参在传递了实参的情况下,arguments和形参的值是相同的,并且可以互相改变
// 3.没有传递实参的情况下,会传回来undefined
// 4.指定了一个形参,没有传递实参的情况下,arguments和形参不能互相改变

function foo(a,b,c){
    1.
    console.log(arguments.length);
    arguments[2] = 3;
    console.log(arguments.length);
    
    2.
    b = 12
    console.log(arguments[1]);
    
    3.console.log(c);
    // arguments[2] = 3;
    console.log(c);
    
    4.
    c = 13
    console.log(arguments[2]);
}
foo(1,2) // 2 , 2
foo(1,2) // 2 , 2 , 12
foo(1,2) // 2 , 2 , 12 , undefind , undefind
foo(1,2) // 2 , 2 , 12 , undefind , undefind , undefind , undefind


~~~

3.特殊的arguments.callee属性

~~~js
function fn(){
    console.log(arguments.callee == fn);
}
fn();

function create(){
    return function(n){
        if ( n < 1){
            return 1;
        }else {
            return n * arguments.callee(n - 1);
        }
    }
}
var result = create()(5);
consloe.log(result); // 5 * 4 * 3 * 2 * 1 =120
~~~

# ES6

## set 和 const

~~~js
// 声明变量
// const 不能修改 (常用)
// let 不会有变量提升 不能修改 仅唯一 
~~~

## 函数默认值

~~~js
// es5 带参数默认值的函数
function add(a,b){
    // es5写法
    a = a || 10;
    b = b || 20;
    return a + b;
}
add(10,20)

// es6 的写法
function add(a,b=20){
    return a + b;
}
console.log(add(30))

// 默认的表达式也可以是一个函数
// a = 10   b = getval()
function add(a,b=getval(5)){
    return a + b;
}
function getval(val){
    return val + 5;
}
add(10)

~~~

## 剩余函数...

~~~js
// 作用一:
//用于解构赋值

// 数组的解构
// firstNumber:1 , other:2,3,4,5
const [firstNumber,...other] = [1,2,3,4,5]
console.log(`firstNumber: ${firstNumber},other:${others}`)

// 对象的解构赋值
// id:9527 , info:[object Object]
const {id,...info} = {id:9527 ,name:'bob' ,age:20 ,sex:'男'}
console.log(`id:${id},info:${info}`)

// ...数组表达式
// 用于计算全部参数的合
function sum(...args){
    let res = 0;
    for (val of args){
        res += val;
    }
    return res;
}
const arr = [1,2,3]
sum(...arr); // 6

// 复制数组
const arr = [1,2,3];
const arrs = [...arr];
console.log(arrs); // [1,2,3]

// 合并数组
const arr1 = [1,2,3];
const arr2 = [4,5,6];
const arr = [...arr1,...arr2];
console.log(arr); // [1,2,3,4,5,6]

// 字符串转换为字符数组
const str = 'hello';
const = arr =[...str];
console.log(arr); // ['h','e','l','l',o]

// 类数组转换为数组
// Arguments 或者 Nodelist
function foo(){
    const arr = [...arguments];
    console.log(arr)
}
foo(1,2,3) // [1,2,3]
~~~

## 扩展运算符

~~~js
// 剩余运算符 : 把多个独立的合并到一个数组中
// 扩展云算法 : 将一个数组分隔,并将各个项作为分离的参数传给函数
const maxNum = Math.max(20,30);
console.log(maxNum)

// 处理数组中的最大值
const arr = [10,20,50,32,321,234];
console.log(Math.max.apply(null,arr))

// ES6 使用扩展运算符更方便
console.log(Math.max(...arr))
~~~

## 箭头函数的注意事项

~~~js
// 没有this绑定
// es5中this指向:取决于调用该函数的上下文对象
let PageHandler = {
    id:123,
    init : () => {
        // 箭头函数没有this指向 , 箭头函数内部this值只能通过查找作用域链
        document.addEventListener('click',(event) => {
            // this.doSomeThings is not a function
            // console.log(this);

            this.doSomeThings(event.type);
        },false)
    },
    doSomeThings:function(type){
        console.log(`事件类型:${type},当前id:${this.id}`);
    }
}

PageHandler.init();

// 使用箭头函数的注意事项
// 1.使用箭头函数 函数内部没有argumnets
let getVal = (a,b) => {
    console.log(arguments);
    return a + b;
}
console.log(getVal(1,3));

// 2.箭头函数不能使用new关键字来实例化对象
let Person = () => {
    return 
};

// function函数 也是一个对象 但是箭头函数不是一个对象 它其实就是一个语法糖
// console.log(Person);
let p = new Person
~~~

## 解构赋值

~~~js
// 解构赋值是对赋值 运算符的一种扩展
// 它针对数组和对象拉进行操作
// 优点:代码书写上简介易读
let node = {
    type:"iden",
    name:"foo"
}
// 完全解构
let {type,name} = node;
console.log(type,name);

// 不完全解构
let {type} = node;
console.log(type);

//解构一个数组 b赋予30 a赋予20
let {a,b = 30} = {a:20};

// 对数组解构
let arr = [1,2,3];
let [a,b,c] = arr;
console.log(a,b,c)

// 可嵌套
let [a,[b],c] = [1,[2],3]
~~~

## 扩展对象的使用

~~~js
// is() ===
// 比较俩个值是否严格相等
console.log(NaN === NaN); // false
console.log(+0 === -0);  // ture
console.log(Object.is(NaN,NaN)); // true

// assgin
// 对象属性合并
// 返回合并之后的新对象
let newObj = Object.assign({},{a:1},{b:2});
console.log(newObj)
// a:1,b:2
~~~

## Symbol类型

~~~js
// 原始数据类型 Symbol 他表示独一无二的值
// 最大的用途 用来定义对象的私有变量
let s1 = Symbol('s1');
console.log(s1) // symbol(s1)

let obj = {
    [s1]:"小马哥"
}; 
// 如果用Symbol定义的对象中的变量,取值一定要用[变量名]
console.log(obj[s1])  // 小马哥

for (let key in obj){
    console.log(key);
}
console.log(Object.keys(obj));  // [] Object.keys(obj) 方法获取对象 obj 中所有可枚举属性的键，并将它们以数组形式输出。由于 obj 中只有一个 Symbol 类型的属性 [s1]，且默认是不可枚举的，所以输出结果应该是一个空数组 []

// 获取Symbol声明的属性名(作为对象的key)
let s = Object.getOwnPropertySymbols(obj);
console.log(s[0])  // symbol[s1]

// 反射
let m = Reflect.ownKeys(obj);
console.log(m); // Symbol(s1)
~~~

## set集合数据类型

~~~js
// 集合:表示无重复值的有序列表
let set = new Set();

// 添加元素
set.add(2);

// 删除元素
set.delete(2);

// 校验某个值
console.log(set.has("4"));

//  遍历数组
set.forEach((val,key) => {
    console.log(val);
    console.log(key);
})

// 1.set中对象的引用无法被释放
let set3 = new Set(),obj = {};
set3.add(obj);
// 释放当前的资源
obj = null;
console.log(set3);

// WeakSet
// 1.不能传入非对象类型的参数
// 2.不可迭代
// 3.没有forEach()
// 4.没有size属性
let set4 = new WeakSet(),obj1 = {};
set3.add(obj);

// 释放当前的资源
obj1 = null;
console.log(set3);
~~~

## Map数据类型

~~~js
// Map类型是键值对的有序列表,键和值是任意类型
let map = new Map();
map.set('name','张三');		   // {'name' => '张三'}
map.set('age',20);      		// {"age" => 20}
console.log(map.get('name')) 	//  张三
map.has('name'); 			   //  trues
map.delete('name');             // 删除name元素
map.clear();                    // 清空元素
map.set(['a',[1,2,3],'hello']); // 'a',[1,2,3],'hello'

new Map([['a',1],['c',2]]);		//  ['a',1],['c',2]               
~~~

## 数组的扩展

~~~html    <ul>
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
~~~

~~~js
// from() 将伪数组转换成真的数组
function add(){
    console.log(arguments);
    let arr = Array.from(arguments)
    console.log(arr);
}
add(1,2,3);

// querySelector 获取指定的第一个css选择器<li>1</li>
let lis = document.querySelectorAll('li');
console.log(Array.from(lis))

// 扩展运算符 将伪数组转换为真正的数组
console.log([...lis])

// form() 还可以接受第二个参数 用来对每个元素进行处理
let liContents = Array.from(lis,ele => ele.textContent);
console.log(liContents) // 1,2,3,4

// 2.of() 将任意的数据类型 转换为数组
console.log(Array.of(3,11,20,'30',[1,2,3],{id:1}));

// 3.copywithin() 把第1个元素复制到第3个元素
console.log([1,2,3,8,9].copyWithin(0,3))

// 4,find() findIndex()
// find() 找出第一个符合条件的数组成员
let num = [1,2,-10,-20,9,2].find(n => n < 0)
console.log(num); // -10

// findIndex()找出来第一个符合条件的数组成员的索引
let num2 = [1,2,-10,-20,9,2].findIndex(n => n < 0)
console.log(num2); // 2

// entries() keys() values() 返回一个遍历器 可以使用for...of循环进行遍历
// keys()对键名的遍历
// values() 对值遍历
// entries() 对键值对遍历

// 取键
for(let index of ['a','b'].keys()){
    console.log(index) //0 , 1
}
// 取值
for(let index of ['a','b'].values()){
    console.log(index) // a , b
}

for(let [index,ele] of ['a','b'].entries()){
    console.log(index,ele); // 0:a , 1:b
}

let letter = ['a','b','c'];
let it  = letter.entries();

// 6.inclides() 返回一直布尔值,表示某个数组是否包含给定的值
console.log([1,2,3].includes(2)); // true
console.log([1,2,3].includes(4)); // false
~~~

## 迭代器

~~~js
// Iterator
// 是一种新 的遍历机制 俩个核心
// 1.使用迭代是一个接口 能快捷的访问数据 通过Symbol.iterator来创建迭代器 通过迭代器的next()获取迭代之后的结果
// 2.迭代器是用于遍历数据结构的指针
// 创建新的迭代器 
const item = ['one','two','three'];
const ite = item[Symbol.iterator]();
console.log(ite.next());  //{value:"one" ， done：false} done如果为false表示遍历继续 如果为true表达遍历结束
console.log(ite.next());  //{value:"two" ， done：false} done如果为false表示遍历继续 如果为true表达遍历结束
console.log(ite.next());  //{value:"three" ， done：false} done如果为false表示遍历继续 如果为true表达遍历结束  
console.log(ite.next());
~~~

## 生成器

~~~js
function * add(){
console.log('one');
// x 可真的不是yield '2' 的返回值 它是next()调用 恢复当前yield() 执行参入的实参
    let x = yield '2';
    console.log('two:' + x);
    let y = yield'3';
    console.log('two'+y);
    console.log('total:' + ( x + y));
}
const fn2 = add();
console.log(fn2.next());   // {value:"2",done:false}
console.log(fn2.next(10)); // {value:"3",done:false}
console.log(fn2.next(20)); // {value:50,done:true}
~~~



## Promise

~~~js
// promise 承诺
// 相当于一个容器 保存着未来才会结束的事件(异步操作)的一个结果
// 各种异步操作都可以用同样的方法进行处理 axios
// 特点:
// 1.对象的状态不受外接影响 处理异步操作 三个状态 Pending(进行中) Resolved(成功) Rejcted(失败) 
// 2.一旦状态改变 就不会再变 任何时候都可以得到这个结果 

let pro = new Promise((resolve, reject) => {
// 执行异步操作
let res = {
    code: 200,
    data: {
        name: '小马哥'
    },
    error: '失败了'
}
setTimeout(() => {
    if (res.code === 200) {
        resolve(res.data)
    } else {
        reject(res.error);
    }
}, 1000)
})

console.log(pro);

pro.then((val) => {
    console.log(val)
}, (err) => {
    console.log(err);
})
~~~

## async

~~~js
// 作用:
// 基本操作 async 它会返回一个Promise对象 then catch
// async 是 Generator的一个语法糖
async function f(){
    let s = await 'hello async';
    let data = await s.split('');
    return data;
}
// 如果async函数中有多个await 那么then函数会等待所有的await指令 运行完的结果 才去执行
f().then( v => {console.log(v)}).catch(e=>console.log(e));

    async function f2(){
    // throw new Error('出错了');
    await Promise.reject('出错了')
    await Promise.reject('hello')
}
    f2().then(v =>console.log(v).catch(e =>{
    console.log(e)
}))
~~~



