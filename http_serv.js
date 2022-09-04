import http from 'http'
import fs from 'fs'
import path from 'path'
// const http = require('http')
// const fs = require('fs')
// const path = require('path')
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const server = http.createServer( (req, res) => {
    console.log(req.url)
    let filepath = path.join(__dirname, req.url === '/' ? 'chat_bot.html' : req.url)
    const ext = path.extname(filepath)
    let contentType = 'text/html'
    switch (ext){
        case '.js':
            contentType = 'text/javascript'
            break
        case '.cjs':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'
    }
    
    fs.readFile(filepath, (err, data) =>{
        if (err){
            throw err
        }
        res.writeHead(200, {
            'content-type': contentType
        })
        res.end(data)
    })
    
})

server.listen(3000, () => {
    console.log('Server started...')
})