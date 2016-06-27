
var DataService = (function () {
    var http = require('http');
    var login = function () {
        var postdata = JSON.stringify({
            ADAPTER: '12',
            SIGNATURE: '',
            MOBILE: '15852842125',
            PASSWD: '123456'
        });

        var options = {
            host: "192.168.8.34",
            port: 8800,
            path: '/Adapter?ADAPTER=QXT2004',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': postdata.length
            }
        };

        var reqPost = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log(chunk);
            });
        });
        reqPost.write(postdata);
        reqPost.end();
        reqPost.on('error', function (e) {
            console.error(e);
        });
    }
    return {
        login: login
    }
})();

module.exports.DataService = DataService;

//var dataservice=require("./Server/DataService.js")
//dataservice.DataService.login();