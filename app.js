/**
 * Modulos
 */
const bodyParser = require('body-parser');
const chalk = require('chalk');
const dotenv = require('dotenv');
const express = require('express');
const expressValidator = require('express-validator');
const flash = require('express-flash');
const path = require('path');
const sass = require('node-sass-middleware');
const session = require('express-session');

/**
 * Cargar las variables de entorno
 */
dotenv.load({ path: '.env' });

/**
 * Creación del servidor express
 */
const app = express();

/**
 * Controladores
 */
const inicioController = require('./controllers/inicio');
const contactoController = require('./controllers/contacto');
const usuarioController = require('./controllers/usuario')

/**
 * Configuración del servidor express
 */
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || '3000')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')
}));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

/**
 * Rutas principales
 */
app.get('/', inicioController.index)
app.get('/contacto', contactoController.getContacto)
app.post('/contacto', contactoController.postContacto)
app.get('/login', usuarioController.getLogin)
app.get('/registro', usuarioController.getRegistro)
app.post('/registro', usuarioController.postRegistro);

/**
 * Empezar el servidor
 */
app.listen(app.get('port'), () => {
    console.log('%s App esta ejecutándose en http://localhost:%d en modo %s', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Presiona CTRL-C para detener la ejecución\n');
});