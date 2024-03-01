# 小窝装修之路


默认的Hugo主题虽然提供了很多功能，但是还是想要加入一些自己的想法~。还好网络上有很多的大神分享了他们的增强美化经验，对于我这种前端知识基本为零的菜狗，基本只需要做一个互联网知识的搬运工就行啦~这篇文章就是记录一下我对我们情侣小站的一些主题美化的过程~

## 自定义CSS样式
因为Hugo读取文件时的优先级是博客根目录 > 主题目录，因此我们如果想要自定义CSS样式覆盖主题自带的CSS样式，就应该创建新文件`~/blog/assets/css/_custom.css`。之后我们都在这里定义自己的CSS样式

## 自定义Javascript
很多的美化工作都离不开javascript，但是LoveIt主题默认并不支持自定义js，因此我们需要手动操作一下：

### 创建`custom.js`文件
在小站的根目录上创建文件：`~/blog/static/js/custom.js`，之后我们的所有自定义js都会放在这个文件里

### 修改模板文件以渲染js
1. 将主题目录下的文件`~/blog/themes/LoveIt/layouts/partials/assets.html`，复制到`~/blog/layouts/partials/assets.html`
2. 点进去，下拉到最后一行找到`{{- partial "plugin/analytics.html" . -}}`，在这行代码之前新添加一行：`<script type="text/javascript" src="/js/custom.js"></script>`

## 添加恋爱天数计数器
直接问的chatgpt，以一个目标时间为起点，用一段javascript代码，动态的输出当前时间距离目标时间已经过去的年月日时分秒，并且以秒为单位刷新。然后找到首页想要放置的位置，我暂且先放在了个人信息下方居中的位置，查阅代码发现对应的模板文件是`~/blog/themes/LoveIt/layouts/partial/home/profile.html`，于是将其复制到`~/blog/layouts/partial/home/profile.html`，并添加以下HTML代码：

```html
<!-- NOTE: 在一起纪念时间 -->
<div class="time-count">
    <!-- 静态文本 -->
    <div class="inline-container">我们在一起已经:</div>
    <!-- 动态文本 -->
    <div id="timer" class="inline-container"></div>
</div>
```

默认会换行显示，于是我们再添加一个自定义CSS样式：

```css
div.inline-container {
    display: inline-block;
    vertical-align: middle; /* 确保对齐也是垂直居中的 */
    margin: 5px; /* 提供一些外边距，以便它们之间有一些空间 */
}
```

最终效果如下：
![恋爱天数计数器](time-counter.jpeg "恋爱天数计数器")

## 主题配色
默认的LoveIt主题是白底黑字，虽然这是最经典的，但是白底看久了就显得有点单调，并且些微有些刺眼了。于是就打算折腾一下网页的配色。

