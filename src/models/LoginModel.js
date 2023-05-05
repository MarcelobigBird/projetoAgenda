const Mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new Mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
   
});

const LoginModel = Mongoose.model('login', LoginSchema);


class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;

        try {
            this.user = await LoginModel.create(this.body);
        } catch (err) {
            console.log(err);
        }
    }

    valida() {
        this.cleanUp();

        // Validação
        // O e-mail precisa ser válido
        if (!validator.isEmail(this.body.email)) this.errors.push('Email invalid');
        // A senha precisa ter entre 3 e 50 caracteres
        if (this.body.password.length < 3 || this.body.password.length >= 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
        }
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;