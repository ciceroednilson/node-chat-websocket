module.exports.chat = function(app, req, res){

    var dados =  req.body;

    //VALIDA SE O CAMPO NICKNAME FOI PREENCHIDO
    req.assert('nickname', 'Favor informar um nickname!').notEmpty();

    //VALIDA SE O CAMPO NICKNAME TEM ENTRE 5 E 8 CARACTERES
    req.assert('nickname', 'O nickname deve ter entre 5 e 8 caracteres!').len(5,8);
    
    //EXECUTA AS VALIDAÇÕES COM EXPRESS VALIDATION
    var erros = req.validationErrors();

    //SE ENCONTROU ERROS DEVEMOS RETORNAR PARA A PÁGINA INICIAL
    if(erros){

        res.render("index",{validacao: erros});
        return;
    }

    //EMITI UMA MENSAGEM PARA TODOS OS USUÁRIOS DO CHAT INFORMANDO QUE UM NOVO PARTICIPANTE ACABOU DE ENTRAR
    app.get('io').emit("msgParaCliente",{nickname: dados.nickname, mensagem: "acabou de entrar no chat"});
    
    //CHAMA A VIEW DO CHAT E PASSA O NICKNAME COMO PARAMETRO PARA DAR AS BOAS VINDAS
    res.render("chat",{dados: dados});
    
}