# Mysql

## 账号设置

- 忘记密码

在[Mysql]节点下添加skip-grant-tables=1

- 重启Mysql

~~~mysql
net stop MYSQL
net start MYSQL
~~~

## 管理数据库

- 锁定库

~~~sql
use your_SQl
~~~

- 查看当前所有的数据库

~~~mysql
show databases;
~~~

- 创建数据库 

~~~mysql
create database 数据库名 DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
~~~

- 删除数据库

~~~mysql
drop database 数据库名;
~~~

- 进入数据（进入文件）

~~~mysql
use 数据库;
~~~

## 与python关联

~~~python
import pymysql
# 连接mysql
conn = pymysql.connect(
    host="127.0.0.1",
    port=3306,
    user="root",
    password="123456",
    charset="utf8"  # 注意这里使用的是utf8，而不是utf-8
)
cursor = conn.cursor()
~~~

~~~python
# 1.查看数据库
# 发送指令
cursor.execute("SHOW DATABASES;")
# 获取指令结果
result = cursor.fetchall() # 把mysql里面的代码 返回回来
print(result)
~~~

~~~python
# 2.创建数据库(新增 删除 修改)
# 发送指令
cursor.execute("create database db3")
conn.commit()
~~~

~~~python
# 4.删除数据库
# 发送指令
cursor.execute("drop database db3")
conn.commit()
~~~

~~~python
# 5，进入数据库
# 发送指令
cursor.execute("use mysql")
cursor.execute("show tables")
result = cursor.fetchall()
print(result)
~~~

~~~python
# 关闭连接
cursor.close()
conn.close()
~~~

## 内置客户端操作(创建表)

~~~ sql
create table 表名(
	列名 类型,
    列名 类型,
    列名 类型,
)default charset=utf8;
~~~

~~~sql
creat table tb1(
	id int,
    name varchar(16)
)default charset=utf8;
~~~

~~~sql
create table tb2(
	id int,
    name varchar(16) not null, -- 不允许为空
    email varchar(32) null, -- 允许为空(默认)
    age int default 3 -- 插入数据时，如果不给age列设置值,默认3
)default charset=utf8;
~~~

~~~sql
create table tb3(
	id int not null auto_increment primary key , -- 不允许为空 & 主键 & 自增
    name varchar(16) not null, -- 不允许为空
    email varchar(32) null,   -- 插入数据时,如果不给age列设置值，默认值：3
)default charset=utf8;
~~~

~~~sql
create table tb4(
    id int primary key, -- 主键(不允许为空,不能重复)
    name varchar(16) not null, -- 不允许为空
    email varchar(32) null, -- 允许为空（默认)
    age int default 3 -- 插入数据时,如果不给age列设置值,默认3
)default charset=utf8;
~~~

注意： 一个表中只能有一个自增列(一般都是主键)

### 操作列表

- 删除表 `drop table 表名;`

- 清空表：`delete from 表名;` 或 `truncate table 表名;`(速度快，无法滚镀撤销等)

- 修改表

  - 添加列

  ~~~sql
  alter table 表名 列名 类型;
  alter table 表名 add 列名 类型 DEFAULT 默认值;
  alter table 表明 add 列名 类型 not null default 默认值；
  alter table 表明 add 列名 类型 not null primary key auto_increment;
  ~~~

  - 删除列

  ~~~sql
  alter table 表名 drop colum 列名;
  ~~~

  - 修改类型

  ~~~sql
  alter table 表名 modify column 列名 类型;
  ~~~

  - 修改列 类型+名称

  ~~~sql
  alter table 表名 change 原列名 新列名 新类型;
  ~~~

  ~~~sql
  alter table tb change id nid int not null;
  alter table tb change id di int not null default 5;
  alter table tb change id id int not null primary key auto_increment;
  
  alter table tb change id id int; -- 允许为空,删除默认值，删除自增
  ~~~

  - 修改列 默认值

  ~~~sql
  ALTER TABLE 表名 ALTER 列名 SET DEFAULT 1000；
  ~~~

  - 删除列 默认值

  ~~~sql
  ALTER TABLE 表名 ALTER 列名 DROP DEFAULT；
  ~~~

  - 添加主键

  ~~~sql
  alter table 表名 add primary key(列名);
  ~~~

  - 删除主键

  ~~~sql
  alter table 表名 drop primary key;
  ~~~

