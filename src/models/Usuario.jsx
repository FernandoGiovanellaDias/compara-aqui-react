export default class Usuario {
    id = 0;
    email = "";
    nome = "";
    senha = "";

    constructor(usuario = null) {
        if (usuario != null) {
            this.load(usuario);
        }
    }

    load(usuario_data) {
        Object.keys(this).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(usuario_data, key)) {
                this[key] = usuario_data[key];
            }
        });
    }
}
