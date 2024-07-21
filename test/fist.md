# 单元测试报告

测试要求

-----------------------------------------------------------------------------------------------

【强制】好的单元测试必须遵守 AIR 原则。
说明：单元测试在线上运行时，感觉像空气（AIR）一样感觉不到，但在测试质量的保障上，却是非常关键的。好的单元测试宏观上来说，具有自动化、独立性、可重复执行的特点。
⚫ A：Automatic（自动化）
⚫ I：Independent（独立性）
⚫ R：Repeatable（可重复）
【强制】单元测试应该是全自动执行的，并且非交互式的。测试用例通常是被定期执行的，执 行过程必须完全自动化才有意义。输出结果需要人工检查的测试 不是一个好的单元测试。单元测试中不准使用 System.out 来进行人肉验证，必须使用 assert 来验证。
【强制】保持单元测试的独立性。为了保证单元测试稳定可靠且便于维护，单元测试用例之间决不能互相调用，也不能依赖执行的先后次序。
反例：method2 需要依赖 method1 的执行，将执行结果作为 method2 的输入。
【强制】单元测试是可以重复执行的，不能受到外界环境的影响。
说明：单元测试通常会被放到持续集成中，每次有代码 check in 时单元测试都会被执行。如果单测对外部 环境（网络、服务、中间件等）有依赖，容易导致持续集成机制的不可用。
正例：为了不受外界环境影响，要求设计代码时就把 SUT 的依赖改成注入，在测试时用 spring 这样的 DI框架注入一个本地（内存）实现或者 Mock 实现。
【强制】对于单元测试，要保证测试粒度足够小，有助于精确定位问题。单测粒度至多是类级 别，一般是方法级别。
说明：只有测试粒度小才能在出错时尽快定位到出错位置。单测不负责检查跨类或者跨系统的交互逻辑， 那是集成测试的领域。
【强制】核心业务、核心应用、核心模块的增量代码确保单元测试通过。
说明：新增代码及时补充单元测试，如果新增代码影响了原有单元测试，请及时修正。
【强制】单元测试代码必须写在如下工程目录：src/test/java，不允许写在业务代码目录下。
说明：源码编译时会跳过此目录，而单元测试框架默认是扫描此目录。
【推荐】单元测试的基本目标：语句覆盖率达到 70%；核心模块的语句覆盖率和分支覆盖率都 要达到 100%
说明：在工程规约的应用分层中提到的 DAO 层，Manager 层，可重用度高的 Service，都应该进行单元测试。
【推荐】编写单元测试代码遵守 BCDE 原则，以保证被测试模块的交付质量。
⚫ B：Border，边界值测试，包括循环边界、特殊取值、特殊时间点、数据顺序等。
⚫ C：Correct，正确的输入，并得到预期的结果。
⚫ D：Design，与设计文档相结合，来编写单元测试。
⚫ E：Error，强制错误信息输入（如：非法数据、异常流程、业务允许外等），并得到预期的结果。
10.【推荐】对于数据库相关的查询，更新，删除等操作，不能假设数据库里的数据是存在的，或 者直接操作数据库把数据插入进去，请使用程序插入或者导入数据的方式来准备数据。
反例：删除某一行数据的单元测试，在数据库中，先直接手动增加一行作为删除目标，但是这一行新增数 据并不符合业务插入规则，导致测试结果异常。
11.【推荐】和数据库相关的单元测试，可以设定自动回滚机制，不给数据库造成脏数据。或者对单元测试产生的数据有明确的前后缀标识。
正例：在阿里巴巴企业智能事业部的内部单元测试中，使用 _ENTERPRISE_INTELLIGENCE UNIT_TEST _的前缀来标识单元测试相关代码。
12.【推荐】对于不可测的代码在适当的时机做必要的重构，使代码变得可测，避免为了达到测试 要求而书写不规范测试代码。
13.【推荐】在设计评审阶段，开发人员需要和测试人员一起确定单元测试范围，单元测试最好覆盖所有测试用例（UC）。
14.【推荐】单元测试作为一种质量保障手段，在项目提测前完成单元测试，不建议项目发布后补 充单元测试用例。
15.【参考】为了更方便地进行单元测试，业务代码应避免以下情况：
⚫ 构造方法中做的事情过多。
⚫ 存在过多的全局变量和静态方法。
⚫ 存在过多的外部依赖。
⚫ 存在过多的条件语句。
说明：多层条件语句建议使用卫语句、策略模式、状态模式等方式重构。
16.【参考】不要对单元测试存在如下误解：
⚫ 那是测试同学干的事情。本文是开发手册，凡是本文内容都是与开发同学强相关的。
⚫ 单元测试代码是多余的。系统的整体功能与各单元部件的测试正常与否是强相关的。
⚫ 单元测试代码不需要维护。一年半载后，那么单元测试几乎处于废弃状态。
⚫ 单元测试与线上故障没有辩证关系。好的单元测试能够最大限度地规避线上故障。

