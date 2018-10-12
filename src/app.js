const http = require('http')
const conf = require('./config/defaultConfig.js')
const path = require('path')
const fs = require('fs')

const hostname = conf.hostname
const port = conf.port

const server = http.createServer((req, res) => {
    const url = req.url

    /* 把启动的根路径 和 用户传过来的路径 进行拼接 */
    const filePath = path.join(conf.root, req.url)

    /* 读取用户需要的路径  */
    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain')
            res.end(`${filePath} is not found`)
            return
        }
        /* 如果是文件 */
        if (stats.isFile()) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')

            /* 以流的方式 返回 */
            fs.createReadStream(filePath).pipe(res)

            /* 还可以通过读文件内容方式返回  但是这种方式一次返回很全部 不如流好 */
            // fs.readFile(filePath, (err, data) => {
            //     res.end(data)
            // })

            /* 用流输出 不用end？ */
            //res.end()
        /* 如果是文件夹 展示列表*/
        } else if (stats.isDirectory()) {
            /* files 是一个数组 */
            fs.readdir(filePath, (err, files) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/plain')
                res.end(files.join(','))
            })
        }
    })

})

server.listen(port, hostname, () => {
    console.log(`启动成功 在 ${hostname}:${port}`)
})

