//--library---------------------------
//alert("starting javascript!");

//create an ZZQQ$ object
function ZZQQ$(elementName) {
	//-------if ZZQQ$(document) is document, the lzhong$ object return ready() property function
    if(elementName==document)
		return  {   //------if argument is document, return an object contains its property  function :ready()
			        ready: function(callback){
					         if (document.readyState == 'complete') {
                                 //alert("elementName ready 1 is: "+elementName);
								 elementName.__lzjQ__callback = callback;       // callback();   Should not be called directly. If so, the value of this in callback becomes different.
                                 elementName.__lzjQ__callback();
                             } else {   //wait
                                 window.addEventListener('load', function() {  // onload event on window; thispreserved should be used in the callback function.
                                                          //alert("elementName ready 2 is: "+elementName);    //elementName is the argument HTMLElement
														  elementName.__lzjQ__callback = callback;
                                                          elementName.__lzjQ__callback();
                                                     });
					         }
					}, //end of ready() 	

                     //----creae another property function on()
					 on:function(event,callback){
						     document.addEventListener(event,function(e) { 
						            this.__lzjQ__callback = callback;                  //callback is invoked within addEventListener
                                    this.__lzjQ__callback(e);
                                 });
					 }
					
				} //end of return
				
	//-------if ZZQQ$(string)	
	else if (typeof elementName == 'string') {
	   let selector = elementName.trim();                                                //passed in arugument is the name of HTMLElement objects on webpage, can be 'p'(html type), '#id' or '.class'
	   let elementArray = [];
                                                                                     	   //create this.__TRUjQ_elements array to hold passed in HTMLElement objects from web page. 
       if (!selector.startsWith('.') && !selector.startsWith('#')) {                         // A specific HTML element type selector, e.g., 'p'; slector should not start with '.' nor '#'
                elementArray = document.getElementsByTagName(selector);                   // many elements with same TagName, each one need an eventListener added: Get the result: this.__TRUjQ_elements refers to an array holding HTMLElement objects by the same tag name returned from document.getElementByTagName()
       }                                                                                       // document.getElementsByTagName(selector); returns an array
       else if (selector.startsWith('.')) {                                                                        // Class selector; selector start with '.', result: this.__TRUjQ_elements refers to an array to hold all HTMLElement objects with the same .class name
                elementArray = document.getElementsByClassName(selector.substring(1, selector.length));        //many elements with same class name, each one need an eventListener added
       }                                                                                                           // document.getElementsClassName(selector.substring(1,selector.length)); returns an array
       else {                                                                  // if(Id'#') selector; selector start with '#', only one HTMLElement object returned from document.getElementById()
                if (document.getElementById(selector.substring(1, selector.length)) != null)
                        elementArray[0] = document.getElementById(selector.substring(1, selector.length));      //only one element with the id need one eventListener added. 
       }
    
	     
       return {
		   //--------------create a property function .click() has a callback function for what to do(not the addEventListener, but inside the addEventListener) when invoked.
		   click:function(callback) {
                       for (var i = 0; i < elementArray.length; i++) {        //addEventListener to each HTMLElement object hold by array __TRUjQ_elements[i]
                           elementArray[i].addEventListener("click", function() { 
						           //alert('i is '+i);
                                   //alert("elementArray[i-1] is "+elementArray[i-1]+'. this is '+this+'. this is elementArray[0]');					   
                                 this.__lzjQ__callback = callback;                  //callback is invoked within addEventListener
                                 this.__lzjQ__callback();
                           });
                       }
               },   //end of click()
			   
			//------create another property function .dblclick()
			dblclick:function(callback) {
                       for (var i = 0; i < elementArray.length; i++) {        //addEventListener to each HTMLElement object hold by array __TRUjQ_elements[i]
                           elementArray[i].addEventListener("dblclick", function() { 
						         this.__lzjQ__callback = callback;                  //callback is invoked within addEventListener
                                 this.__lzjQ__callback();
                           });
                       }
               },   //end of dblclick()
			   
			 //-----create another property function .css()
			css:function(property, value) {
				       for (var i = 0; i < elementArray.length; i++) {
						   if (value == undefined) // This will return an empty string when the property is not specifically defined.
                                return window.getComputedStyle(elementArray[i])[property];  // IE uses element.currentStyle instead
                           else 
                                elementArray[i].style.setProperty(property, value);  // Set property
					   }
            },    //end of css()
			
			//------create another property function .hide()
			hide:function() {
				       for (var i = 0; i < elementArray.length; i++){
						   if (window.getComputedStyle(elementArray[i]).display == 'none' || window.getComputedStyle(elementArray[i]).display == 'NONE')
                                     return;            
                           else {                     //The style property returns a CSSStyleDeclaration object, which represents an element's style attribute.
                                     elementArray[i].style.display = 'none';       //DOM element has style property
                           } 
					   }
                                          
            },  //end of hide()
			
			//------create another property function .show()
			show:function(){
				for(var i=0;i<elementArray.length;i++){
					if(window.getComputedStyle(elementArray[i]).getPropertyValue("display").toLowerCase() == "none")
						     elementArray[i].style.display = 'block';
					else
						     return;
			    }  
			},      //end of show()
			
			//------create another property function .toggle()
			toggle:function(){
				for(var i=0;i<elementArray.length;i++){
					if(window.getComputedStyle(elementArray[i]).getPropertyValue("display").toLowerCase() == "none")
						     elementArray[i].style.display = 'block';
					else
						     elementArray[i].style.display = 'none';
			    }  
			},      //end of toggle()
			
			//------create another property function .on()
			on:function(event,callback){
				for (var i = 0; i < elementArray.length; i++){
					elementArray[i].addEventListener(event,function() { 
						         this.__lzjQ__callback = callback;                  //callback is invoked within addEventListener
                                 this.__lzjQ__callback();
                           });
				}
			}//end of on()
          
		   
			   
	   } //end of return
    } //end of else if ZZQQ$(string)
	
	//-------else if ZZQQ$(HTMLElement)
	else if (elementName instanceof HTMLElement)   //only one instance of HTMLElement
	   return {     //create a property function .on()
	             css:function(property, value) {
						   if (value == undefined) // This will return an empty string when the property is not specifically defined.
                                return window.getComputedStyle(elementName)[property];  // IE uses element.currentStyle instead
                           else 
                                elementName.style.setProperty(property, value);  // Set property
                 },  //end of css()
			
	   }  //end of return

}   //end of ZZQQ$()


//add a version property to object 
ZZQQ$.version = 'lz.version.2002.01';


//--applcication is in another asgn2.html file who import this lzlibrary.js file----------

