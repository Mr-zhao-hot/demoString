# jQuery

## JQuery的引入

- 首先去网上找到Juqery的文件

~~~js
// 在head上面
<scrpit src='导入juqery的文件'> </scrpit>
~~~

## Jquery的基本语法

~~~javascript
$().方法()
1.查找标签
2..方法：操作标签
~~~

~~~html
<ul class='cl'>
    <li>123</li>
    <li>123</li>
    <li>123</li>
</ul>
~~~

~~~js
// 1.$().方法()
$('.cl li').css("color",'red')

// 2.取Dom对象
console.log($(".cll li")[1].innerHTML);

// 如何将Dom对象转换未jQuery对象
var ele = document.querSelector(".cl li");
$(ele).css("color","orange") // 123
~~~

## jQuery选择器

### 基本选择器

~~~css
$('#id')
$('class')
$('element')
$('.class,p,div')
~~~

### 组合选择器

~~~js
$('.outer div')
$('.outer>div')
$('.outer+div')
$('.outer-div')
~~~

### 属性选择器


~~~html
<input type='text'>
~~~

~~~js
$('[type='text']').css("border",'1px dolid red');
~~~

### 筛选器

~~~js
/*
  // 筛选器
  :first               //  从已经获取的元素集合中提取第一个元素
  :even                //  从已经获取的元素集合中提取下标为偶数的元素 
  :odd                 //  从已经获取的元素集合中提取下标为奇数的元素
  :eq(index)           //  从已经获取的元素集合中提取指定下标index对应的元素
  :gt(index)           //  从已经获取的元素集合中提取下标大于index对应的元素
  :last                //  从已经获取的元素集合中提取最后一个元素
  :lt(index)           //  从已经获取的元素集合中提取下标小于index对应的元素
  :first-child         //  从已经获取的所有元素中提取他们的第一个子元素
  :last-child          //  从已经获取的所有元素中提取他们的最后一个子元素
  :nth-child           //  从已经获取的所有元素中提取他们的指定下标的子元素
  // 筛选器方法
  $().first()          //  从已经获取的元素集合中提取第一个元素
  $().last()           //  从已经获取的元素集合中提取最后一个元素
  $().eq()             //  从已经获取的元素集合中提取指定下标index对应的元素
*/
~~~

### 导航查找

```js
/* 
// 查找子代标签：         
 $("div").children(".test")     
 $("div").find(".test")  
                               
 // 向下查找兄弟标签 
$(".test").next()               
$(".test").nextAll()     
$(".test").nextUntil() 
                           
// 向上查找兄弟标签  
$("div").prev()                  
$("div").prevAll()       
$("div").prevUntil() 

// 查找所有兄弟标签  
$("div").siblings()  
              
// 查找父标签：         
$(".test").parent()              
$(".test").parents()     
$(".test").parentUntil() 

*/
```

### jQuery的绑定事件

```js
/*
三种用法:
  1. on 和 off
  	 // 绑定事件
  	 $().on("事件名",匿名函数)
  	 
  	 // 解绑事件,给指定元素解除事件的绑定
  	 $().off("事件名")
  
  2. 直接通过事件名来进行调用
  	 $().事件名(匿名函数)
  	
  3. 组合事件,模拟事件
  	 $().ready(匿名函数)   			// 入口函数
  	 $().hover(mouseover, mouseout) // 是onmouseover和 onmouseout的组合
  	 $().trigger(事件名) 			 // 用于让js自动触发指定元素身上已经绑定的事件
  	 
*/
```

### read事件和hover事件

~~~js
$(document).ready(function(){
    // read方法就是写在最上面 先加载下面的 在加载上面的
})

// hover方法
$(".c2").hover(mouserover,mouserout);
function mouserover(){
    console.log("over");
}
function mouserout(){
    console.log("out");
}
~~~

### jQuery的文本操作

~~~js
// 查看文本内容 html text
$(function(){
    $("c1").click(function(){
        // 获取文本内容
        // console.log(this.innerHTML);
        // console.log(this.innerText);
        console.log($(this).html())  // 可以处理标签
        console.log($(this).text())  // 只能获取纯文本
    })
})
~~~

~~~js
// 重新设置文本
$(function(){
    $(".c1").click(function(){
        // 设置文本
        $(this).html("hello world") // 可以在里面放标签
        $(this).text("hello world")
    })
})
~~~

~~~js
// value操作
// input select textarea标签是没有文本的 但是可以用value来决定
~~~

