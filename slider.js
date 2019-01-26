function Slider (options, container, imgList, time) {
  this.defaultOptions = {
    container: document.body,
    imgList: null,
    time: 3,
    delayTime: 5,
    dotColor: '#FFF',
    dotActiveColor: 'red',
    dotRadius: 10,
    dotBottom: 20
  };

  Object.assign(this, this.defaultOptions, options);
  this.timer = null;
  this.index = 0;
  this.imgWrapper = null;

  this.dotList = [];
  this.itemList = [];
};
Slider.prototype.loop = function () {
  this.index++;
  if (this.index > this.imgList.length) {
    this.index = 1;
    this.imgWrapper.style.transition = this.time + 's';
  } else {
    this.imgWrapper.style.transition = this.time + 's';
  }
  this.imgWrapper.style.transform = 'translateX(' + (-this.index * this.width) + 'px)';
}

Slider.prototype.go = function(i){
  var that = this;
  return function(){
    window.location.href = that.imgList[i].href;
  }
}
Slider.prototype.init = function () {
  if (!this.imgList || !this.imgList.length) {
    console.warn('you need config imgList.');
    return;
  }
  var initStyle = getComputedStyle(this.container, null)


  this.container.style.position = 'relative';
  this.container.style.overflow = 'hidden';
  this.width = initStyle.width.replace('px', '') - 0;
  this.height = initStyle.height.replace('px', '') - 0;
  this.imgWrapper = document.createElement('div');
  this.imgWrapper.style.width = this.width * this.imgList.length + 'px';
  this.imgWrapper.style.height = this.height + 'px';
  for (var i = 0; i < this.imgList.length; i++) {
    var img = this.imgList[i];
    var div = createDom(img);
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.left = this.width * i + 'px';
    div.addEventListener('click', this.go(i));
    this.imgWrapper.appendChild(div);
    this.itemList.push(div);
  }
  var div = this.itemList[0].cloneNode(true);
  this.imgWrapper.appendChild(div);
  div.style.left = this.width * this.imgList.length + 'px';
  div.addEventListener('click', this.go(0));
  this.itemList.push(div);
  this.container.appendChild(this.imgWrapper);
  this.createDot();
  this.dotList[0].style.backgroundColor = this.dotActiveColor;

  this.imgWrapper.style.transition = this.time + 's';
  this.imgWrapper.addEventListener('transitionend', function end () {

    if (this.index == this.imgList.length) {
      this.imgWrapper.style.transition = '';
      this.imgWrapper.style.transform = 'translateX(0px)';
    }
    this.dotList.forEach(item => {
      item.style.backgroundColor = this.dotColor;
    })
    this.dotList[this.index == this.imgList.length ? 0 : this.index].style.backgroundColor = 'red';
    clearTimeout(this.timer);
    this.timer = setTimeout(this.loop.bind(this), this.delayTime * 1000)
  }.bind(this));
  var that = this;
  window.addEventListener('load',
    that.animate.bind(that)
  )
}
Slider.prototype.animate = function () {
  this.timer = setTimeout(this.loop.bind(this), this.delayTime * 1000)
}
Slider.prototype.click = function (i) {
  var that = this;
  return function () {
    that.dotList.forEach(item => {
      item.style.backgroundColor = that.dotColor;
    })
    var current = 0;
    if (that.index == that.imgList.length && i == 0) {
      current = 0;
    } else {
      current = i;
    }
    that.dotList[current].style.backgroundColor = that.dotActiveColor;
    that.imgWrapper.style.transition = '';
    that.index = current;
    that.imgWrapper.style.transform = 'translateX(' + (-that.index * that.width) + 'px)';
    clearTimeout(that.timer);
    that.animate();
  }
}
function createDom (img) {
  var div = document.createElement('div');

  var imgDom = new Image();
  imgDom.src = img.url; imgDom.style.display = 'block';
  imgDom.style.width = '100%';
  imgDom.style.height = '100%';
  div.style.cssText = 'font-size:0;position:absolute;left:0;top:0'
  div.appendChild(imgDom);
  return div;
}
Slider.prototype.createDot = function () {
  var ul = document.createElement('ul');
  ul.style.cssText = 'position:absolute;margin:0;bottom:'+this.dotBottom+'px;left:50%;z-index:2;transform:translateX(-50%)';
  for (var i = 0; i < this.imgList.length; i++) {
    var li = document.createElement('li');
    li.style.width = this.dotRadius + 'px'
    li.style.height = this.dotRadius + 'px'
    li.style.borderRadius = this.dotRadius + 'px';
    li.style.float = 'left';
    li.style.marginRight = '10px';
    li.style.backgroundColor = this.dotColor;
    li.style.listStyle = 'none';
    li.addEventListener('click', this.click(i))
    ul.appendChild(li);
    this.dotList.push(li);
  }
  this.container.appendChild(ul);
}
