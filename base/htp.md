# HTTP协议

协议就是规则！要求使用协议的双方必须严格遵守！

## HTTP协议简介

- 概念：HTTP (HyperText Transfer Protocol) 超文本传输协议。基于请求和响应模式的应用层协议。是目前互联网中广泛使用的一种协议。
- 特点：HTTP是无状态协议，每次请求都是独立的，服务器不会保留上一次请求的信息。

## URL格式

URL（Uniform Resource Locator）统一资源定位符，是互联网上标准资源的地址。HTTP使用URL来建立连接和传输数据。

语法格式: `http://www.itcast.cn:8080/news/index.html?uid=123&page=1#section1`

组成部分：
- **协议**：http和https
- **域名**：本质是IP地址（定位网络环境中的一台主机）
- **端口号**：在网络主机上定位一个应用。可以省略，默认跟随协议
  - HTTP协议默认端口：80
  - HTTPS协议默认端口：443
- **资源路径**：对应网页的源代码或网络中的一个数据资源
- **查询参数**：传输给网页源代码的参数
  - 以？与资源路径分隔
  - 多个参数之间用&分隔
  - 参数的语法为 key=value 对
- **锚点（Fragment）**：URL中#后面的部分，用于指定页面中的特定部分

## HTTP请求

### 整体格式

HTTP请求由三部分组成：请求行、请求头、请求体（某些请求方法没有请求体）

### 请求行

- 作用：指定请求方法和请求资源
- 语法格式：`请求方法 URL 协议版本\r\n`
- 请求方法：
  - GET：查询 -- 没有请求体
  - POST：新增 -- 登录，注册主要使用，有请求体
  - PUT：修改 -- 有请求体
  - DELETE: 删除 -- 没有请求体
  - HEAD：类似GET，但只返回头部信息
  - OPTIONS：获取目标资源所支持的通信选项
  - PATCH：对资源进行部分修改

### 请求头

- 作用：向服务器描述客户端(浏览器)的信息和请求的附加信息
- 语法：键值对（Key: Value）
- 常见请求头：
  - User-Agent：向服务器描述浏览器的类型（反爬虫）
  - Content-Type：向服务器描述请求体的数据类型
  - Accept：指定客户端能够接收的内容类型
  - Accept-Encoding：指定可接受的内容编码
  - Authorization：认证信息
  - Cookie：包含先前由服务器发送的Cookie信息
  - Host：指定请求的服务器域名和端口号
  - Referer：请求的来源网址

### 请求体

- GET、DELETE请求方法通常没有请求体
- POST、PUT请求方法有请求体
- 请求体的数据类型受请求头中Content-Type的值影响
- 常见的请求体格式：
  - application/x-www-form-urlencoded：表单数据
  - multipart/form-data：用于文件上传
  - application/json：JSON数据

## HTTP响应

### 整体格式

HTTP响应由三个部分组成：响应行（状态行）、响应头、响应体

### 状态行

- 语法格式：`协议版本 状态码 状态码描述\r\n`
- 协议版本：HTTP/1.0 / HTTP/1.1 / HTTP/2.0，常用HTTP/1.1
- 状态码：针对HTTP请求的响应状态

#### 状态码分类

- 1XX：指示信息 -- 表示请求已接收，继续处理
- 2XX：成功 -- 表示请求已被成功接收、理解、接受
- 3XX：重定向 -- 要完成请求必须进行更进一步的操作
- 4XX：客户端错误 -- 请求有语法错误或请求无法实现
- 5XX：服务器端错误 -- 服务器未能实现合法的请求

#### 常见状态码

- 200 OK：请求成功
- 201 Created：请求已经被实现，新资源已经依据请求的需要而创建
- 301 Moved Permanently：永久重定向
- 302 Found：临时重定向
- 400 Bad Request：客户端请求的语法错误
- 401 Unauthorized：请求要求用户的身份认证
- 403 Forbidden：拒绝访问
- 404 Not Found：请求的资源不存在
- 500 Internal Server Error：服务器内部错误

### 响应头

- 作用：向客户端描述服务器的基本信息和响应的附加信息
- 语法：键值对（Key: Value）
- 常见响应头：
  - Content-Type：向客户端描述响应体的数据类型
  - Cache-Control：指定缓存机制
  - Set-Cookie：设置Cookie
  - Location：重定向的地址
  - Content-Length：响应体的长度
  - Access-Control-Allow-Origin：指定允许跨域的源

### 响应体

- HTTP响应报文大多数情况下是有响应体的
- 响应体的数据类型受响应头中Content-Type的值影响
- 常见的类型：
  - JSON类型
  - 表单类型
  - 图片类型
  - HTML类型

## HTTP版本

- HTTP/1.1：目前最广泛使用的版本
- HTTP/2：支持多路复用、服务器推送、头部压缩等特性
- HTTP/3：基于QUIC协议，提供更快的连接建立和传输速度

## 安全性

- HTTPS：HTTP的安全版本，使用SSL/TLS进行加密
  - 提供数据加密、身份验证和完整性保护

## 缓存机制

- HTTP缓存可以提高性能和减少服务器负载
- 常用的缓存控制头：Cache-Control, ETag, Last-Modified

## Cookie和Session

- Cookie：服务器发送到用户浏览器并保存在本地的一小块数据
- Session：在服务器端保存的用户会话状态

## HTTP请求示例：

请求行：
- 请求方法：POST
- URL: http://ihrm-test.itherima.net/api/sys/login
- 协议版本：HTTP/1.1

请求头：Content-Type: application/json
请求体：
```json
{"mobile":"13800000002","password":"123456"}
## HTTP响应示例
- 响应行
- 状态码，状态描述：200 OK
- 响应头 : Content-Type: application/json
- 响应体 : {"success":"true", "code":10000, "message":"操作成功!", "data":"xxx"}

