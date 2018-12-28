module.exports.index = function(app, req, res){
 
    
    //CARREGANDO A VIEW INDEX QUE FICA NO DIRETÓRIO index, TAMBÉM ESTÃO PASSANDO UM PARAMETRO VAZIO,
    //ESSE MESMO PARAMETRO É USADOS DURANTE A VALIDAÇÃO QUANDO TENTAMOS ENTRAR NO CHAT
    res.render("index", {validacao:{}});
    
}