### 常见列表型

#### 数型

- `int [m] [unsigned] [zerofill]`

~~~sql
int 表示有符号,取值范围:-2147483648 ~ -2147483648
int unsigned 表示无符号:0 ~ 4294967295
int[5]zerfill 仅用于显示,当不满5位 按照左边补0，例如0002；满足时 正常显示
~~~

#### 字符串

- char(m)

~~~sql
定长字符串,m代表字符串的长度,最后可容纳255个字符
eg：
create table L3(
	id int not null primary key auto_increment,
    name varchar(5),
    depart char(3)
)default charset=utf8;
char(3) -- 在非严格模式下 小于3个字符串默认是3 大于则会报错 如果在严格模式下大于3个字符串 会自动截断 
~~~

- varchar(m)

~~~sql
变长字符串,m代表字符串的长度,最后可容纳65535个字符.
-- 变长的体现：内容小于M时，会按照真实的数据长度存储; 如果超出m长度限制((默认MYSQL是严格模式，所以会报错))
eg:create table L3(
	id int not null primary key auto_increment,
    name varchar(5),
    depart char(3)
)default charset=utf8;
~~~

- text

~~~sql
text 数据类型用于保存变长的大字符串,可以组多到65535（2**16 - 1）个字符。
-- 一般情况下,长文本会用text类型. 例如：文章,新闻等.
create table L4(
	id int not null primary key auto_increment,
    title varchar(128),
    content text
)default charset=utf8;
~~~

#### 时间

`datetime`

~~~sql
YYYY-MM-DD HH:MM:SS (1000-01-01 00:00:00/9999-12-31 23:59:59)
~~~

`timestamp`

~~~sql
YYYY-MM-DD HH:MM:SS(1970-01-01 00:00:00/2037年)
~~~

#### 增删改查

- 增加数据

~~~sql
insert into 表名（列名，列名，列名）values(对应的值,对应的值,对应的值);
~~~

~~~sql
insert into tb1(name,password) values("吴佩奇"，"123123")
~~~

~~~sql
insert into tb1(name,password) values("吴佩奇"，"123123"),("吴佩奇"，"123123")
~~~

- 删除数据

~~~sql
delete from 表名;  -- 全删
delete from 表明 where 条件; -- 指定删除
~~~

~~~sql
delete from tb1;
delete from tb1 where name="wupeiqi";
delete from tb1 where name="wupeiqi" and  password="123"
~~~

- 修改数据

~~~sql
update 表明 set 列名=值;  -- 全改
update tb1 set name='wupeiqi' where id= 1 -- 指定改 id为1的wupeiqi更改
~~~

~~~sql
update tb1 set name='wupeiqi'
update tb1 set name='wupeiqi' where id= 1;

update tb1 set age = age+1;  -- 整形 + 加1
update tb1 set age = age+1 where id=2;
update users set name=concat(name,"123" ) where id =2 -- concat一个函数 可以拼接字符串
~~~

- 查询数据

~~~sql
select * from 表名
select 列名,列名,列名 from 表名;
select 列名，列名 as 别名,别名 from 表明;
select * from 表名 where 条件;
~~~

~~~sql
select * from tb1;  -- 这条语句将从表 tb1 中选择并返回所有的列和行。
select id,name,age from tb1;  -- 这条语句将从表 tb1 中选择并返回 id、name 和 age 这三个列的值
select id,name as N,age from tb1;  -- 这条语句将从表 tb1 中选择并返回 id、name 列，并将 name 列的别名设置为 N。
select id,name as N,AGE,111 from tb1; -- 这条语句将从表 tb1 中选择并返回 id、将 name 列的别名设置为 N、AGE 列和一个固定值 111。

