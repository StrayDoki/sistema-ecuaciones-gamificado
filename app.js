/**
 * Modulos
 */
const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const path = require('path');

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
const portadaController = require('./controllers/portada');
const usuarioController = require('./controllers/usuario');
const apiController = require('./controllers/api');
const contactoController = require('./controllers/contacto');

/**
 * Configuración del servidor express
 */
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || '8080')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Rutas principales
 */
app.get('/', portadaController.index)

/**
 * Empezar el servidor
 */
app.listen(app.get('port'), () => {
    console.log('%s App esta ejecutándose en http://localhost:%d en modo %s', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Presiona CTRL-C para detener la ejecución\n');
});