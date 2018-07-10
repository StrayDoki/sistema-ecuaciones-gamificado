/**
 * GET
 * pagina HOME
 */
exports.index = (req, res) => {
    res.render('portada', {
        title: 'Portada'
    });
};