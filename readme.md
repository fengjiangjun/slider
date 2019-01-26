## 原生JS 实现的轮播图
该轮播图是使用原生 JS 实现的。
### 使用方式
```javascript
    var container = document.getElementById('A');
    var container1 = document.getElementById('B');

    var imgList = [
      {
        url: './img/1.jpg',
        href: 'https://www.baidu.com'
      },
      {
        url: './img/2.jpg',
        href: 'https://www.jd.com'
      },
      {
        url: './img/3.jpg',
        href: 'https://www.taobao.com'
      }
    ]
    new Slider({ container: container1, imgList: imgList, delayTime: 1,time:10,dotColor:'green' }).init();
    new Slider({ container, imgList, delayTime: 2 }).init();
```
>就是这么简单。
### options 可配置项
* container
    * 轮播图显示的容器，默认为 body。
* time
    * 轮播的持续时间，单位为秒。
* delayTime
    * 轮播的间隔时间，单位为秒。
* imgList
    * 接收的图片数组，根据该数组自动生成图片 DOM 对象。
    * 子对象的属性
        * url：图片的地址
        * href：点击跳转的链接。
* dotRadius
    * 缩略圆点的大小
* dotColor
    * 缩略圆点的默认颜色。
* dotActiveColor
    * 缩略圆点的激活颜色。

### 功能
* 自动生成轮播效果。
* 支持移动端、PC 端。
* 点击轮播图，跳转到对应的链接地址。
* 点击缩略圆点，能够快速切换到对应轮播图。
* 轮播到最后一幅图时，无缝衔接到第一幅图。
### 体积
* 未压缩，5KB。
### 不足
* 无法通过鼠标滑动手势，切换到下一幅轮播图。

### 未来
* 未来扩展出 React 和 Vue 版本的轮播图组件。



