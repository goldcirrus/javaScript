<script>
/*
    function recommender(callback){
        $.get('recommender.php?q=weather', function(data){
              callback(data);
        });
   }

    
    recommender(function(data) {
        alert(data);  // It needs to display the weather and the recommendation
    });
*/
</script>

<script>
    function recommender(callback) {
        $.get('recommender.php?q=weather', function(data) {
            if (data == 'Sunny')
                $.get('recommender.php?q=sport', function(data2) {
                    callback(data + ": " + data2);
                });
            else if (data == 'Cloudy')
                $.get('recommender.php?q=restaurant', function(data2) {
                    callback(data + ": " + data2);
                });
            else if (data == 'Rainy')
                $.get('recommender.php?q=music', function(data2) {
                    callback(data + ": " + data2);
                });
            else
                callback('No recommendation');
        });
    }
    
    recommender(function(data) {
        alert(data);  // It needs to display the weather and the recommendation
    });
</script>