select * from tb1 where id=1; -- 这条语句将从表 tb1 中选择并返回 id 等于 1 的行。
select * from tb1 where id > 1; -- 这条语句将从表 tb1 中选择并返回 id 大于 1 的行。
select * from tb1 where id != 1; -- 这条语句将从表 tb1 中选择并返回 id 不等于 1 的行。
select * from tb1 where name="wupeiqi" and password="123" -- 这条语句将从表 tb1 中选择并返回 name 列的值为 “wupeiqi” 并且 password 列的值为 “123” 的行。
~~~

~~~sql
CREATE TABLE info (
    id int not null auto_increment primary key,
    name varchar(16) not null,
    email varchar(32) not null,
    age int,
    depart_id int
) DEFAULT CHARSET=utf8;
~~~

## SQL语句

#### 查询

~~~sql
select * from info where name = "wupeiqo" and age = 19;
select * from info where name = "alex" or age=49;
~~~

#### 判断是否存在

~~~sql
select * from info where exists (select * from depart where id =5);
~~~

#### 通配符(模糊处理)

~~~sql
select * from info where name like "%配%"; -- 前后任意
select * from info where name like "%@live.com";
select * from info where email like "_@live.com";
~~~

用于大数据下搜索

####  映射(获得想要的列)

~~~sql
select id , name    from info; -- 获取这个列
select id ,name as NM from info -- 获取这俩个列 并且改他的名字
select 
	id,
	name,
	666 as num,
	(select max(id) from depart) as mid, -- max/min/sum 获取最大数 并放在修改那列名字
	(select min(id) from depart) as mid, -- max/min/sum 
	age
from info;
~~~

~~~mysql
select
	id,
	name,
	(select title from depart where depart.id=1) as x1, 把id等于1的表修改为x1
	(select title from depart where depart.id=2) as x2
from info;
~~~

~~~mysql
select 
	id,
	name,
	case depart_id when 1 then "第1部门" end v1,    -- 如果depart_id等于1 则修改为第1部门
	case depart_id when 1 then "第一部门" else "其他" end v2, -- 如果depart_id等于1 则修改为第1部门 否则第2部门
	case depart_id when 1 then "第1部门" when 2 then "第二部门" else "其他" end v3,
	case when age<18 then "少年" end v4,
	case when age<18 then "少年" else "油腻男" end v5,
	case when age<18 then "少年" when age<30 then "青年" else "油腻男" end v6 
from info;
~~~

#### 排序

~~~mysql
select * from info order by age desc; -- 倒序排列
select * from info order by age asc; -- 正序排列
select * from info order by age asc,id desc; -- 优先按照age从小到大;如果age相同则按照id从大到小
~~~

#### 取部分

~~~mysql
select * from info limit 5; -- 只要前5行的数据
select * from info order by id desc limit 3; -- 先排序,再获取前3条数据
select * from info where id > 10 order by id desc limit 3; -- 先排序 再获取前3条数据
select * from info limit 3 offset 2; -- 从位置2开始,向后获取前5条数据
~~~

#### 分组(用于统计)

~~~mysql
-- gruop by 聚合
select age,max(id),min(id),count(id),sum(id),avg(id) from info group by age;
select depart_id,coount(id) from inf group by depart_id; -- 用于统计部门多少人
select depart_id,coount(id) from inf group by depart_id having count(id) > 2; -- 部门大于2的人 其他不显示
~~~

- 案例

~~~mysql
select age,count(id) from info where id > 2 group by age having count(id) > 1 order by age desc limit 1;
-- 要查询的表info
-- 条件 id > 2
-- 根据age分组
-- 对分组后的数据再根据聚合条件过滤 count(id) > 1
-- 根据age从小到大排序
-- 获取第一条
~~~

#### count

~~~mysql
-- 中有一个列叫做 “age”，记录了学生的年龄。你可以使用 COUNT 函数来计算年龄大于 18 岁的学生有多少人
SELECT COUNT(*) FROM students WHERE age > 18;
~~~



#### 左右连表

~~~mysql
主表 left outer join 从表 on 主表.x = 从表.id
~~~

~~~mysql
主表 right outer join 从表 on 主表.x = 从表.id
~~~

~~~mysql
select * from info left outer join depart on info.depart_id = depart,id; -- 左边是要准备连接的表 右边是接收要连接的表
select info.id,info.name,info.email,depart.title from info left outer join depart on info.depart_id = depart.id;
~~~

