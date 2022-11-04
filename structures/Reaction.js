const Base = require("./Base");

module.exports = class Reaction extends Base {
    constructor(client, data){
        super(client)
        this.id = data.id
    }
    _patch(data){
            this.name = data.name
            this.managed = data.managed;
            this.available = data.available;
            this.requiresColons = data.require_colons;
    }
}