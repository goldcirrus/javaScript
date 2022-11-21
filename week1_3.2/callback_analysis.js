
//callback 定义
function say(word) {    //实际使用的callback方程定义，通过自己的parameter得到来自父方程的数据（parameter:word)，并在callback的定义中处理来自父方程的数据
  console.log(word);
}

//父方程定义
function execute(CALLBACK, value) {
  CALLBACK(value);  //父方程将自己的数据(value)传送给CALLBACK, 通过invoke CALLBACK时将父的数据传送给CALLBACK的argument：value
}


//in app: 父方程被invoked， callback的位置被实际的callback方程定义代替，实际的callback方程会通过自己的定义自动处理来自父方程的数据。 
execute(say, "Hello");        //say是实际的callback方程名，是callback方程的定义