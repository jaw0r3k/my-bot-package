
module.exports = class Channel {
    constructor(client, data){
        this.client = client
        /**
         *  @property {Number} type
         */
        this.type = data.type
           /**
         *  @property {String} name
         */
        this.name = data.name
           /**
         *  @property {String} id
         */
        this.id = data.id
    }
       /**
         *  @returns {BigInt} type
         */
    get createdTimestamp() {
        return Number(BigInt(this.id) >> 22n) + 1420070400000;
      }
      static generateChannel(client, data){
        switch (data.type){
          case 0:
            return new TextChannel(client, data)
          break;
          case 1:
              break;
          case 2:
              break; 
          case 3:
              break;
          case 4:
              break;
          case 5:
              break;
          case 10:
          case 11:
          case 12:
            break
          case 13:

            break;
          default:
              new Channel(client, data)
        }
      }
}