~~~html
<input type="text" id='i1' value='yuan'>
<select id='i3'>
    <option value='hebei'>河北省</option>
    <option value='hubei'>湖北省</option>
    <option vaule="guangdong">广东省</option>
</select>
<p><textarea name='' id='i2' cols='30' rows='10'>123</textarea></p>
~~~

~~~js
// 获取value属性值
$(function(){
    $("#i1").blur(function(){
        console.log("ok");
        // 获取jQuery对象的value属性值
        console.log(this.value);
        console.log($(this).val()) // jQuery方法
    })
})
~~~

~~~js
// 设置value属性值
$(function(){
    $("#i1").blur(function(){
        // 设置value属性值
        $(this).val("hello world")
    });
    $("#i3").change(function(){ // 针对select选中的标签 选中哪个执行下面的代码
        console.log(this.value); // 读取文本
        console.log($(this).val);
    })
    console.log($("#i2").val()); // 读取文本
    console.log($("#i2").val("hello ping!")) // 设置文本
})
~~~

### jQuery属性操作

~~~js
/*
//读取属性值
	$("选择符").attr("属性名");   // 获取非表单元素的属性值,只会提取第一个元素的属性值
	$("选择符").prop("属性名");   // 表单元素的属性,只会提取第一个元素的属性值
//操作属性
  $("选择符").attr("属性名","属性值");  // 修改非表单元素的属性值,如果元素有多个,则全部修改
  $("选择符").prop("属性名","属性值");  // 修改表单元素的属性值,如果元素有多个,则全部修改
  
  $("选择符").attr({'属性名1':'属性值1','属性名2':'属性值2',.....})
  $("选择符").prop({'属性名1':'属性值1','属性名2':'属性值2',.....})
*/
~~~

~~~html
<div class='c1' id='i1' name='alvin'>DIV</div>
<input type='checkbox' checked='checked'>
~~~

~~~js
$(function(){
    // =================== attr ======================
    // 获取属性值
	console.log($("#1").attr("name"));
    console.log($("#i1").attr("class"));
    
    // 设置属性属性值
    $("#1").attr("name","yuan") // 将name里面对应的值改为yuan
    $("#1").attr("k1","v1") // 添加一个k1并且设置值
    $("#1").attr({name:"yuan","k1":"v1"});
    
    // ================== prop:表单属性 ======================
    console.log($(":checkbox").prop("checked")); // false 判断是否被选中
})
~~~

## jQuery 循环

~~~js
// 循环遍历
var arr = [123,2323,2323];
$.each(arr,function(i,j){ // i,对应的是索引 j,对应的内容
    // 循环体
    console.log(i,j)
})

var obj = {name:"alvin",age:18}
$.each(obj,function(k,v){
    console.log(k,v);
})
~~~

#### 案例

~~~html
<ul>
    <li>123</li>
    <li>233</li>
    <li>233</li>
    <li>222</li>
</ul>
~~~

~~~js
$("ul li").each(function(){
    // 循环函数中的this.代指的是每一次循环的dom对象
    console.log(this);
    var v = $(this).html();
    if(parseInt(v)>30){
        $(this).css("color",'red')
    }
})
~~~

## jQuery CSS操作样式

~~~js
/*
获取样式
$().css("样式属性");   // 获取元素的指定样式属性的值,如果有多个元素,只得到第一个元素的值

操作样式
$().css("样式属性","样式值").css("样式属性","样式值");
$().css({"样式属性1":"样式值1","样式属性2":"样式值2",....})

$().css("样式属性":function(){
  
  // 其他代码操作 
  return "样式值";
});
*/
~~~

~~~html
<div class="c1"></div>
~~~

~~~js
$(".c1").css("color","red")
$(".c1").css({"backgroundColor":"#369","color":"white"})
~~~

## class属性操作

~~~js
$().addClass("class1  class2 ... ...")   // 给获取到的所有元素添加指定class样式
$().removeClass() // 给获取到的所有元素删除指定class样式
$().toggleClass() // 给获取到的所有元素进行判断,如果拥有指定class样式的则删除,如果没有指定样式则添加
~~~

~~~css
.c1{
	color:red;
}
.c2{
	background-color:lightseagreen
}
.c3{
    font-style:italic;
}
~~~

~~~HTML
<div class="c1">
    hello JS
</div>
~~~

~~~js
$(".c1").click(function(){
    $(this).addClass("c2") // 在c1里面添加c2的元素  添加新内容
    $(this).removeClass("c3"); // 移除C3元素
})
$(".c1").mouseover(function(){
    $(this).addClass("c3");
})

