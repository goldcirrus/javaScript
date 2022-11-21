//demofile1.html file
<html>
<body>
<h1>My Header</h1>
<p>My paragraph.</p>
</body>
</html>




//index.js file
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {    //父方程createServer();的callback_def通过自己的parameter:res得到server要显示的数据
      //Open a file on the server and return its content to createServer's callback_def.
  fs.readFile('demofile1.html', function(err, data) {    //父方程readFile的数据通过自己callback_def的parameter：data传送给上一级的res
    res.writeHead(200, {'Content-Type': 'text/html'});  
    res.write(data);
    return res.end();          //res得到fs.readFile的err和data, 最后结果res.end()被return回.createServer();的callback_definition
  });
  
}).listen(8057);


//父方程createServer(callback_def); 被invoke. 
//父方程createServer(callback_def); 的callback_def=function(req,res){.....},其parameter:res获取实际数据，传送回父方程：createServer();
