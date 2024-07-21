## Web自动化 操作知识点
本章笔记记载于2024-7-16日 
## 浏览器驱动

~~~python
from selenium import webdriver
driver = webdriver.Chrome()
~~~

### 定位

~~~python
from selenium.webdriver.common.by import By
# Id定位
driver.find_element(By.ID, "ID属性对应的值")
# class定位
driver.find_element(By.CLASS_NAME, "class name属性对应的值")
# name定位
driver.find_element(By.NAME, "name属性对应的值")
# Tag标签定位
driver.find_element(By.TAG_NAME, 'input')
driver.find_element(By.TAG_NAME, 'button')
# link text(文字定位)
driver.find_element(By.LINK_TEXT, '欢迎光临测试人社区')
# partial link text(模糊文字定位)
driver.find_element(By.PARTIAL_LINK_TEXT, '测试人社区')
# XPATH定位
driver.find_element(By.XPATH, "//input[@id='username']")
# CSS selector定位
driver.find_element(By.CSS_SELECTOR, "#username")
~~~

### 小杂

~~~python
import selenium
# 获取当前浏览器url
print(driver.current_url)
# 获取当前页面标题
print(driver.title)
~~~

## 方法

#### 第一部分（控制浏览器）

~~~python
import selenium
# 刷新浏览器
driver.refresh()
# 后退到上一次页面
driver.back()
# 前进到上一次页面
driver.forward()
# 退出当前浏览器窗口
driver.quit()
# 关闭所以浏览器窗口
driver.close()
~~~

#### 第二部分(截图)

~~~python
import selenium
# 元素截图
driver.save_screenshot("bb.png") # 在bb.png加入地址
# 页面截图
driver.get_screenshot_as_file("cc.png") # 在cc.png加入地址
~~~

#### 第三部分（页面或控件大小）

~~~python
import selenium
1，# 窗口最大化
driver.maximize_window()
2，# 自定义窗口大小
dirver.set_window_size(宽,高)
3，# 获取控键大小(先定位,后定义)
search = driver.find_element(By.XPTAH,"")
search_size = search.size
print(search_size)
4，# 获取文本信息
search = driver.find_element(By.XPTAH,"")
search_text = search.txt
print(search_text)
# 3,4可以封装
def base_get_text(self, loc):
    return self.base_posit_element(loc).text

def base_get_text(self, loc):
    return self.base_posit_element(loc).size
~~~

#### 第四部分（动作部分)

~~~python
import selenium
# 清空输入框内容
clear()
# 输入框内容
send_keys()
# 点击控件
click()
~~~

#### 第五部分(判断元素是否存在)

~~~python
# 判断元素是否存在
search_ele = driver.find_element(By.XPTAH,"")
s_ele =search_ele.is_displayed()
print(s_ele)
# 封装
def base_distinguish_element(self,loc)
    return self.base_posit_element(loc).is_displayed()
~~~

#### 第六部分（等待）

~~~python
import selenium
# 显示等待
from selenium.webdriver.support import expected_conditions as EC
# 封装
def base_posit_element(self, loc):
    return WebDriverWait(self.driver,timeout=30,poll_frequency=0.5).until(lambda x: x.find_element(*loc))
# 隐式等待
#定义：表示最大等待为设置的时间，在设置时间内加载出来就直接往下执行，不需要把设置时间等完，如设置时间内没加载出来就会报错
# 封装
def base_posit_element(self, loc):
    self.driver.implicitly_wait(n)
    return self.driver.find_element(*loc)
# 强制等待
# 定义：先导入time类名：import time（from time import sleep），必须把设置时间等完才会往下执行
time.sleep()
~~~

#### 第七部分(cookie的获取与植入)

~~~python
import selenium
# 获取cookie
driver.get_cookies()
#执行此代码的时候 下一步就是自已执行登录让系统记录cookie值
with open('cookie','wt') as f:
    f.write(json.dumps(cookie))
# 在记录完cookie之后 之后在cookie中F是f T是t不符合python输入格式
with open('cookie','r') as f:
    for line in f:
        line = line.replace('t','T')
        line = line.replace('f','F')
        with open('new_cookie','wt') as t:
            t.write(line)
# cookie修改完毕之后开始植入cookie
cookies = [{你所获得的cookie}]
for cookie_line in cookies:
    driver.add_cookie(cookie_line)
# 最后在调用一下页面
driver.get("url")
# 如何测试ip的时候登录页面是一样的那就删除cookie
driver.delete_all_cookies()
~~~

#### 第八部分（弹窗处理）

~~~python
# 弹窗处理
driver.swtich_to.alert.text
driver.swtich_to.alert.accept() # 确定
driver.switch_to.alert.dismiss() # 取消
~~~

#### 第九部分（多窗口处理）	

