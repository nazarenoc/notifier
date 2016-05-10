var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(4555);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port  = process.env.PORT || 8080;
var router = express.Router();

/* Socket */
var emitir = function(req, res, next){
    var notificar = req.query.notificacao || '';
    if (notificar != '') {
        io.emit('notificacao', notificar);
        next();
    } else {
        next();
    }
}

app.use(emitir);
app.use('/api', router);
router.route('/notificar')
    .get(function(req, res){
        //aqui vamos receber a mensagem
        res.json({message: "Mensagem enviada"})
    })
    
app.listen(port);
console.log('Conectado a porta ' + port);