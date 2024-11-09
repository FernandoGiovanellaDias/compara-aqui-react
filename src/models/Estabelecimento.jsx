export default class Estabelecimento {
    id = 0;
    name = "";
    status = true;

    constructor(estebelecimento = null) {
        if (estebelecimento != null) {
            this.load(estebelecimento);
        }
    }

    load(estabelecimento_data) {
        Object.keys(this).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(estabelecimento_data, key)) {
                this[key] = estabelecimento_data[key];
            }
        });
    }
}
