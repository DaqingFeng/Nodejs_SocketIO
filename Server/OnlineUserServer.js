var OnlineUserServer=(function()
{
  var init=function(app,UserMgmt) 
  {
    app.get('/GetAllUsers', function(req, res){
         console.log('GET / Method:GetAllUsers');
        var response= JSON.stringify(UserMgmt.GetOnlineUserlst()); 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(response);
    });
    
     app.get('/GetCurrentUser', function(req, res){
         console.log('GET / Method:GetAllUsers');
        var response= JSON.stringify(UserMgmt.GetCurrentUser()); 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(response);
    });

    app.post('/UpdateUser', function(req, res){
        console.log('POST / Method:UpdateUser');
        user=req.body;
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(!user)
        return res.end('false');
        if(!user.UserID)
        return res.end('false');
    var result= UserMgmt.UpdateUser(user);
        res.end(result.toString());
    });

    app.post('/AddUser', function(req, res){
        console.log('POST / Method:AddUser');
        user=req.body;
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(!user)
        return res.end('false');
        if(!user.UserID)
        return res.end('false');
    var result= UserMgmt.AddUser(user);
        res.end(result.toString());
    });

    app.post('/DeleteUser', function(req, res){
        console.log('Post / Method:DeleteUser');
        user=req.body;
        res.writeHead(200, {'Content-Type': 'text/html'});
    if(!user)
        return res.end('false');
        if(!user.UserID)
        return res.end('false');
    var result= UserMgmt.RemoveUser(user);
        res.end(result.toString());
    });
  }
return{
    init:init
}
})();

module.exports.UserServer = OnlineUserServer;