/*function sjsproceed() to pass function definition to router's caller 
1. will get user's query detail from _GET, _POST arguments
2. can do calculations from data inside _GET, _POST arguments
3. return calculation result as a string via callback function's argument 
<--> The invoking of: sjsproceed(_realGET,_realPOST, function(returnedValue_from_sjsproceedINVOCATION){..doing actions with returnedValue_from_sjsproceedINVOCATION }); 
<--> can do actions inside callback function's definition using 'returnedValue_from_sjsproceedINVOCATION' parameter like a returned value.
<--> invoker of sjsproceed() can do whatever he likes with returned result value via callback function's definition and callback's parameter

<!!> invoker of sjsproceed();'s callback function's parameter == sjsproceed() returned result data value  
*/


const sjsproceed = function(_GET, _POST, callback){
	 
	 if (_GET != undefined && _GET['op'] == 'addition') 
	 {
        var result = Number(_GET['x']) + Number(_GET['y']);       //result is the sum of 'x' and 'y'
        var resultStr = result.toString();                         //server's response.write() only takes string
        callback(resultStr);                  //return value(string type) via callback's argument back to its invoker(client). 
    }                                         //Used to send result back to invoker(client): doing something with (result) by invoker(client).
     if (_GET != undefined && _GET['op'] == 'subtraction') 
	 {
        var result = (Number(_GET['x']) - Number(_GET['y'])).toString();          
        callback(result);    //callback used to send result back to invoker: doing something with (result)==callback's argument.
    }
     if (_GET != undefined && _GET['op'] == 'multiplication') 
	 {
        var result =''+( Number(_GET['x']) * Number(_GET['y']));          //result is the sum of 'x' and 'y'
        callback(result);                                                  //callback used to send message back: doing something with (result).
    }
	 if(_GET != undefined && _GET['op'] == 'division') 
	 {
		 var result =''+( Number(_GET['x']) / Number(_GET['y']));          //result is the sum of 'x' and 'y'
         callback(result);
	 }

	 
	 
	 if (_POST != undefined && _POST['op'] == 'addition') 
	 {
        var result = Number(_POST['x']) + Number(_POST['y']);     //result is the sum of 'x' and 'y'
        callback(result.toString());                         //callback used to send message back: doing something with (result). 
    }
	if (_POST != undefined && _POST['op'] == 'subtraction') 
	 {
        var result = Number(_POST['x']) - Number(_POST['y']);     //result is the sum of 'x' and 'y'
        callback(result.toString());                         //callback used to send message back: doing something with (result). 
    }
	if (_POST != undefined && _POST['op'] == 'multiplication') 
	 {
        var result = Number(_POST['x']) * Number(_POST['y']);     //result is the sum of 'x' and 'y'
        callback(result.toString());                         //callback used to send message back: doing something with (result). 
    }
	if (_POST != undefined && _POST['op'] == 'division') 
	 {
        var result = Number(_POST['x']) / Number(_POST['y']);     //result is the sum of 'x' and 'y'
        callback(result.toString());                         //callback used to send message back: doing something with (result). 
    }

}

exports.sjsproceed = sjsproceed;
