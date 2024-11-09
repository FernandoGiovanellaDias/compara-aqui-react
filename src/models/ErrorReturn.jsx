
export default class ErrorReturn {
    error = true;
    message = "";
    erros = [];

    constructor(errorReturn = null) {
        if (errorReturn != null) {
            this.load(errorReturn);
        }
    }

    load(errorReturn_data) {
        Object.keys(this).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(errorReturn_data, key)) {
                this[key] = errorReturn_data[key];
            }
        });
    }
}
