const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const musics = require('./data/music.json');
const expressMongoDb = require('express-mongo-db');


const app = express();
app.set('view engine', 'ejs');
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded());
app.use(expressMongoDb('mongodb://localhost/tomorrowland'));

app.get('', (req, res) => {
    res.render('index');
});

app.post('', (req, res) => {
    req.db.collection('mensagens').insert(req.body, (erro) =>{
        console.log('erro')
        res.render('ingresso');
    });
});


app.get('/admin/reservas', (req, res) => {
    req.db.collection('mensagens').find().toArray((erro, dados ) => {
            res.render('admin-reservas', {'mensagens' : dados});
        });
    });






app.get('/music', (req, res) => {
    res.render('music', {"musics":musics});
});

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

app.listen(3000, () => {
    console.log('Servidor inicializado')
});
