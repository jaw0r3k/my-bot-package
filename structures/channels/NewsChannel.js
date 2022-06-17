const BaseTextChannel = require("../BaseTextChannel");

module.exports = class NewsChannel extends BaseTextChannel {
    constructor(client, data){
        super(client, data)
    }
}