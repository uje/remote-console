# remote-console
使用socket.io实现的远程控制台，可在pc端抓取手机页面的控制台输出

## 使用方法
1. 在需要抓取的页面引入：
```html
  <script src="http://IP:6688/assets/remote-console.js" id="remoteConsole" data-channel="CHANNEL"></script>
```
2. 在PC端浏览器打开：http://IP:6688/channel/CHANNEL
3. CHANNEL可换成你想使用的任意值

## 说明
不同的CHANNEL之间的消息是隔离的，所以可以同时使用多个CHANNEL调试不同的页面