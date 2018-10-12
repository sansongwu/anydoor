module.exports = {
    /* process.cwd() 是启动所在目录  使用他作为root的好处是 可以在不同的路径启动服务 从而定位请求资源的路径
     * 比如说 app.js在src里  但是资源文件都在和src同级的source目录下
     * 这样在src的上一级启动服务 req收到的url是/source 直接和root拼接就可以了 */
    root: process.cwd(),
    port: '3000',
    hostname: '127.0.0.1'

}