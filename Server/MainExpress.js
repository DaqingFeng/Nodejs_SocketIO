
var expressapp=(function() {  

var bodyParser  = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

app.all('*', function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
});

var run=function (port) 
{
   app.listen(port);
   console.log('Start Listening at http://127.0.0.1:' + port)
}

return{
    app:app,
    run:run,
}
})();
module.exports.expressapp=expressapp;
