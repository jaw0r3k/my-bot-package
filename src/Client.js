const EventEmitter = require('node:events');
const WebSocket = require("ws");
const ChannelsManager = require('../managers/ChannelsManager.js');
const Channel = require('../structures/Channel.js');
const ClientApi = require('./api.js');
const WebSocketManager = require("./ws.js")
 module.exports = class Client extends EventEmitter {
     /**
      * 
      * @param {ClientOptions} options 
      */
    constructor(options){
      super()
      this.guilds = new Map()
      this.channels = new ChannelsManager(this)
      this.ws = new WebSocketManager(this);
      this.api = new ClientApi(this)
      this.intents = options || 37377
    }
    async login(token = this.token) {
      if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
      this.token = token
      await this.ws.connect();
      return this.token;
    }
    destroy() {
      super.removeAllListeners()

      this.ws.destroy();
      this.token = null;
    }
}