// Route operations

app.post('/messages', function(req, res) {
    var receiver = req.body.receiver;
    var sender = req.body.sender;
    var message = req.body.message;
    var msg = {op:"SaveMessage", sender:sender, receiver:receiver, message:message};
    res.send(JSON.stringify(msg));
});