~~~

### tab切换

~~~html
<div class="tab">
    <ul class="tab-title">
        <li class="current" index="0">商品介绍</li>
        <li class="" index="1">规格与包装</li>
        <li class="" index="2">售后保障</li>
        <li class="" index="3">商品评价</li>
    </ul>
    <ul class="tab-content">
        <li>商品介绍...</li>
        <li class="hide">规格与包装...</li>
        <li class="hide">售后保障...</li>
        <li class="hide">商品评价...</li>
    </ul>
</div>
~~~

~~~js
$(".tab-title li").click(function(){
    // 事件函数
    $(this).addClass("current")
    $(this).siblings().removeClass("current") // siblings 获取全部兄弟内容
    // 合并
    $(this).addClass("current").siblings().removeClass("current");
    
    
    // 详细的内容的显示与隐藏
    console.log($(this).index()) // jQuery自带索引 就不用在html里面去写index='1'的内容
    var index = $(this).index();
    
    $(".tab-content li").eq(index).removeClass("hide");
    $(".tab-content li").eq(index).siblings().addClass("hide");
    // 合并
    $(".tab-content li").eq(index).removeClass("hide").siblings().addClass("hide");
})
~~~

## 节点操作

~~~js
/*
//创建一个jquery标签对象
    $("<p>")

//内部插入

    $("").append(content|fn)      // $("p").append("<b>Hello</b>");
    $("").appendTo(content)       // $("p").appendTo("div");
    $("").prepend(content|fn)     // $("p").prepend("<b>Hello</b>");
    $("").prependTo(content)      // $("p").prependTo("#foo");

//外部插入

    $("").after(content|fn)       // ("p").after("<b>Hello</b>");
    $("").before(content|fn)      // $("p").before("<b>Hello</b>");
    $("").insertAfter(content)    // $("p").insertAfter("#foo");
    $("").insertBefore(content)   // $("p").insertBefore("#foo");

//替换
    $("").replaceWith(content|fn) // $("p").replaceWith("<b>Paragraph. </b>");

//删除

    $("").empty()
    $("").remove([expr])

//复制
    $("").clone([Even[,deepEven]])
*/
~~~

~~~html
<button class="add_btn">添加节点</button>
<button class="del_btn">删除节点</button>
<button class="replace_btn">替换节点</button>
<div class="c1">
    <h3>hello JS!</h3>
    <h3 class="c2">hello world</h3>
</div>
~~~

~~~js
$(".add_btn").click(function(){
    // 创建jQuery对象
    var $img = $("<img>")
    $img.attr("scr","图片地址")
    
    // 节点添加
    $(".c1").append($img);
    $(".c1").append("<img src='网站地址'>")
    
    // 删除标签
	$(".del_btn").click(function(){
        $(".c2").remove(); // 彻底清除
        $(".c2").empty(); // 清除但是会把标签剩下
     
    // 替换标签
        $(".replace_btn").click(function(){
            // var $img = $("<img>");
            // $img.attr("src","网页地址");
            // $(".c2").replaceWith($img);
            $(".c2").replaceWith("<img src='网站地址'>")
        })
    })
})
~~~

## 事件委派

~~~html
<button class="add">add</button>
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
~~~

~~~js
// $("ul li").click(function(){
//     console.log($(this).html());
// })
$("ul").on("click","li",function(){
    console.log($(this).html())
}); // on 为事件委托

$(".add").click(function(){
    $("ul").append("<li>456</li>") // 动态添加结果
})
// 目的 添加456的标签后 后续点击他在console上也能显示出来
~~~

### 案例

~~~js
// clone 复制标签
~~~

~~~html
<div class='outer'>
    <div class='item'>
        <input type='button' value="+" class="add_btn">
        <input type="text">
    </div>
</div>
~~~

~~~js
$(".add_btn").click(function(){
    // 添加标签
    var $clone = $(this).parent().clone();
    $clone.children(".add_btn").val("-").attr("class","remove_btn");
    $(".outer").append($clone);
})
	// 错误演示
$(".remove_btn").click(function(){
    $(this).parent().remove();
})
	// 删除标签
$(".outer").on("click",".remove_btn",function(){
    $(this).parent().remove();
})
~~~

## CSS样式

