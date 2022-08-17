const Channel = require("../Channel");

module.exports = class VoiceChannel extends Channel{
    constructor(client, data){
        super(client, data)
    }
}