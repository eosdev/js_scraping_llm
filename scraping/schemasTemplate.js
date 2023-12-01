const z = require("zod");

class zSchema {

    //classe que define o construtor
    constructor () {
        this.schema = z.object({
            "person-name": z.string().optional(),
            "person-age":z.number().optional(),
            "person-hair_color":z.string().optional(),
            "dog-name":z.string().optional(),
            "dog-brred":z.string().optional(),
        })
    }

    //funcao que retorna o esqueleto do esquema
    getSchema() {
        return this.schema;
    }
};


module.exports = { zSchema};
