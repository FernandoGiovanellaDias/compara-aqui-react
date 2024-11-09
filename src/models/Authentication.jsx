export default class Authentication {
    tokenAcess = "";
    tokenAccount = "";
    urType = "";

    constructor(authentication = null) {
        if (authentication != null) {
            this.load(authentication);
        }
    }


    load(authentication_data) {
        Object.keys(this).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(authentication_data, key)) {
                this[key] = authentication_data[key];
            }
        });
    }
}
