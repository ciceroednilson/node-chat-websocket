module.exports = function(app){

    //CRIANDO A ROTA DO INDEX
    app.get("/",function(req,res){

        //CHAMANDO O CONTROLLER E REDIRECIONANDO PARA A VIEW INDEX
        app.app.controllers.indexController.index(app,req,res);

    });
}