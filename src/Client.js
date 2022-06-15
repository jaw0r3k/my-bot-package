const EventEmitter = require('node:events');
const WebSocket = require("ws");
const Channel = require('../structures/Channel.js');
const WebSocketManager = require("./ws.js")
 module.exports = class Client extends EventEmitter {
     /**
      * 
      * @param {ClientOptions} options 
      */
    constructor(options){
      super()
      this.guilds = new Map()
      this.channels = new Map()
      this.ws = new WebSocketManager(this);
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