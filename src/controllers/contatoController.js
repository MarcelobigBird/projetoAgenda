const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }
    
        req.flash('success', 'Successfully registered contact');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;

    } catch (err) {
        console.log(err);
        return res.render('404');
    }

};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('404');

    return res.render('contato', { contato });

};

