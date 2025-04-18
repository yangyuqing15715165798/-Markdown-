# Markdown完整功能展示

本文档展示了本应用支持的全部Markdown语法功能。

## 1. 标题演示

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 2. 文本格式化

**粗体文本** 和 *斜体文本* 以及 ***粗斜体文本***

~~删除线~~ 和 `行内代码`

<u>下划线文本</u> (HTML标签)

## 3. 列表

### 无序列表
- 项目1
- 项目2
  - 嵌套项目2.1
  - 嵌套项目2.2
- 项目3

### 有序列表
1. 第一项
2. 第二项
   1. 嵌套项2.1
   2. 嵌套项2.2
3. 第三项

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 另一个未完成任务

## 4. 链接和图片

[链接文本](https://example.com "链接标题")

![图片示例](https://via.placeholder.com/150 "图片标题")

## 5. 引用

> 这是一个引用
> 
> 引用可以包含多个段落
>
>> 嵌套引用

## 6. 代码块

内联代码：`console.log('Hello')`

代码块：
```javascript
function greeting(name) {
  return `Hello, ${name}!`;
}

console.log(greeting('World'));
```

```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)
        
print(factorial(5))  # 输出: 120
```

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}
```

## 7. 表格

| 名称 | 类型 | 描述 |
| --- | :---: | ---: |
| id | 整数 | 用户ID |
| name | 字符串 | 用户名称 |
| email | 字符串 | 用户邮箱 |
| active | 布尔值 | 是否激活 |

## 8. 水平线

---
或者
***
或者
___

## 9. 数学公式

行内公式: $E = mc^2$

行间公式:

$$
\frac{d}{dx}(x^n) = nx^{n-1}
$$

$$
\int_{a}^{b} x^2 dx = \left[ \frac{x^3}{3} \right]_{a}^{b} = \frac{b^3 - a^3}{3}
$$

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\cdot
\begin{pmatrix}
e & f \\
g & h
\end{pmatrix}
=
\begin{pmatrix}
ae + bg & af + bh \\
ce + dg & cf + dh
\end{pmatrix}
$$

## 10. HTML嵌入

<div style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
  <h3>这是嵌入的HTML内容</h3>
  <p>Markdown允许直接嵌入HTML代码</p>
</div>

## 11. 脚注

这是一个带有脚注的句子[^1]。

[^1]: 这是脚注内容。

## 12. 定义列表

术语 1
: 定义 1

术语 2
: 定义 2a
: 定义 2b

## 13. 上标和下标

上标示例: X^2^

下标示例: H~2~O

## 14. 引用块与代码高亮结合

> ```java
> public class HelloWorld {
>     public static void main(String[] args) {
>         System.out.println("Hello, World!");
>     }
> }
> ```

## 15. 特殊符号

&copy; 版权符号

&trade; 商标符号

&le; 小于等于

&ge; 大于等于

&ne; 不等于

## 16. 表情符号

:smile: :heart: :thumbsup: :rocket:

*注: 表情符号支持取决于具体的Markdown实现*

## 结语

这个文档展示了大多数常用的Markdown语法。本应用支持所有标准Markdown语法以及许多扩展语法，让您的文档排版更加灵活多样。 