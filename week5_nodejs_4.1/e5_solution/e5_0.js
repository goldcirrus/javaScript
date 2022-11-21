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

/*
Trial E0: Let's practice callback functions with the code that gets the weather information from the server. 
If the weather is 'Sunny', then get a recommended sport. If the weather is 'Cloudy', then get a recommended restaurant. 
If the weather is 'Rainy', then get a recommebded music. You can use recommender.php?q=weather, recommender.php?q=sport, 
and recommender.php?q=music. E.g., $.get(..., function(data) { ... });
*/