-----------------------------------------------------------------------------------------------

定义：是指对软件中的最小可测试单元进行检查和验证。
Java里单元指一个方法。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试

Java里单元指一个方法。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试

-----------------------------------------------------------------------------------------------

## Test

- 调用Test包

~~~java
// 将junit框架的jar包导入到项目中 (注:IDEA集成junit框架,不需要我们自已手工导入了)
// 测试方法必须声明@Test注释,然后再测试方式中,编写代码调用被测试的业务方法进行测试
// 开始测试:选中测试方法,右键选择"junit运行",如果测试通过是绿色 如果测试失败,则显示红色
~~~

~~~java
import org.junit.Test;
public class string extends Main {
    // extends 属于 用于调用那个类里面的内容
    @Test // 测试方法
    public  void  testPrintNumber(){
            string.printNumber("admin");
            string.printNumber(null);
    }
}
~~~

- 使用junit的注意事项

~~~java
// @Test 测试类中的方法必须用它修饰才能成为测试方法,才能启动执行
// @Before 用来修饰一个实例方法 该方法会在每一个测试方法执行之前执行一次
// @After 用来修饰一个实例方法,该方法会在每一个测试方法执行之后执行一次
// @BeforeClass 用来修饰一个静态方法,该方法会在所有测试方法之前之执行一次
// @AfterClass 用来修饰一个静态方法,该方法会在所有测试方法之后只执行一次
// 在测试方法执行之前的方法,常用于:初始化资源.
// 在测试方法执行完后再执行的方法,常用于:释放资源.
~~~

## 断言

- Assert类中的主要方法

~~~java
import org.junit.Test;
import static org.junit.Assert.assert---;
//1、assertEquals(expected, actual)：验证预期值和实际值是否相等。
assertEquals(10, result); // 预期值为10，实际值为result
//2、assertTrue(condition)：验证条件是否为真。
assertTrue(result > 0); // 验证result大于0
//3、assertFalse(condition)：验证条件是否为假
assertFalse(result.isEmpty()); // 验证result不为空
//4、assertNull(object)：验证对象是否为null
assertNull(result); // 验证result为null
//5、assertNotNull(object)：验证对象是否不为null。
assertNotNull(result); // 验证result不为null
~~~

- AsserThat

~~~java
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.下面的内容;
is 						断言参数等于后面给出的匹配表达式 		assertThat(5, is (5));
not 					断言参数不等于后面给出的匹配表达式 		assertThat(5, not(6));
equalTo 				断言参数相等 							assertThat(30, equalTo(30));
equalToIgnoringCase 	断言字符串相等忽略大小写 		assertThat(“Ab”, equalToIgnoringCase(“ab”));
containsString 			断言字符串包含某字符串 			assertThat(“abc”, containsString(“bc”));
startsWith 				断言字符串以某字符串开始 				assertThat(“abc”, startsWith(“a”));
endsWith 				断言字符串以某字符串结束 				assertThat(“abc”, endsWith(“c”));
nullValue 				断言参数的值为null 					assertThat(null, nullValue());
notNullValue 		    断言参数的值不为null 					assertThat(“abc”, notNullValue());
greaterThan 			断言参数大于 							assertThat(4, greaterThan(3));
lessThan 				断言参数小于 							assertThat(4, lessThan(6));
greaterThanOrEqualTo 	断言参数大于等于 					assertThat(4, greaterThanOrEqualTo(3));
lessThanOrEqualTo 		断言参数小于等于 					assertThat(4, lessThanOrEqualTo(6));
closeTo 				断言浮点型数在某一范围内 				assertThat(4.0, closeTo(2.6, 4.3));
allOf 				断言符合所有条件，相当于&& 		 assertThat(4,allOf(greaterThan(3), lessThan(6)));
anyOf 				断言符合某一条件，相当于或 		assertThat(4,anyOf(greaterThan(9), lessThan(6)));
hasKey 					断言Map集合含有此键 					assertThat(map, hasKey(“key”));
hasValue 				断言Map集合含有此值 					assertThat(map, hasValue(value));
hasItem 				断言迭代对象含有此元素 				assertThat(list, hasItem(element));
~~~

