// TruJS - A simple AngularJS-like library
function $trujs_init(){
       for(var spans=document.getElementsByTagName("span"), i = 0; i < spans.length; i++)
           {
		      var init=spans[i].getAttribute("trujs-init");
			  void 0!=init&&(eval(init),eval(spans[i].innerHTML),spans[i].innerHTML="")
		   }
		   
		   for(var inputs=document.getElementsByTagName("input"),i=0;i<inputs.length;i++)
		   {
		      var trujsvar=inputs[i].getAttribute("trujs-model").trim();
		      void 0!=trujsvar&&""!=trujsvar&&(void 0==$trujs[trujsvar]?$trujs[trujsvar]=inputs[i].value:inputs[i].value=$trujs[trujsvar])
		   }
		   
		   $trujs._trujsvar_trujsexpression={};
			  
		   for(var spans=document.getElementsByTagName("span"),i=0;i<spans.length;i++)
		   {
				  var bind=spans[i].getAttribute("trujs-bind");
				  if(void 0!=bind&&""!=bind)
					  for(var models=bind.trim().split(","),j=0;j<models.length;j++)
						  models[j]=models[j].trim(),void 0==$trujs._trujsvar_trujsexpression[models[j]]?($trujs._trujsvar_trujsexpression[models[j]]=[],$trujs._trujsvar_trujsexpression[models[j]].push({span:spans[i],expression:spans[i].innerHTML})):$trujs._trujsvar_trujsexpression[models[j]].push({span:spans[i],expression:spans[i].innerHTML})}
			  
			  for(var spans=document.getElementsByTagName("span"),i=0;i<spans.length;i++)
			  {var bind=spans[i].getAttribute("trujs-bind");void 0!=bind&&""!=spans[i].innerHTML.trim()&&(spans[i].innerHTML=eval(spans[i].innerHTML))}
			  
			  for(var inputs=document.getElementsByTagName("input"),i=0;i<inputs.length;i++)
			           {
			               var model=inputs[i].getAttribute("trujs-model");
			               void 0!=model&&""!=model&&inputs[i].addEventListener("keyup",function(e)
				          {    var model=e.target.getAttribute("trujs-model");
				               $trujs[model]=e.target.value;
				               var exprs=$trujs._trujsvar_trujsexpression[model];
				               if(void 0!=exprs)
				               for(var i=0;i<exprs.length;i++)""!=exprs[i].expression.trim()&&(exprs[i].span.innerHTML=eval(exprs[i].expression))
					      })}
			  
	}

window.addEventListener("load",$trujs_init);
var $trujs=new function(){};