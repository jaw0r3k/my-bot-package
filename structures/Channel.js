const Base = require("./Base")

module.exports = class Channel extends Base {
  constructor(client, data){
        super(client)
        /**
         *  @type {Number} type
         */
        this.type = data.type
        /**
         *  @type {String} name
         */
        this.name = data.name
        /**
         *  @type {String} id
         */
        this.id = data.id
            /**
         *  @type {String} Guild Id
         */
      }
      /**
       *  @returns {BigInt} type
       */
    get createdTimestamp() {
      return Number(BigInt(this.id) >> 22n) + 1420070400000;
    }
    static generateChannel(client, data){
      let channel = {}
      switch (data.type){
        case 0:
            const TextChannel = require("./channels/TextChannel")
            channel = new TextChannel(client, data)
            break
          case 2:
            const VoiceChannel = require("./channels/VoiceChannel")
            channel = new VoiceChannel(client, data)
              break; 
          case 4:
            const CategoryChannel = require("./channels/CategoryChannel")
            channel = new CategoryChannel(client, data)
            break
          case 5:
              break;
          case 10:
          case 11:
          case 12:
            const ThreadChannel = require("./channels/ThreadChannel")
            channel = new ThreadChannel(client, data)
            break
          case 13:

            break;
          default:
              new Channel(client, data)
        return channel
        }
      }
}