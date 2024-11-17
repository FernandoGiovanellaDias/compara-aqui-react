export default class Categoria {
    id = 0;
    title = "";
    icon = null;
    status = true;

    constructor(categoria = null) {
        if (categoria != null) {
            this.load(categoria);
        }
    }

    load(categoria_data) {
        Object.keys(this).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(categoria_data, key)) {
                this[key] = categoria_data[key];
            }
        });
    }
}
