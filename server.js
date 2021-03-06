const express = require('express')
const app = express()
const port = 3000
//OS est un utilitaire node qui va nous servir à afficher le nom de notre raspberry
const os = require("os");
//MustacheExpress est notre moteur de template
const mustacheExpress = require('mustache-express');
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
//Création d'une variable qui va nous permettre d'accéder à un GPIO du raspberry  
//⚠️ Le nombre passé en paramètre correspond au numéro de GPIO et non au numéro de la pin.
const led = new Gpio(17, 'out');

//Configuration du moteur de template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Ici on dit au serveur de servir les fichiers statiques depuis le dossier /public
app.use(express.static('public'))


//On retrouve le même comportement que notre serveur précédent
app.get('/', (request, response) => {
  //Ici on indique que nous voulons transformer notre fichier index.mustache en HTML
  response.render('index');
})

app.get('/hello/:name', (request, response) => {
  //De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
  response.render('hello', {name: request.params.name});
})

app.get('/coucou', (request, response) => {
  //De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
  response.render('coucou');
})

app.get('/on', (request, response) => {
  led.writeSync(1);
  //De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
  response.render('on');
})

app.get('/off', (request, response) => {
  led.writeSync(0);
  //De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
  response.render('off');
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Erreur du serveur : ', err)
  }
  //On utilise l'utilitaire OS pour récupérer le nom de notre raspberry.
  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);
})

process.on('SIGINT', () => {
  led.unexport();
});
