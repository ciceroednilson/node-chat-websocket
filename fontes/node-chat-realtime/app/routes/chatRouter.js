module.exports = function(app){

    //CHAMANDO A VIEW DO CHAT ATRÁVES DO CONTROLLER
    app.post("/chat",function(req,res){

        app.app.controllers.chatController.chat(app,req,res);

    });
    

    //CHAMANDO A VIEW DO CHAT ATRÁVES DO CONTROLLER
    app.get("/chat",function(req,res){

        app.app.controllers.chatController.chat(app,req,res);

    });
}