## 开发坏境启动

1. `npm install`
2. `npm start`
3. 浏览器打开[http://localhost:8080](http://localhost:8080)

备注：如果要在局域网访问，请修改`package.json`-`start`命令，增加`--public 192.168.x.x`，后面为你的局域网`ip`。

## 生产坏境部署

1. `npm run build`
2. 拷贝dist文件夹至服务器即可
