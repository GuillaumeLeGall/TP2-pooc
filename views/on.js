const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
//Création d'une variable qui va nous permettre d'accéder à un GPIO du raspberry  
//⚠️ Le nombre passé en paramètre correspond au numéro de GPIO et non au numéro de la pin.
const led = new Gpio(4, 'out');

console.log('Led On');
//On indique à la pin GPIO 4 que l'on veut envoyer du courant sur celle-ci
led.writeSync(1);
