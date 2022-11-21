//receiver message data from main.html
self.addEventListener('message', function(e) {
  var data = e.data;
  
  switch (data.cmd) {         //received data is an object
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);     //send message to main.html
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg +
                       '. (buttons will no longer work)');
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);   