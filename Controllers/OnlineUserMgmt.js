var userMgmt=(function()
{
  var sysModule=require("../Module/SystemModule");
  var userInstance;
  var init=function()
     { 
        //UserMgmt
        function UserMgmt() 
        { 
            this.UserInfo=sysModule.SystemModule.UserInfo;
            this.OnlineUserlst=new Array();
        }

        UserMgmt.AddUser=function(user) {
             return AddUser(user);
        }
        
        UserMgmt.RemoveUser=function(user) 
        {
            return RemoveUser(user);
        }
        
        UserMgmt.UpdateUser=function(user) {
            var result=false;
            if(RemoveUser(user))
            { 
            result= AddUser(user);
            }
            if(result)
                instanceMgmt.UserInfo=user; 
             return result;
        }
     
        UserMgmt.ExistUser=function(user) 
        {
            var result=false;
            var uindex= ExistUser(user);
            if(uindex==-1)
                result=true;
            return result;
        }
        
        UserMgmt.GetOnlineUserlst=function () {
            return GetOnlineUserlst();
        }
       
        UserMgmt.GetCurrentUser=function () {
            return GetCurrentUser();
        }
       
        //Privite Method 
    var instanceMgmt=new UserMgmt();
    var GetOnlineUserlst=function()
        {
            return instanceMgmt.OnlineUserlst;
        }
        
        var GetCurrentUser=function()
        {
            return instanceMgmt.UserInfo;
        }
   
    var AddUser=function (user) {
        var result=false;
        if(ExistUser(user)==-1)
        {
            instanceMgmt.OnlineUserlst.push(user);
            instanceMgmt.UserInfo=user; 
            result=true;
        }
        return result;
        }
     
    var RemoveUser=function(user) 
     {
         var result=false;
         var uindex=ExistUser(user);
         if(uindex!=-1)
         {
            instanceMgmt.OnlineUserlst.splice(uindex,1); 
            result=true;
         }
        return result;
     }
     
    var ExistUser=function(user)
     {
       var findindex=-1;
       if(!user || instanceMgmt.OnlineUserlst.length==0)
         return findindex;
       for(var uindex=0;uindex<instanceMgmt.OnlineUserlst.length;uindex++)
       {
          if(instanceMgmt.OnlineUserlst[uindex].DDUserId==user.DDUserId)
          {
              findindex=uindex;
              break;
          }
       }
       return findindex;
     }
     
     return{
         UserMgmt:UserMgmt
     }
   }
   
   return {
     getUserInstance: function () {
      if ( !userInstance ) {
         userInstance = init();
      }
      return userInstance;
     }
   }; 
})();
module.exports.UserMgmt = userMgmt;
  

 