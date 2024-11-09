export default class FiltroBusca {
    filtro = "";

    constructor(filtro = null) {
        if (filtro != null) {
            this.load(filtro);
        }
    }

    load(filtro_data) {
        Object.keys(this).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(filtro_data, key)) {
                this[key] = filtro_data[key];
            }
        });
    }
}
