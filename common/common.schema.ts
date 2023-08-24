import Ajv from 'ajv';
export abstract class CommonSchema {
    public ajv: Ajv

    constructor() {
        this.ajv = new Ajv({
            discriminator: true,
            formats: {
                email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
            }
        })
    }
    getAjv() {
        return this.ajv;
    }
    
}