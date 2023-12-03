const z = require("zod");

class zSchema {

    //classe que define o construtor
    constructor () {
        this.schema = z.object({
            "product_name": z.string().optional(),
            "product_current_price":z.string().optional(),
            "product_previous_price":z.string().optional(),
            "image_url":z.string().optional(),
            "product_sku":z.string().optional(),
        })
    }

    //funcao que retorna o esqueleto do esquema
    getSchema() {
        return this.schema;
    }
};


module.exports = { zSchema};
