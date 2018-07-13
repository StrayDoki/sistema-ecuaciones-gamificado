/**
 * GET login
 */
exports.getLogin = (req, res) => {
    res.render('cuenta/login', {
        title: 'Iniciar sesión'
    })
};

/**
 * GET registro
 */
exports.getRegistro = (req, res) => {
    res.render('cuenta/registro', {
        title: 'Registro'
    })
};

/**
 * POST registro
 */
exports.postRegistro = (req, res, next) => {
    req.assert('email', 'El correo no es válido').isEmail();
    req.assert('password', 'La contraseña debe tener 4 caracteres como mínimo').len(4);
    req.assert('confirmPassword', 'Las contraseñas no coinciden').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/registro');
    }
}