var app = require("./config/config");

//PORTA ONDE VAI RODAR A NOSSA APLICAÇÃO E O NOSSO SOCKET
var port = 3000;


var appServer = app.listen(port, function(){

    console.log("Servidor iniciado na porta  " + port);
});


//USA A MESMA PORTA DE EXECUÇÃO DA NOSSA APLICAÇÃO
var io = require('socket.io').listen(appServer);

//GUARDA O NOSSO WEB SOCKER  COMO GLOBAL NO NOSSO OBJETO DO EXPRESS
app.set('io',io);

/*EVENTO DISPARADO QUANDO UM NOVO PARTICIPANTE ENTRA NO CHAT */
io.on('connection', function(socket){

    console.log("usuário conectado");
    

    //EVENTO DISPARADO QUANDO O USUÁRIO DEIXA O CHAT
    socket.on('disconnect', function(){

        console.log("usuário desconectou");
        
    });

    //DISPARADO QUANDO UM EVENTO É ENVIADO DO CLIENTE PARA O  SERVIDOR
    socket.on('msgParaServidor', function(data){


        //VERIFICA SE O USUÁRIO ESTÁ SAINDO DO CHAT
        if(data.sairdoChat != undefined && data.sairdoChat ==true){


            //ENVIA PARA O PROPRIO USUÁRIO QUE DISPAROU O EVENTO
            socket.emit("sairDoChat",  {sairdoChat: data.sairdoChat});

           ///ENVIA PARA TODOS OS USUÁRIOS CONECTADOS NO CHAT
           socket.broadcast.emit("msgParaCliente", {nickname: data.nickname, mensagem: "Saiu da Sala", sairdoChat: data.sairdoChat});
           

            return;
        }


       //ENVIA PARA O PRORRIO USUÁRIO A SUA MENSAGEM
       socket.emit("msgParaCliente", {nickname: data.nickname, mensagem: data.mensagem});

       
       //ENVIA PARA TODOS OS USUÁRIOS DO CHAT A MENSAGEM ENVIADA PELO CLIENTE QUE DISPAROU O EVENTO
       socket.broadcast.emit("msgParaCliente", {nickname: data.nickname, mensagem: data.mensagem});


        
        //CONTROLA A LISTA DE PARTICIPANTES PARA NÃO REPETIR O MESMO USUÁRIO
        if(parseInt(data.nickname_atualizados_nos_clientes)  ==0){


            //ATUALIZA A LISTA DE USUÁRIOS CONECTADOS DO PROPRIO USUÁRIO QUE DISPAROU O EVENTO
            socket.emit("participantesParaCliente", {nickname: data.nickname});


            //ATUALIZA A LISTA DOS PARTICIPANTES DOS USUÁRIOS DO CHAT
            socket.broadcast.emit("participantesParaCliente", {nickname: data.nickname});

        }

  

    });


});