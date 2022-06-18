const Base = require("./Base")

module.exports = class User extends Base {
    constructor(client, data){
        super(client)
      /**
          * @type {String} Name of user 
        */
        this.username = data.username
        /**
          * @type {Number} Discriminator of user 
        */
        this.discriminator = data.discriminator
        /**
         * @type {{String|null}} Avatar of user in hash 
         */
        this.avatar	= data.avatar ?? null
        /**
         * @type {(String|null)} Banner of user  in hash 
         */
        this.banner = data.banner ?? null
        /**
         * @type {(Number|null)} User's accent color 
         */
        this.accentColor = data.accent_color ?? null
        /**
          * @type {Boolean} If user is bot 
        */
        this.bot = data.bot
        /**
          * @type {Boolean} If user is system 
        */
        this.system = data.system ?? false
    }
}