- @Parameters (传入参数进行断言)

~~~java
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
//声明变量，测试数据和期望结果变量声明，包括测试类指定的特殊运行器
@RunWith(Parameterized.class)
public class java4Test {
    private String x;
    private String y;
}
// 公共的构造函数
public java4Test(String x,String y) {
		this.x=x;//输入数据
		this.y=y;//断言数据
}
// @Parameters注释的公共静态方法，并且包含初始化需要测试的数据
@Parameters
public static Collection<Object[]>data() {
    return Arrays.asList(new Object[][]{
            //输入数据  //断言数据
            {"absesde","efsesde"},
            {"sdfcdcdcd","sdfghghgh"},
            {"sfdesfe","SFDESFE"}
    });
}
// 测试方法，包含断言
@Test
public void test() {
    String ss=aa.data(x);
    assertEquals(y, ss);
}

~~~

## 覆盖方法

### 一、语句覆盖：使程序中每一可执行语句至少执行一次。

1.1 分析：需要覆盖的可执行语句为x = x / a 和 x = x + 1

1.2 测试用例如下：a=2，b=0，x=3  路径覆盖：a-c-e

#### 二、判定（分支）覆盖：使程序中每个判定的"真"和"假"至少执行一次

2.1分析：需要覆盖的路径为：a-c-e和a-b-d 或 a-b-e和a-c-d

2.2 测试用例如下：

⑴ a = 2, b = 0, x = 3 覆盖路径：a-c-e

⑵ a = 1, b = 0, x = 1 覆盖路径：a-b-d

⑶ a = 2, b = 1, x = 1 覆盖路径：a-b-e

⑷ a = 3, b = 0, x = 3 覆盖路径：a-c-d

### 三、条件覆盖：使程序中每个判定的每个条件取得各种可能的结果

3.1 分析：需要满足的判定为：判定一(a > 1, a <= 1, b = 0, b != 0) ; 判定二(a = 2, a != 2, x > 1, x <= 1)

3.2 测试用例如下：

⑴ a = 2, b = 0, x = 3 取到a>1(同时满足a=2), b = 0, x>1

⑵ a = 1, b = 1, x = 1 取到a <= 1(同时满足a!=2), b != 0, x <= 2

⑶ a = 1, b = 0, x = 3 取到a <= 1(同时满足a!=2), b = 0, x >1

⑷ a = 2, b = 1, x = 1 取到a>1(同时满足a=2), b != 0, x<=1

### 四、判定/条件覆盖：程序中的每个输入和输出都至少被调用一次，在程序中的每一个条件必须产生所有可能的输出结果至少一次，并且每一个判定中的每一个条件必须能够独立影响一个判定的输出，即在其他条件不变的前提下仅改变这个条件的值，而使判定结果改变。

4.1分析：

需要覆盖的路径为：a-c-e和a-b-d 或 a-b-e和a-c-d

需要满足的判定为：判定一(a > 1, a <= 1, b = 0, b != 0) ; 判定二(a = 2, a != 2, x > 1, x <= 1)

4.2 测试用例如下：

⑴ a = 2, b = 0, x = 3 覆盖路径a-c-e 取到a>1(同时满足a=2), b = 0, x>1

⑵ a = 1, b = 1, x = 1 覆盖路径a-b-d 取到a <= 1(同时满足a!=2), b != 0, x <= 1

### 五、条件组合覆盖：使程序中所有判定的条件组合至少执行一次

5.1 分析：需要覆盖的条件组合为：

a > 1, b = 0

a>1, b != 0

a <= 1, b = 0

a <= 1, b != 0

a = 2, x > 1

a = 2, x< = 1

a != 2, x > 1

a != 2, x <= 1

5.2 测试用例如下：

⑴ a = 2, b = 0, x = 3 覆盖组合1，5

⑵ a = 2, b = 1, x = 1 覆盖组合2，6

⑶ a = 1, b = 0, x = 3 覆盖组合3，7

⑷ a = 1, b = 1, x = 1 覆盖组合4，8

### 六、路径覆盖：使程序中每条路径至少执行一次

6.1 分析：需要覆盖的路径为：a-c-e、 a-b-d、 a-b-e、 a-c-d

6.2 测试用例如下：

⑴ a = 2, b = 0, x = 3 覆盖路径：a-c-e

⑵ a = 1, b = 0, x = 1 覆盖路径：a-b-d

⑶ a = 2, b = 1, x = 1 覆盖路径：a-b-e

⑷ a = 3, b = 0, x = 4 覆盖路径：a-c-d

