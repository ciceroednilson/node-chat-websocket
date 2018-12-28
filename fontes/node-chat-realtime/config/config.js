var express          = require('express');

var consign          = require('consign');

var bodyParser       = require('body-parser');

var expressValidator = require('express-validator');

var app = express();


//DEFINE O ESQUEMA DE VIEW QUE VAMOS USAR
app.set('view engine', 'ejs');

//INFORMA ONDE VÃO ESTAR AS NOSSAS VIEWS
app.set('views','./app/views');

//INFORMA ONDE ESTÃO OS NOSSOS ARQUIVOS ESTÁTICOS(CSS, JS, HTML ENTRE OUTROS)
app.use(express.static('./app/public'));

//INFORMA QUE USAREMOS O bodyParser PARA TRANSFORMAR OS DADOS DO BODY.
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());


//EFETUA O AUTO LOAD DOS ITENS INCLUIDOS
consign().include("app/routes")
         .then("app/models")
         .then("app/controllers")
         .into(app);


module.exports = app;


