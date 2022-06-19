const MembersManager = require("../managers/MembersManager");
const Base = require("./Base");
const Channel = require("./Channel");
const Member = require("./Member");
// /**
//  * @typedef {Object} ApiGuild
//  * @property {String} id
//  * @property {(String|null)} icon
//  * @property {String} permissions
//  */
module.exports = class Guild extends Base {
    constructor(client, data) {
      super(client)
      this.id = data.id
      /**
       *  @type {String} Id of guild's owner
      */
      this.ownerId = data.owner_id 
      /**
       *  @type {String} Icon of guild in hash
      */
      this.icon = data.icon ?? null

      this.members = new MembersManager(this.client, this, data.members)
      this.channels = new Map(
        data.channels.map((channel) => {
          return [channel.id, new Channel(client, channel)];
        }));
      this.roles = new Map(
        data.roles.map((role) => {
        return [role.id, role];
        }))
      this.emojis = new Map(
        data.emojis.map((emoji) => {
          return [emoji.id, emoji];
        }))   
       }
    get createdTimestamp() {
      return Number(BigInt(this.id) >> 22n) + 1420070400000;
    }
    /**
     * @returns {String}
     */
    get nameAcronym() {
      return this.name
        .replace(/'s /g, " ")
        .replace(/\w+/g, (e) => e[0])
        .replace(/\s/g, "");
    }
    /**
     * @returns {String}
     */
    toString() {
      return this.name;
    }
};