~~~js
/*
获取样式
$().css("样式属性");   // 获取元素的指定样式属性的值,如果有多个元素,只得到第一个元素的值

操作样式
$().css("样式属性","样式值").css("样式属性","样式值");
$().css({"样式属性1":"样式值1","样式属性2":"样式值2",....})

$().css("样式属性":function(){
  
  // 其他代码操作 
  return "样式值";
});
*/
~~~

~~~css
.c1{
	width:200px;
    height:200px;
    border:1px solid red;
    padding:50px;
}
~~~

~~~html
<div class='c1'>c1</div>
~~~

~~~js
// 获取盒子宽度
console.log($(".c1").width());

// 获取盒子高度
console.log($(".c1").height());

// 获取盒子内部宽度（包括内边距）
console.log($(".c1").innerWidth());

// 获取盒子内部高度（包括内边距）
console.log($(".c1").innerHeight());

// 获取盒子外部宽度（包括内边距、边框、外边距）
console.log($(".c1").outerWidth(true));

// 获取盒子外部高度（包括内边距、边框、外边距）
console.log($(".c1").outerHeight(true));
~~~

## css的位置操作

~~~js
/*
$("").offset([coordinates])  // 获取匹配元素在当前视口的相对偏移。
$("").position()             // 获取匹配元素相对父元素的偏移，position()函数无法用于设置操作。
$("").scrollTop([val])       // 获取匹配元素相对滚动条顶部的偏移。
*/
~~~

~~~css
.content{
    height:2000px;
    background-color:lightgray;
}
.return_top{
    width:160px;
    height:50px;
    background-color:lightseagreen;
    text-align:center;
    line-height:50px;
    position:fixed;
    bottom:20px;
    right:20px;
}
.hide{
    display:none;
}
~~~

~~~html
<div class='content'><h3>文章...</h3></div>
<div class="return_top hide">返回顶部</div>
~~~

~~~js
console.log($(window).scrollTop());
$("return_top").click(function(){
    $(window).scrollTop(0)
})
$(window).scroll(function(){
    console.log($(this).scrollTop())
    var v =($(this).scrollTop());
    if(v > 100){
        $(".return_top").removeClass("hide")
    }else{
        $(".return_top").addClass("hide");
    }
})
~~~

## css位置偏移

~~~css
.c1{
    width:800px;
    height:500px;
    background-color:lightpink;
    margin:200px;
}
.c2{
    width:200px;
    height:200px;
    background-color:orange;
}
~~~

~~~html
<div class='c1'>
    <div class="c2"></div>
</div>
~~~

~~~js
// 获取位置信息

// offset:相对于窗口偏移 position:相对于已经定位的父标签偏移量

var $offset = $(".c2").offset();
var $position = $(".c2").position();
console.log("$offset top:",$offset.top)
console.log("offset left:",$offset.left)

console.log("$position top:",$position.top);
console.log("$position left:",$position.left);

// 设置偏移量 offset 只能设置offset  position只能看
$(".c2").click(function(){
    $(this).offset({top:100px,left:100})
})
~~~

## jQuery动画效果

~~~js
/*
//基本
	show([s,[e],[fn]])   显示元素
	hide([s,[e],[fn]])   隐藏元素

//滑动
	slideDown([s],[e],[fn])  向下滑动 
	slideUp([s,[e],[fn]])    向上滑动

//淡入淡出
	fadeIn([s],[e],[fn])     淡入
	fadeOut([s],[e],[fn])    淡出
	fadeTo([[s],opacity,[e],[fn]])  让元素的透明度调整到指定数值

//自定义
	animate(p,[s],[e],[fn])   自定义动画 
	stop([c],[j])             暂停上一个动画效果,开始当前触发的动画效果
	
*/ 
~~~

~~~css
.c1{
    width:250px;
    height:250px;
    background-color:black;
}
.hide{
    display:none;
}
~~~

~~~html
<button class='show01'>显示</button>
<button class='hide01'>隐藏</button>
<hr>
<div class='c1'></div>
~~~

~~~js
// 自已实现的隐藏与显示
$(".show01").click(function(){
    $(".c1").removeClass("hide")
})
$(".show01").click(function(){
    $(".c1").addClass("hide")
})
~~~

-------------------------------------------------------------------------------------------------------

~~~css
.c1{
    width:250px;
    height:250px;
    background-color:black;
}
.hide{
    display:none;
}
~~~

~~~html
<p>
    <button class='show01'>显示</button>
    <button class='hide01'>隐藏</button>
</p>
<p>
    <button class='show02'>显示</button>
    <button class='hide02'>隐藏</button>
