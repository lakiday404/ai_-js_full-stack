# 浮动布局：从文字环绕到 BFC，一篇文章讲透

> CSS 浮动布局是前端网页设计中不可或缺的一环。浮动用来实现什么？它有哪些特性与缺陷？为什么父容器会"塌陷"？BFC 又是如何收拾残局的？本文逐一拆解。

## 一、文档流回顾

浏览器渲染页面时，遵循**从上到下、从左到右**的流式排布方式，这便是"文档流"。

> 补充：`img` 标签 `display: inline` 是行内元素，但它属于**媒体标签**，可以设置宽高，和普通行内元素不同。

## 二、浮动布局：文字环绕

浮动最初就是为**文字环绕图片**而设计的。来看 `1.html`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        img{
            float: left;
        }
        p{
            display: inline;
        }
    </style>
</head>
<body>
    <div class="page">
        <img width="200" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47j7pCLj3Cu9Uve8bYlwzCZ7WrS5PYt7Kqg&s" alt="">
        <p>
            Homelander: 而你，我的朋友，你才是真正的英雄。……
        </p>
    </div>
</body>
</html>
```

给 `img` 设置 `float: left;`，文字便会环绕图片。注意：p 标签作为块级元素实际上**覆盖**了图片区域，但文字没有重叠上去——这正是 float 的核心特性。

### 浮动布局的特性

1. `float: left | right` —— 元素**脱离文档流**，但**不会覆盖文字**
2. 浮动元素层级默认最高
3. **浮动会导致父容器高度塌陷**，影响后续元素排版
4. 只能左右浮动，不能设置 `top/bottom`

## 三、浮动带来的高度塌陷

先看 `2.html` —— 三个行内块级色块，还未加浮动：

```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    ul{
        font-size: 0;
    }
    .item{
        width: 200px;
        height: 200px;
        font-size: 16px;
    }
    .item:nth-child(1){
        background-color: red;
        display: inline-block;
    }
    .item:nth-child(2){
        background-color: yellow;
        display: inline-block;
    }
    .item:nth-child(3){
        background-color: green;
        display: inline-block;
    }
</style>
```

> 块级元素转为 `inline-block` 时，换行符会产生间距，因此在 `ul` 上设置 `font-size: 0` 消除。

运行结果是三个色块整齐排列为一行，父容器 `ul` 正常包裹子元素。

---

然后看 `3.html`——三个色块全部 `float: left;` **脱离文档流**，并在 `<ul>` 下方加入 `<h2>hello world</h2>`：

```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .item{
        width: 200px;
        height: 100px;
    }
    .item:nth-child(1) {
        background-color: #ed4949;
        float: left;
    }
    .item:nth-child(2) {
        background-color: #dfef26;
        float: left;
    }
    .item:nth-child(3) {
        background-color: #5df13c;
        float: left;
    }
    ul{
        /* 先注释掉所有清除方案，观察塌陷现象 */
        /* overflow: hidden; */
        /* height: 200px; */
    }
    /* ul::after{
        content: '@';
        display: block;
        clear: both;
    } */
    /* h2{
        clear: both;
    } */
</style>
<body>
    <ul>
        <li class="item">1</li>
        <li class="item">2</li>
        <li class="item">3</li>
        <!-- <div class="clear"></div> -->
    </ul>
    <h2>hello world</h2>
</body>
```

结果：`ul` 高度塌陷为 0，`h2` 直接跑到了色块下方并被色块覆盖。**这就是浮动脱离文档流的典型后果。**

## 四、五种清除浮动方案

`3.html` 和 `5.html` 中分别展示了五种方案：

### 方案 1：给父容器设高度

```css
ul{
    height: 200px;
}
```

**不推荐** —— 子元素高度通常是动态的，定死高度不灵活。

### 方案 2：浮动末尾加空容器 + clear

```html
<ul>
    <li class="item">1</li>
    <li class="item">2</li>
    <li class="item">3</li>
    <div class="clear"></div>
</ul>
```
```css
.clear{
    clear: left; /* 或 clear: both */
}
```

**不推荐** —— 每处浮动都多一个无意义的空元素，污染 DOM。

### 方案 3：父容器伪元素 + clear（推荐）

```css
ul::after{
    content: '';
    display: block;
    clear: both;
}
```

**推荐** —— 利用伪元素在父容器末尾"撑"一下，不增加额外 DOM 节点，优雅高效。`content` 值随意，设为空字符串即可。

### 方案 4：被影响元素设 clear

```css
h2{
    clear: both;
}
```

**不推荐** —— 治标不治本，应把问题在引起浮动的容器内部解决。

### 方案 5：父容器设为 BFC 容器（推荐）

`5.html` 的最终版本：

```css
ul{
    overflow: hidden;
}
```

```html
<body>
    <ul>
        <li class="item">1</li>
        <li class="item">2</li>
        <li class="item">3</li>
    </ul>
    <h2>hello world</h2>
</body>
```

BFC 在计算高度时会把浮动子元素也算进去，自然解决了塌陷问题。**一行代码，最简洁推荐。**

## 五、BFC 解决 margin 重叠

BFC 不仅解决浮动塌陷，还解决另一个经典 bug——**父子容器 margin-top 重叠**。

看 `4.html`：

```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .parent{
        height: 500px;
        background-color: green;
        margin-top: 100px;
        overflow: hidden;
    }
    .child{
        height: 200px;
        background-color: purple;
        margin-top: 50px;
        overflow: hidden;
    }
</style>
<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>
```

父子都设了 `margin-top`，预期是紫色块在绿色块内部下移 50px 露出绿色区域。但默认情况下，**两边的 margin 会重叠取最大值**，看起来就像子元素的 `margin-top` 没生效。

**解决方式**：给父容器添加 `overflow: hidden;`，将其变为 BFC 容器——内部子元素的 margin 不再"穿透"到外部。

### BFC 核心渲染规则

1. BFC 内部子元素同样从上到下、从左到右排列
2. BFC 是**独立渲染上下文**，内部子元素不影响外部
3. **BFC 计算高度时，浮动的子元素也会被计入**

### 哪些属性可以创建 BFC

- `overflow: hidden | auto | overlay | scroll`
- `position: absolute | fixed`
- `float: left | right`
- `display: flex | grid | inline-xxx`

---

## 总结

| 问题 | 推荐方案 |
|------|----------|
| 浮动父容器塌陷 | 伪元素 `::after` + `clear:both` 或父容器 `overflow:hidden` |
| margin 重叠 | 父容器 `overflow:hidden` 变 BFC |
| 日常文字环绕 | `float: left` 即可 |

> 完整代码见 `css/浮动布局/` 目录下 `1.html` ~ `5.html`。

---

> ·                         