~~~python
# 多窗口处理
# 获取当前所有窗口信息
driver.window_handles
# 获取当前窗口信息
driver.current_window_handle
# 切换窗口
driver.switch_to.window(dirver.window handles[0])
driver.switch_to.window(dirver.window handles[-1]) # 最后一个弹窗
~~~

#### 第十部分(鼠标操作)

~~~python
from selenium.webdriver.common.action_chains import ActionChains
# 创建一个ActionChains对象
action = ActionChains(driver)

# 鼠标移动至指定元素
element = driver.find_element_by_id("element_id")
action.move_to_element(element).perform()  # 执行鼠标移动操作

# 单击操作
action.click().perform()  # 执行单击操作

# 右击操作
action.context_click().perform()  # 执行右击操作

# 双击操作
action.double_click().perform()  # 执行双击操作

# 拖拽操作
source_element = driver.find_element_by_name("source")
target_element = driver.find_element_by_name("target")
action.drag_and_drop(source_element, target_element).perform()  # 执行拖拽操作

# 按下鼠标左键
action.click_and_hold().perform()  # 按下鼠标左键，需在合适的地方调用 release() 释放鼠标左键

# 释放鼠标左键
action.release().perform()  # 释放鼠标左键
~~~

#### 第十一部分(键盘操作)

~~~python
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

# 创建一个ActionChains对象
action = ActionChains(driver)

# 向元素发送特殊键（比如回车键）
element = driver.find_element_by_id("element_id")
element.send_keys(Keys.RETURN)  # 使用回车键

# 模拟键盘按键组合（比如Ctrl+C）
action.key_down(Keys.CONTROL).send_keys('c').key_up(Keys.CONTROL).perform()  # 按下Ctrl键同时再按C键，然后释放Ctrl键

# 在输入框中输入文本
input_element = driver.find_element_by_id("input_id")
input_element.clear()  # 清空输入框
input_element.send_keys("Hello, World!")  # 在输入框中输入"Hello, World!"

# 执行完所有的ActionChains操作
action.perform()
~~~

#### 第十二部分(下拉框操作)

~~~python
from selenium.webdriver.support.select import Select
from selenium import WebDriver

element = driver.find_element(By,定位方法,'')
Select(element).后接方法

select_by_index() # 通过下标定位
select_by_vaule()    # 通过value
select_by_visible_text() # 显示文本
~~~

注意事项

- 实例化select时,需要的参数为 select标签元素

- 调用select类下面的方法,是通过索引,vaule属性值,显示文本去控制,而不是click事件

## 数据驱动

### DDT

文件处理

~~~yaml
- username: alice
  password: password1
- username: bob
  password: password2
- username: charlie
  password: password3
~~~

## 数据处理