~~~mysql
-- 内连接: 表 inner join 表 on 条件
select * from info inner depart on info.depart_id = depart.id;
~~~

- 简写

~~~mysql
select * from depart left join info on....
~~~

~~~mysql
select * from student left join class on student.class_id = class.cid where class.caption="三年二班";
-- student.class_id 和 class.cid 是用于连接 student 表和 class 表的列
-- where 要求是只能是三年二班的合表
~~~

## 用户管理

### 创建账号

~~~mysql
create user '用户名' @ '连接者的ip地址' identified by '密码';
~~~

~~~mysql
create user wupeiqi@1270.0.0.1 indentified by 'root123';
create user 'wupeiqi'@'%' indentified by 'root123';
~~~

### 修改用户

~~~mysql
rename user '用户名'@'ip地址' to '新用户名'@'IP地址';
~~~

~~~mysql
rename user wupeiqi@127.0.0.1 to wupeiqi@localhost;
~~~

### 修改密码

~~~mysql
set password for '用户名' @ 'IP地址' = Password('新密码')
~~~

~~~mysql
set password for 'wupeiqi4'@'%' = Password('123123');
~~~

### 授权管理

~~~mysql
grant 权限 on 数据库.表 to '用户'@'IP地址'
~~~

~~~mysql
grant all privileges on *_* 	TO 'wupeiqi'@'locatlohst'; -- 用户wupeiqi拥有所有数据库的所有权限
grant select privileges on day26db.* to 'wupeiqi'@'%'; 
--  最后刷新赋权 flush privileges;
~~~

### 查看授权

~~~mysql
show grant for '用户'@'IP地址'
show grants for 'wupeiqi'@'localhost'
~~~

### 取消授权

~~~mysql
revoke 权限 on 数据库.表 '用户'@'ip地址'
~~~

~~~mysql
revoke ALL PRIVILEGES on day.* from 'wupeiqi'@'localhost';
~~~

 ## 锁

- 排它锁`for update `加锁之后,其他不可以读写

~~~mysql
begin;
	select * from L1 where name="吴佩奇" for update; -- name列不是索引(表锁)
commit;
~~~

~~~mysql
begin; -- 或者 start transaction
	select * from L1 where id = 1for update;
commit;
~~~

- `lock in share mode`共享锁 加锁之后 其他可读但不可写

~~~mysql
begin;
	select * from L1 where name="吴佩奇" lock in share mode; -- 假设name列不是锁引(表锁)
commit;
~~~

~~~mysql
begin;  -- 或者 start transaction
	select * from L1 where id = 1lock in share mode;
commit;
~~~

### 排它锁

`在mysql终端里面写`

~~~mysql
A: 访问页面查看商品剩余 100
B: 访问页面查看商品剩余 100

此时 A、B 同时下单，那么他们同时执行SQL：
	update goods set count=count-1 where id=3
由于Innodb引擎内部会加锁，所以他们两个即使同一时刻执行，内部也会排序逐步执行。


但是，当商品剩余 1个时，就需要注意了。
A: 访问页面查看商品剩余 1
B: 访问页面查看商品剩余 1

此时 A、B 同时下单，那么他们同时执行SQL：
	update goods set count=count-1 where id=3
这样剩余数量就会出现 -1，很显然这是不正确的，所以应该怎么办呢？


这种情况下，可以利用 排它锁，在更新之前先查询剩余数量，只有数量 >0 才可以购买，所以，下单时应该执行：
	begin; -- start transaction;
	select count from goods where id=3 for update;
	-- 获取个数进行判断
	if 个数>0:
		update goods set count=count-1 where id=3;
	else:
		-- 已售罄
	commit;
~~~

`在python里面`

~~~mysql
import pymysql
import threading


def task():
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='root123', charset="utf8", db='userdb')
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    # cursor = conn.cursor()
	
    # 开启事务
    conn.begin()

    cursor.execute("select id,age from tran where id=2 for update")
    # fetchall      ( {"id":1,"age":10},{"id":2,"age":10}, )   ((1,10),(2,10))
    # {"id":1,"age":10}   (1,10)
    result = cursor.fetchone()
    current_age = result['age']
    
    if current_age > 0:
        cursor.execute("update tran set age=age-1 where id=2")
    else:
        print("已售罄")

    conn.commit()

    cursor.close()
    conn.close()


