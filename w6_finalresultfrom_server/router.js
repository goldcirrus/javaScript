//assignment6

var url = require('url');
var path = require('path');
var querystring = require('querystring');

                                                          
const proceed = function(request,response, pathname){               //parameter:pathname is client's request's pathname
    let fileordirname = path.basename(pathname);                   //last part of client's request pathname
    let words = fileordirname.split(".");
    let extension;
    if (words.length > 1) {                         //.extension exists
          extension = words[words.length - 1];     //without "." extension is the last element in words(last part of client's request), such as html, sjs, js, etc
    } 
	else {                     //If there is no file extension, we assume basename is a directory, and '/index.html' is attached. See 4.2.4
          pathname = pathname + '/index.html';     //add default index.html to client's request's pathname
          extension = 'html';     
    }
	
	let contentType='';
	
	if(extension=='html' || extension=='htm')   //if client request a .html or .htm file, 
	{
		contentType = 'text/html';
		echoHtml(response,pathname,contentType);    //echo back to client the file content as text/html type
               // console.log('pathname in proceed function html type:',pathname);	
}
	else if(extension=='sjs')               //else if client request to a .sjs file, the client wants to do the calculation, 
	{                                      //we need to get query's details from client's request's POST or GET methods
		let _GET = {};
		let _POST = {};
		
		if(request.method.toLowerCase()=='get')
		{
			_GET = querystring.parse(decodeURI(url.parse(request.url).query));   //get client's query details
			console.log('inside proceed function _GET is: querystring.parse(url.par...query) ',_GET);
                        console.log('inside proceed function, url.parse(request.url).query for get method query is: ',url.parse(request.url).query);
                        echoSjs(_GET,_POST,pathname,response);    //do calculation and echo back to client the calculated results
		        console.log('pathname in proceed function sjs type after calling echoSjs() for get: '+pathname);
                }
		else if(request.method.toLowerCase()=='post')
		{
			var query='';
	       		request.on('data',function(chunk){
        				query+=chunk;
                                        console.log('inside proceed function, inside reques.on(data callback); post query is: ',query);
			});

                        console.log('inside proceed function, after request.on(data,callback); post query is:',query);

			request.on('end',function(){
				if(query!='')
					_POST=querystring.parse(query);
                                console.log('inside proceed function, inside request.on(end,callback); post query is: ',query);
                                console.log('inside proceed function, _POST is querystring.parse(query):',_POST);
				echoSjs(_GET,_POST,pathname,response);
                                console.log('pathname in proceed function,for sjs type after calling echoSjs() for post pathname: ',pathname);
			});
                        console.log("inside proceed function, after reques.on(end,callback); post query is:",query);
		}
	}
} 

function echoSjs(_GET,_POST,pathname,response){
	try{
               // console.log('require pathname inside echoSjs function definition  pathname: ',pathname);
		var sjs = require(pathname);
		sjs.sjsproceed(_GET,_POST,function(returned_result_from_sjsproceed){
			response.write(String(returned_result_from_sjsproceed));              //only send back calculated result back to client
			response.end();
			delete require.cache[require.resolve(pathname)];            //unload sjs module
		});
	}
	catch(err){
		response.writeHead(200,{"Content-Type":"text/html"});
        response.write("can not open module: calculator.sjs "+err);
        response.end();
		delete require.cache[require.resolve(pathname)];            //unload sjs module
	}
}

function echoHtml(response,pathname,contentType){
	var fs = require('fs');
	//console.log("pathname inside echoHtml() definition: ",pathname);
	
	fs.readFile(pathname, 'utf8', function(err, content) {
        if (!err) {                     //if err is 'none', display content  (none is false)
            console.log('reading file content inside echoHtml function definition');
            response.writeHead(200,{"Content-Type":contentType});
            response.write(content);       //send file content to response object
            response.end();
        }
        else {                           //else if err is not 'none', display err.
            console.log('page not found. ', err);
            response.writeHead(200,{"Content-Type":contentType});
            response.write("404 page not found. "+err);
            response.end();
        }
    });  //end of invoking: fs.readFile(pathname,'utf8',callback_definition);   //callback_definition gets data from file
}



function route(request, response) {
    var pathname = decodeURI(url.parse(request.url).pathname);
    console.log("1st pathname in route() function definition url.parse(request.url).pathname: ",pathname);
    var tilde = require('tilde-expansion');
    
	var words = pathname.split('/'); // word[0] is '' and word[1] is '~...' because pathname starts with '/'.
    if (words[1] != undefined && words[1][0] == '~') {  // e.g., /~lzhong/...
        tilde(words[1], function(expanded) {  // Note that a callback function is used.
            var new_pathname = '/' + expanded + '/public_html';  // 'public_html' should be included.
            for (var i = 2; i < words.length; i++)
                new_pathname += '/' + words[i];
            proceed(request, response, new_pathname);
        });
    }
    else {
        var new_pathname = "/var/www/html" + pathname;
        proceed(request, response, new_pathname);
    }
}

exports.route = route;
