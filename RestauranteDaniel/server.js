'use strict';
var app = require('express')();
var http = require('http');
var port = process.env.PORT || 1337;
var io = require('socket.io')(server);

// Creación Servidor
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Restaurante Chino\n');
}).listen(port);

app.get('/', function (req, res) {
    res.sendfile(dir + '/index.html');
});

// Conexión a la base de datos
const sql = require('mssql')
async () => {
    try {
        await sql.connect('Server=localhost,1433;Database=Restaurante_DanielGonzalez;User Id=username;Password=password;Encrypt=true')
    } catch (err) { }
}

// Conexión Frontend a Backend
app.post('/gencons', function (req, res) {
    var MenCon = req.body;
    if (MenCon == "1") {
        sql.query("SELECT * FROM Menu ORDER BY p_id", function (err, rows) {
            var ResConsGen = JSON.parse(JSON.stringify(rows))
            io.emit('GenConsQ', {
                GenConsR: ResConsGen,
            });
            io.on('connection', function (socket) {
                socket.emit('GenConsQ', {
                    GenConsR: ResConsGen
                });
            });
            if (err) throw err;
        }
    } else {
        break
    }
});

app.post('/espcons', function (req, res) {
    var EsPlate = req.boty;
    var IDPs = EsPlate.ID_P1.toString();
    sql.query("SELECT * FROM Menu WHERE p_id = ('" + IDPs + "')", function (err, rows) {
        var ResConsEsp = JSON.parse(JSON.stringify(rows))
        io.emit('EspConsQ', {
            GenConsR: ResConsEsp,
        });
        io.on('connection', function (socket) {
            socket.emit('EspConsQ', {
                GenConsR: ResConsEsp
            });
        });
        if (err) throw err;
    }
});

app.post('/edicons', function (req, res) {
    var EdPlate = req.boty;
    var IDPe = EdPlate.ID_P2.toString();
    var It1e = EdPlate.It1.toString();
    var It2e = EdPlate.It2.toString();
    var It3e = EdPlate.It3.toString();
    sql.query("UPDATE Menu SET item1 = ('" + It1e + "') , item2 = ('" + It2e + "') , item 3 = ('" + It3e + "') WHERE p_id = ('" + IDPe + "')", function (err, rows) {
        var ResConsEdi = JSON.parse(JSON.stringify(rows))
        io.emit('EdiConsQ', {
            GenConsR: ResConsEdi,
        });
        io.on('connection', function (socket) {
            socket.emit('EdiConsQ', {
                GenConsR: ResConsEdi
            });
        });
        if (err) throw err;
});

app.post('/delcons', function (req, res) {
    var ElPlate = req.boty;
    var IDPd = ElPlate.ID_P3.toString();
    sql.query("DELETE FROM Menu WHERE p_id = ('" + IDPd + "')", function (err, rows) {
        var ResConsDel = JSON.parse('Eliminado Correctamente')
        io.emit('DelConsQ', {
            GenConsR: ResConsDel,
        });
        io.on('connection', function (socket) {
            socket.emit('DelConsQ', {
                GenConsR: ResConsDel
            });
        });
        if (err) throw err;
    }
});