def run():
    for i in range(5):
        t = threading.Thread(target=task)
        t.start()


if __name__ == '__main__':
    run()

~~~

### 共享锁

共享锁（ `lock in share mode`），可以读，但不允许写。

加锁之后，后续其他事物可以可以进行读，但不允许写（update、delete、insert），因为写的默认也会加锁。

### 数据库多线程

~~~python
pip3.9 install pymysql
pip3.9 install dbutils
~~~

~~~python
import threading
import pymysql
from dbutils.pooled_db import PooledDB

MYSQL_DB_POOL = PooledDB(
    creator=pymysql,  # 使用链接数据库的模块
    maxconnections=5,  # 连接池允许的最大连接数，0和None表示不限制连接数
    mincached=2,  # 初始化时，链接池中至少创建的空闲的链接，0表示不创建
    maxcached=3,  # 链接池中最多闲置的链接，0和None不限制
    blocking=True,  # 连接池中如果没有可用连接后，是否阻塞等待。True，等待；False，不等待然后报错
    setsession=[],  # 开始会话前执行的命令列表。如：["set datestyle to ...", "set time zone ..."]
    ping=0,
    # ping MySQL服务端，检查是否服务可用。
    # 如：0 = None = never, 1 = default = whenever it is requested, 
    # 2 = when a cursor is created, 4 = when a query is executed, 7 = always
    host='127.0.0.1',
    port=3306,
    user='root',
    password='root123',
    database='userdb',
    charset='utf8'
)


def task():
    # 去连接池获取一个连接
    conn = MYSQL_DB_POOL.connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    
    cursor.execute('select sleep(2)')
    result = cursor.fetchall()
    print(result)

    cursor.close()
    # 将连接交换给连接池
    conn.close()

def run():
    for i in range(10):
        t = threading.Thread(target=task)
        t.start()


if __name__ == '__main__':
    run()

~~~

### with 管理 (用于mysql的自动关闭和开启)

~~~python
# db_context.py
import threading
import pymysql
from dbutils.pooled_db import PooledDB

POOL = PooledDB(
    creator=pymysql,  # 使用链接数据库的模块
    maxconnections=5,  # 连接池允许的最大连接数，0和None表示不限制连接数
    mincached=2,  # 初始化时，链接池中至少创建的空闲的链接，0表示不创建
    maxcached=3,  # 链接池中最多闲置的链接，0和None不限制
    blocking=True,  # 连接池中如果没有可用连接后，是否阻塞等待。True，等待；False，不等待然后报错
    setsession=[],  # 开始会话前执行的命令列表。如：["set datestyle to ...", "set time zone ..."]
    ping=0,
    host='127.0.0.1',
    port=3306,
    user='root',
    password='root123',
    database='userdb',
    charset='utf8'
)


class Connect(object):
    def __init__(self):
        self.conn = conn = POOL.connection()
        self.cursor = conn.cursor(pymysql.cursors.DictCursor)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.cursor.close()
        self.conn.close()

    def exec(self, sql, **kwargs):
        self.cursor.execute(sql, kwargs)
        self.conn.commit()

    def fetch_one(self, sql, **kwargs):
        self.cursor.execute(sql, kwargs)
        result = self.cursor.fetchone()
        return result

    def fetch_all(self, sql, **kwargs):
        self.cursor.execute(sql, kwargs)
        result = self.cursor.fetchall()
        return result
~~~

~~~python
from db_context import Connect

with Connect() as obj:
    # print(obj.conn)
    # print(obj.cursor)
    ret = obj.fetch_one("select * from d1")
    print(ret)

    ret = obj.fetch_one("select * from d1 where id=%(id)s", id=3)
    print(ret)
~~~

## 复合查询

~~~mysql
-- 查询表明中在这个工资范围内的所有人
select name from 表名 where salary in (select xxxx)
~~~



