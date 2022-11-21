
<script>

    var jQ = function() {
		let v = '0.0.0';
		
        return {
			 version: function(new_name) {
				 if(new_name==undefined)				 
			        return v;
				 else
					version=new_name;
			 }
			         
        }
		
    }();
    
    alert('version: ' + jQ.version)
    alert(jQ.version('1.1.2') );
	
    alert('version: ' + jQ.version );
<script>