# remote-console
使用socket.io实现的远程控制台，可在pc端抓取手机页面的控制台输出

## 安装
1. 通过npm包安装
``` html
npm i @jianming/remote-console -g
cre start
```

2. 通过git clone源代码，然后
```html
npm start
```

## 使用方法
### 方法1
```html 
npm install @jianming/remote-console -g
cre start
```

### 方法2
1. 在需要抓取的页面引入：
```html
  <script src="http://IP:6688/assets/remote-console.js" id="remoteConsole" data-channel="CHANNEL"></script>
```
2. 在PC端浏览器打开：http://IP:6688/channel/CHANNEL
3. CHANNEL可换成你想使用的任意值

## 说明
不同的CHANNEL之间的消息是隔离的，所以可以同时使用多个CHANNEL调试不同的页面