最开始的时候老婆说想用红色，在[中国色](http://zhongguose.com/#chunmeihong)这个网站找到了一个叫「春梅红」的颜色（好巧，这个网站我很久以前就收藏过了），换色的过程比较简单，无非就是替换css样式。大概的步骤如下：
1. chrome打开开发者工具，select选中想要更改配色的网页元素，然后在开发者工具的右侧styles栏里会刷新出当前这个元素的css样式，覆盖优先级顺序是自上而下，所以只要从上往下找第一个color出现的位置就行了
2. 按住cmd键 + 鼠标单击这个color，开发者工具会跳转至这个颜色对应的css文件位置。在跳转的文件里，找到color的取值是来自哪个变量
3. 去项目代码里全局搜索这个变量名，然后修改这个变量的取值即可实现更改配色了

![chrome开发者工具](developer-tools.jpeg "chrome开发者工具")
![寻找颜色变量](find-color-variable-name.jpeg "寻找颜色变量")


LoveIt主题的配色方案基本都通过`_variables.scss`文件来统一管理，这个文件会定义很多的颜色变量，例如网站背景色的变量定义为
`$global-background-color: #fff !default;`。

在修改配色的时候，还遇到了很多的问题，例如红底白字的时候总感觉这个字的颜色太过刺眼，以及这个背景的颜色看着也不太顺眼等等。。但是很多都是凭感觉出来的东西，说不上为什么。于是我上网搜了好多关于网站配色的资料，终于找到了一个神奇的网站[color.review](https://color.review/)。这个网站介绍了一种理论叫做WCAG标准，大概的意思就是通过调整**网页背景颜色和字体颜色之间的相对对比度**，使得每个人包括色盲都有能力顺利地完成阅读。网站上面提供了调色盘，下方还会按照你的调色方案实时渲染一个样例出来。按照他的理论，在选定背景色后，文字的颜色应该落在**左侧三条对比度等高线的至少第二条下方**，这样才能保证Text Contrast达到AA的最低标准。

根据这个网站，我又重新调整了一波配色，把背景色稍微调淡了一些，字体颜色也选择了深一些的紫色，看上去的确是比第一版更好些了。

睡了一觉，第二天起来之后又有了新的idea。。起因是在看别的博主写的Hugo主题装修笔记的时候，看到有博主设置了一张图片作为自己的网页背景，我和老婆说这个主意好像也不错，但是要注意不能用花里胡哨的照片。于是选来选去，最终选择的是纸质纹理的图片，一方面比较简约，一方面也相对亮白色或者是红色，可以有更好的阅读体验吧。现在的背景图片素材[来自这里](https://unsplash.com/photos/white-wall-paint-with-black-shadow-y_2GC4EhOP4)，是一种textured paper。为了适配这个背景图片，还需要修改一系列的配色，最终的方案如下：

```scss
$global-background-color: #cec8b8 !default; // 网页整体背景颜色, 与网页背景相近
$global-font-color: #604B96 !default; // 正文文本颜色, 紫色
$global-font-secondary-color: #76808b !default; // 小字的颜色, 例如主页显示的文章摘要, 灰色
$global-link-color: #6e8ac5 !default; // 超链接文本颜色, 例如主页文章标题链接, 浅蓝色
$global-link-hover-color: #255fdb !default; // 超链接光标悬浮上去时的颜色, 深蓝色
$header-background-color: rgba(0, 0, 0, 0.01) !default; // 导航栏颜色, 透明
$single-link-color: #df8994 !default; // 单一超链接文本颜色, 浅粉红色
$code-background-color: #31392c !default; // 代码区域背景色, 深灰色
```

需要注意的是，同样因为是自定义的css样式，所以需要新建一个文件`~/blog/assets/css/_variables.scss`来覆盖原有主题自带的样式。

## 菜单栏图标
> 参考文档：[Content Management-Menus](https://gohugobrasil.netlify.app/content-management/menus/)

LoveIt主题默认的菜单栏是只有文字没有图标的，但是Hugo提供的强力的菜单功能，允许我们引用一部分HTML代码来嵌入小图标。在Hugo中，一个菜单（menu）是一组带元素命名的数组（named array），并且可以在我们的template模板中通过`.Site.Menus`这个site变量来调用。例如我们在`config.toml`里定义的主菜单就可以通过`.Site.Menus.Main`读取到。一个菜单数组通常会包括许多元素，其中我们重点关注以下几个
- `.URL`：菜单跳转的链接
- `.Name`：即菜单栏的文本名称
- `.Title`：鼠标悬停在此菜单链接上时，将显示标题
- `.Pre`：template.HTML类型，可以在名称前后添加的其他信息，例如图标

我们想要给菜单栏文字前面加上图标，只需要修改`pre`属性即可，我们选择的是使用[fontawesome](https://fontawesome.com/icons)这个非常流行的图标字体库，里面提供了非常非常丰富的网页图标，只需要复制HTML代码，赋给`pre`即可，例如：`pre = "<i class='fa-solid fa-paperclip'></i>"`
最后的实际效果如下：
!["菜单栏图标"](menu-icon.jpeg "菜单栏图标")


## 参考资料
> - [Hugo 的 LoveIt 主题修改及增强](https://zhuanlan.zhihu.com/p/646556566)
> - [哈哈哈啊](www.baidu.com)

{{< music server="netease" type="playlist" id="5195373284" autoplay=true order=random list-folded=true fixed=true >}}


