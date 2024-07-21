# 会话控制

## 介绍

所谓会话控制就是`对会话内容进行控制`

HTTP是一种无状态的协议,它没有办法区分多次的请求是否来自同一个客户端,`无法区分用户`而产品中又大量存在的这样的需求 所以我们需要通过`会话控制`来解决问题

常见的会话控制技术有三种:

- cookie
- session
- token

## Cookie 是什么

- cookie 是 HTTP 服务器发送到用户浏览器并保存在本地的一小块数据

`cookie` 是保存在浏览器端的一小块数据

`cookie`是按照域名划分保存的

- cookie的特点

例子:						cookie

www.baidu.com                              a=100;b=200 

- 浏览器向服务器发送请求时,会自动将`当前域名下`可用的cookie设置在请求头中,然后传递给服务器

- 这个请求头的名字也叫cookie 所以将cookie理解为一个HTTP的请求头也是可以的

## Session

## 介绍

session 是保存在 `服务器端的一块儿数据` 保存当前访问用户的相关数据

实现会话控制 可以识别用户的身份 快速获取当前用户的相关信息

填写账号和密码校验身份 校验通过比较后创建`session 信息` 然后将`seesion_id`的值通过响应头返回给浏览器

有了cookie 下次发送请求时会自动携带`cookie` 服务器通过cookie中的`session_id` 的值确定用户的身份



## session 的代码操作

express中可以使用`express-session`对session进行操作

~~~js
const express = require('express');
// 1. 安装包 npm i express-session connect-mongo
// 2. 引入 express-session connect-mongo
const session = require('express-session')
const MongoStore = require('connect-mongo'); 
const e = require('express');

const app = express();

//3.设置 session 的中间件
app.use(session({
    name:'sid', //设置cookie的name 默认是 connect.sid
    secret:'atguigu' ,// 参与加密的字符串(又称为签名)
    saveUninitialized:false , // 是否为每次请求都设置一个cookie用来存储session的id
    resave:true, // 是否在每次请求时重新保存
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/bilibli', // 正确的 MongoDB 连接字符串
    }),
    cookie:{
        httpOnly:true,// 开启之后前端无法通过 JS 操作
        maxAge:1000 * 300 * 5 // 这一条 是控制sessionID 的过期时间的？
    }
}))

// 首页路由
app.get('/',(req,res)=>{
    res.send('home')
})

// 登录
app.get('/login',(req,res) =>{
    // username=admin&password=admin
    if(req.query.username === 'admin' && req.query.password === 'admin'){
        // 设置 session信息
        req.session.username = 'admin';
        req.session.uid= '258aefccc'
        // 登录成功
        res.send('login successful')
    }else{
        res.send('登录失败')
    }
})

// session 的读取
app.get('/cart',(req,res)=>{
    // 检测 session 是否存在用户数据
    if(req.session.username){
        res.send(`购物车页面，欢迎您 ${req.session.username}`)
    }else{
        res.send('你还没有登录')
    }
})

// session 的销毁
app.get('/logout',(req,res) => {
    req.session.destroy(() =>{
        res.send('退出成功')
    })
})

// 启动服务
app.listen(9000,(req,res)=>{
    console.log('启动成功')
})
~~~



## cookie 和 session的区别

cookie 和 session 的区别主要有如下几点:

1.存在的位置

- cookie:浏览器端
- session:服务端

2.安全性

- cookie是以明文的方式存放在客户端的,安全性相对较低
- session 存放于服务器中 所以安全性相对较好

3.网络传输量

- cookie设置内容过多会增大报文体积 会影响传输效率
- session 数据存储在服务器 只是通过cookie传递id 所以不影响传输效率

4.存储限制

- 浏览器限制单个cookie保存的数据不超过`4k`,且单个域名下的存储数量也有限
- session数据存储在服务器中 所有没有这些限制

## Token

1.token是什么

`token`是服务端生成并返回HTTP客户端的一串加密字符串,`token`中保存着`用户信息`

2.token

实现会话控制 可以识别用户的身份  主要用于移动端APP

3.token的工作流程

填写账号和密码校验身份 校验通过后响应token,token一般是在响应体中返回给客户端的

## Token的特点

- 服务端压力更小

数据存储在客户端

- 相对更安全

数据加密

可以避免CSRF(跨站请求伪造)

- 扩展性更强

服务器可以共享

增加服务节点更简单

## JWT

JWT(JSON Web Token)是目前最流行的跨域认证解决方案,可用于基于`token`的身份验证

JWT使token的生成与校验更规范

我们可以使用`jsonwebtoken包`来操作token



