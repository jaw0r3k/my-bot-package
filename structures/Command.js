const Base = require("./Base");

module.exports = class Command extends Base {
    constructor(client, data){
        super(client)
        this.id = data.id
        this.type = data.type
    }
    _patch(data){

    }
}