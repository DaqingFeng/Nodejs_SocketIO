var ddgoodsSocket = (function () {
    var run = function (app, port, UserMgmt) {
        var express = require('express');
        var server = require('http').createServer();
        var io = require('socket.io')(server);
        var port = process.env.PORT || port;
        var winston = require('winston');

        var date = null;
        var logger = null;
        function setLoger(msg) {
            var IscancreateNew = false;
            var nowstr = new Date().getFullYear() + "_" + (new Date().getMonth()+1) + "_" + new Date().getDate();
            if (date == null) {
                IscancreateNew = true;
            }
            else if (date != nowstr) {
                IscancreateNew = true;
            }
            if (IscancreateNew) {
                logger = new (winston.Logger)({
                    transports: [
                        new (winston.transports.File)({ filename: './logs/' + nowstr + '.log' })
                    ]
                });
            }
            logger.info(msg + new Date().toDateString() + "  " + new Date().toLocaleTimeString());
        }

        // Routing
        app.use(express.static(__dirname + '/public'));
        var numUsers = 1;

        io.on('connection', function (socket) {
            var address = socket.handshake.address;
            //User login this server
            socket.on("user_join", function (user) {
                if (!user)
                    return;
                ++numUsers;
                setLoger("user_join:" + user);
                socket.currentuser = user;
                UserMgmt.AddUser(user);
                socket.broadcast.emit('user_joined',
                    {
                        Data: socket.currentuser,
                    });
            });

            //Force User logout system
            socket.on("user_logout", function (user) {
                setLoger("User Logout:" + JSON.stringify(user));
                if (typeof user === 'string') {
                    user = JSON.parse(user);
                }
                if (typeof user == 'object');
                {
                    socket.logoutUser = user;
                    socket.broadcast.emit("user_loggedout",
                        {
                            Data: socket.logoutUser
                        });
                }
            });

            //Double Check Server
            socket.on("req_server", function (user) {
                setLoger("Request server:" + JSON.stringify(user));
                socket.rsp = user;
                socket.broadcast.emit('rsp_server',
                    {
                        Data: socket.rsp,
                    });
            });

            //punish new requirement 
            socket.on("new_require", function (deliverInfo) {
                if (!deliverInfo)
                    return;
                if (typeof deliverInfo === 'string') {
                    deliverInfo = JSON.parse(deliverInfo);
                }
                if (typeof deliverInfo == 'object');
                {
                    setLoger("Sent new requirement:" + JSON.stringify(deliverInfo));
                    socket.deliverInfo = deliverInfo,
                        socket.broadcast.emit('require_punished',
                            {
                                Data: socket.deliverInfo,
                            });
                }
            });

            //vie this order 
            socket.on("new_quoted", function (quoted) {
                if (!quoted)
                    return;
                if (typeof quoted === 'string') {
                    quoted = JSON.parse(quoted);
                }
                if (typeof quoted == 'object');
                {
                    setLoger("Vie  Order:" + JSON.stringify(quoted));
                    socket.quoted = quoted,
                        socket.broadcast.emit('quoted_punished',
                            {
                                Data: socket.quoted,
                            });
                }
            });

            //vie success.
            socket.on("confirm_quoted", function (deliverInfo) {
                if (!deliverInfo)
                    return;
                if (typeof deliverInfo === 'string') {
                    deliverInfo = JSON.parse(deliverInfo);
                }
                if (typeof deliverInfo == 'object');
                {
                    setLoger("confirm_quoted:" + JSON.stringify(deliverInfo));
                    socket.deliverInfo = deliverInfo,
                        socket.broadcast.emit('quoted_confirmed',
                            {
                                Data: socket.deliverInfo,
                            });
                }
            });

            //User_leaved
            socket.on('disconnect', function () {
                var user = socket.currentuser;
                if (!user)
                    return;
                if (typeof user.DDUserId !== "undefined") {
                    --numUsers;
                    setLoger("User Left:" + JSON.stringify(user));
                    UserMgmt.RemoveUser(user);
                }
                socket.broadcast.emit('user_left', {
                    Data: socket.currentuser,
                });
            });
        });

        server.listen(port, function () {
            console.log('Socket Server listening at   port %d', port);
        });
    }
    return {
        run: run,
    }
})();
module.exports.ddgoodsSocket = ddgoodsSocket;

//----tutoriol----
//// sending to sender-client only
//***** socket.emit('message', "this is a test"); 

// sending to all clients, include sender
//***** io.emit('message', "this is a test");

// sending to all clients except sender
//***** socket.broadcast.emit('message', "this is a test");