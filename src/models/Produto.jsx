export default class Produto {
    id = 0;
    name = "";
    description = "";
    price = null;
    id_categoria = null;
    id_mercado = null;
    status = true;

    constructor(produto = null) {
        if (produto != null) {
            this.load(produto);
        }
    }

    load(produto_data) {
        Object.keys(this).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(produto_data, key)) {
                this[key] = produto_data[key];
            }
        });
    }
}
