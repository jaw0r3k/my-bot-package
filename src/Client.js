const EventEmitter = require('node:events');
const ChannelsManager = require('../managers/ChannelsManager.js');
const CommandManager = require('../managers/CommandManager.js');
const GuildsManager = require('../managers/GuildsManager.js');
const UsersManager = require('../managers/UserManager.js');
const Intents = require('../utils/Intents.js');
const ClientApi = require('./api.js');
const WebSocketManager = require("./ws.js")
const resolveClientOptions = require("./options")
 module.exports = class Client extends EventEmitter {
     /**
      * @param {ClientOptions} options 
      */
    constructor(options={}){
      super()
      this.guilds = new GuildsManager()
      this.channels = new ChannelsManager(this)
      this.users = new UsersManager(this)
      this.user = null
      this.commands = new CommandManager(this)
      this.ws = new WebSocketManager(this);
      this.api = new ClientApi(this)
      this.options = resolveClientOptions(options)
      this.intents = new Intents(options.intents)
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