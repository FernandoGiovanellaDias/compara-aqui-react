export default class Login {
    id = 0;
    email = "";
    senha = "";

    constructor(login = null) {
        if (login != null) {
            this.load(login);
        }
    }

    load(login_data) {
        Object.keys(this).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(login_data, key)) {
                this[key] = login_data[key];
            }
        });
    }
}
