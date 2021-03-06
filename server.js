var http = require('http'),
    mime = require('mime'),
    fs = require('fs');

http.createServer(function (q, s){
  var filename = __dirname + (q.url === '/' ? '/index.html' : q.url),
      rs = fs.createReadStream(filename),
      ct = mime.lookup(filename.split('.').pop())
  rs.on('readable', function(){
    s.writeHead(200, {'Content-Type': (ct == 'text/html' ? 'text/html;charset=utf-8' : ct)})
    rs.pipe(s)
  })
  rs.on('error', function(e){
    s.writeHead(500, {'Content-Type': 'text/plain'})
    s.end(e.message)
  })
}).listen(process.env.PORT || 3000, function(){
  console.log('Server listens on: ' + this._connectionKey)
})
