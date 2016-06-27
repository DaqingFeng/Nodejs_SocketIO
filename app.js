//Controllers
var requireusermgmt=require("./Controllers/OnlineUserMgmt.js")
var instanceUserMgmt= requireusermgmt.UserMgmt.getUserInstance().UserMgmt;

//MainApp
var  mainapp=require("./Server/MainExpress.js")
 
//Server
var  OnlineUserServer=require("./Server/OnlineUserServer.js")

//socket Server
var  SocketServer=require("./Server/SocketServer.js")


//init UserServer 
OnlineUserServer.UserServer.init(mainapp.expressapp.app,instanceUserMgmt);

//Run Server
mainapp.expressapp.run(5678);

//Run socket server
SocketServer.ddgoodsSocket.run(mainapp.expressapp.app,5679,instanceUserMgmt);