~~~python
# 如果csv带标头的话就用这个
# 从 CSV 文件中读取测试数据
def load_test_data():
    test_data = []
    with open('Data.txt', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            test_data.append(row)
    return test_data

# 如果csv没带标头
    test_data = []
    with open('Data.txt', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            test_data.append(row)
    return test_data

# 从 TXT 文件中读取测试数据
def load_test_data():
    test_data = []
    with open('Data.txt', 'r') as file:
        for row in file:
            # 根据实际数据的分隔符，将每一行的数据进行拆分
            username, password = row.strip().split(",")
            test_data.append((username, password))
    return test_data

# yaml文件数据驱动
def load_test_data():
    test_data = []
    with open('sss.YAML.py', 'r') as file:
        test_data = yaml.safe_load(file)
    return test_data

# txt文件跳过第一行
# 从 TXT 文件中读取测试数据
def load_test_data():
    test_data = []
    with open('Data.txt', 'r') as file:
        for index, row in enumerate(file):
            # 跳过第一行
            if index == 0:
                continue
            # 根据实际数据的分隔符，将每一行的数据进行拆分
            username, password = row.strip().split(",")
            test_data.append((username, password))
    return test_data

# 与Mysql
def load_test_data():
    test_data = []
    connection = mysql.connector.connect(
        host='localhost',
        user='your_username',
        password='your_password',
        database='your_database'
    )
    cursor = connection.cursor()
    cursor.execute("SELECT username, password FROM test_table")
    rows = cursor.fetchall()
    for row in rows:
        username = row[0]
        password = row[1]
        test_data.append((username, password))
    cursor.close()
    connection.close()
    return test_data

~~~

## Web自动化 问题总结

## 定位问题

```python
input_locs = self.driver.find_elements(By.TAG_NAME, "input")
for input_element in input_locs:
    if 'fe' in input_element.get_attribute("id"):
        input_element.send_keys("123")
        break
time.sleep(10)
```

## ddt

```python
import csv  # 导入csv模块

def csv_py():
    # 打开CSV文件
    stream = open(r"C:\Users\15633\Desktop\PY\pythonProject\pythonProject\pythonProject\Website\test_data\test_csv.csv",
                  encoding="utf-8")
    data = csv.reader(stream)  # 使用csv.reader()读取文件内容
    next(data)  # 跳过第一行（表头）
    data_list = []  # 创建一个空列表，用于存储数据行
    for row in data:
        data_list.append(row)  # 将每一行数据添加到data_list中
    return data_list  # 返回包含数据行的列表
```

~~~python
import unittest

import ddt
from EPR_PP.Website.test_case.model.function import csv_py
from EPR_PP.Website.test_case.model.myunit import unt_scy
from EPR_PP.Website.test_report.AddPage import Addpage


@ddt.ddt
class test(unt_scy):
    csv = csv_py()

    @ddt.data(*csv)
    def test_01(self,list):
        Addpage(self.driver,list[0])

if __name__ == '__main__':
    unittest.main()
~~~

## 弹窗处理

~~~python
def window_alert(action):
    driver.switch_to.alert.text
    if action == 1:
        driver.switch_to.alert.accept()
    elif action == 2:
        driver.switch_to.alert.dismiss()
~~~

## 鼠标操作

~~~python
from selenium.webdriver import ActionChains
from selenium import webdriver

driver = webdriver.Chrome()
action = ActionChains(driver)
url = 'https://www.baidu.com/'
driver.get(url)

#定位元素
element = driver.find_element("xpath", '//*[@id="hotsearch-content-wrapper"]/li[1]/a/span[2]')

#移动至元素
action.move_to_element(element)


action.click(element).perform()       # 执行单击操作
action.context_click().perform()     # 执行右击操作
action.double_click().perform()      # 执行双击操作
action.click_and_hold().perform()    # 按下鼠标左键，需在合适的地方调用 release() 释放鼠标左键
action.release().perform()           # 释放鼠标左键
~~~

## 多窗口

~~~python
def base_more_element(self, u):
    all_handles = self.driver.window_handles
    self.driver.switch_to.window(all_handles[u])  
# 切换到目标窗口
~~~

## 智能等待

~~~python
driver.implicitly_wait(seconds)
~~~

## 测试报告

~~~ python
from HTMLTestRunner import HTMLTestRunner
import unittest


test_dir = './test_case'
# 设置测试用例文件夹路径为当前目录下的 test_case 文件夹

discover = unittest.defaultTestLoader.discover(test_dir, pattern="test*.py")
# 使用 unittest 模块的 defaultTestLoader 类的 discover 方法来发现指定文件夹中的测试用例文件，只加载文件名以 test 开头且以 .py 结尾的文件作为测试用例

report_dir = './test_report'
# 设置测试报告存放的文件夹路径为当前目录下的 test_report 文件夹

report_name = report_dir + '/' + '.html'
# 拼接测试报告文件的路径，即 test_report 目录下的 .html 文件

if __name__ == '__main__':
    # 如果当前模块是主程序入口
    with open(report_name, "wb") as f:
        # 使用 with 语句打开测试报告文件，以二进制写入模式打开
        run = HTMLTestRunner(stream=f, title="Test Report", description="erp test")
        # 创建一个 HTMLTestRunner 对象，指定输出流为打开的文件对象，设置测试报告的标题和描述
        run.run(discover)
        # 运行测试用例
        f.close()
        # 关闭打开的文件
~~~

~~~python
import unittest
from HEMTL.htmi import test
from tools.HTMLTestRunner import HTMLTestRunner
# 定义保存HTML报告的目录


# 定义保存HTML报告的目录
if __name__ == '__main__':  # 如果当前脚本作为主程序运行
    path = './first.html'  # HTML报告保存路径
    suit = unittest.TestLoader().loadTestsFromTestCase(test)  # 加载测试用例
    with open(path, 'wb') as f:  # 以二进制写方式打开HTML报告文件
        runner = HTMLTestRunner(
            stream=f,  # 指定测试报告输出流
            title="测试报告",  # 设置测试报告标题
            description="测试内容"  # 设置测试报告描述信息
        )
    runner.run(suit)  # 运行测试用例并生成HTML测试报告
~~~

## 传入参数问题

1.导包 from parameterized import parameterized

 2.修饰测试函数 @parameterized.expand([数据])

## 跳过问题

unitest 跳过

分类:

1.直接跳过

​       语法:@unittest.skip("原因")

​       场景:一般适合功能未完成用例

2.条件满足跳过

​       语法:@unittest.skipIf(条件,原因)

​        场景:一般判定条件满足,就不执行,如:达到指导版本,此功能失效:

提示:

以上两种方式,都可以修饰函数和类:

## web自动化破解码

## 方法一 图片验证码

~~~python
import ddddocr

# 实例化对象
ocr = ddddocr.DdddOcr()

# 读取图片内容
with open(r"验证码图片的绝对路径", mode='rb') as f:
    img = f.read()

# 识别验证码
result = ocr.classification(img)
print(result)
~~~