</p>
<div class='c1'></div>
~~~

~~~js
// show与hide方法
$(".show02").click(function(){
    $(".c1").show(1000,function(){ //  10秒之内完成这个动作
        alert("显示成功")
    });  
});
$(".hide02").click(function(){
    $(".c1").hide(1000,function(){  // 10秒之内完成这个动作
        alert("隐藏成功")
    }) 
})
~~~

-------------------------------------------------------------------------------------------------------

~~~css
.c1{
    width:250px;
    height:250px;
    background-color:black;
}
.hide{
    display:none;
}
~~~

~~~html
<p>
    <button class='show01'>显示</button>
    <button class='hide01'>隐藏</button>
</p>
<p>
    <button class='show02'>显示</button>
    <button class='hide02'>隐藏</button>
</p>
<p>
    <button class='show03'>显示</button>
    <button class='hide03'>隐藏</button>
</p
<div class='c1'></div>
~~~

~~~js
// slideDown与slideup方法
$(".show03").click(function(){
    $(".c1").slideDown(1000,function(){ //  10秒之内完成这个动作
        alert("显示成功")
    });  
});
$(".hide03").click(function(){
    $(".c1").slideUp(1000,function(){  // 10秒之内完成这个动作
        alert("隐藏成功")
    }) 
})
~~~

-------------------------------------------------------------------------------------------------------

~~~css
.c1{
    width:250px;
    height:250px;
    background-color:black;
}
.hide{
    display:none;
}
~~~

~~~html
<p>
    <button class='show01'>显示</button>
    <button class='hide01'>隐藏</button>
</p>
<p>
    <button class='show02'>显示</button>
    <button class='hide02'>隐藏</button>
</p>
<p>
    <button class='show03'>显示</button>
    <button class='hide03'>隐藏</button>
</p>
<p>
    <button class='show04'>显示</button>
    <button class='hide04'>隐藏</button>
</p>
<div class='c1'></div>
~~~

~~~js
// fadeIn与fadeOut方法
$(".show03").click(function(){
    $(".c1").fadeIn(1000,function(){ //  10秒之内完成这个动作
        alert("显示成功")
    });  
});
$(".hide03").click(function(){
    $(".c1").fadeOut(1000,function(){  // 10秒之内完成这个动作
        alert("隐藏成功")
    }) 
})
~~~

### 自定义动画效果

~~~jQuery
$(".box").animate(动画最终效果,动画完成的时间,动画完成以后的回调函数)
~~~

~~~css
.c1{
    width:250px;
    height:250px;
    background-color:black;
    position:absolute;
    top:240px;
    left:120px;
}
.hide{
    display:none;
}
~~~

~~~html
<p>
    <button class='show01'>显示</button>
    <button class='hide01'>隐藏</button>
</p>
<p>
    <button class='show02'>显示</button>
    <button class='hide02'>隐藏</button>
</p>
<p>
    <button class='show03'>显示</button>
    <button class='hide03'>隐藏</button>
</p>
<p>
    <button class='show04'>显示</button>
    <button class='hide04'>隐藏</button>
</p>
<p>
    <button class='animate'>animate</button>
</p>
<div class='c1'></div>
~~~

~~~js
$(".animate").click(function(){
    $(".c1").animate({
        "border-radius":"50%",
        "top":340,
        "left":200
    },1000,function(){
        $(".c1").animate({
            "border-radius":"50%",
            "top":240,
            "left":120
        },1000,function(){
            $(".animate").trigger("click") // 无限执行 trigger
        })
    })
})
~~~

## jQuery 扩展方法(插件机制)

~~~js
// 扩展jQuery对象本身。
// 用来在jQuery命名空间上增加新函数。 
// 在jQuery命名空间上增加两个函数:

    jQuery.extend({
      min: function(a, b) { return a < b ? a : b; },
      max: function(a, b) { return a > b ? a : b; }
});

    jQuery.min(2,3); // => 2
    jQuery.max(4,5); // => 5

~~~

~~~js
扩展 jQuery 元素集来提供新的方法（通常用来制作插件）

增加两个插件方法：

<body>

<input type="checkbox">
<input type="checkbox">
<input type="checkbox">

<script src="jquery.min.js"></script>
<script>
    jQuery.fn.extend({
      check: function() {
         $(this).attr("checked",true); // 一键全部钩中
      },
      uncheck: function() {
         $(this).attr("checked",false); // 一键全部勾掉
      }
    });

    $(":checkbox").check()
</script>

</body>
~~~