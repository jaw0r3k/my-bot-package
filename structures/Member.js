const Role = require("./Role")
const User = require("./User")

module.exports = class Member {
  constructor(client, data){
    this.client = client
    Object.assign(this, data)
        /**
          * @type {User} User of member
        */
        this.user = new User(client, data.user)
        /**
          * @type {(String|null)} NIckname of member
        */
        this.nickname = data.nick ?? null
        /**
         *  Avatar of member **in guild**
         * @type {(String|null)} 
        */
        this.avatar = data.avatar
        /**
         * @type {Map<String, Role} Member roles
        */
        this.roles = new Map(
            data.roles.map(role => {
                return [role.id, new Role(client, role)]
            }))
        /**
         * @type {Data} When the user joined the guild
        */
        this.joinedAt = new Date(data.joined_at)
        /**
         * @type {(Date|null)} When the user started boosting
        */
        this.premiumSince = new Date(data.premium_since) ?? null
        /**
         * @type {Boolean} Whether the user has not yet passed the guild's Membership Screening requirements
        */
        this.pending = data.pending
        /**
         * @type {String} Permissions of member
        */
        this.permissions = data.permissions
        /**
         * @type {(Data|null)} When member`s timeout will expire
         */
        this.communicationDisabledUntil = new Date(data.communication_disabled_until) ?? null
    }
}