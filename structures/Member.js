const MemberRolesManager = require("../managers/MemberRolesManager")
const Permissions = require("../utils/Permissions")
const Base = require("./Base")
const User = require("./User")

module.exports = class Member extends Base {
  constructor(client, data, guild){
    super(client)
    this.guild = guild
    this._patch(data)
  }
  _patch(data){
    /**
      * @type {User} User of member
    */
     this.user = this.client.users._add(data.user)
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
     * @type {MemberRolesManager} Member roles
    */
    this.roles = new MemberRolesManager(this.client, this, data.roles)
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
    this.permissions = new Permissions(data.permissions)
    /**
     * @type {(Data|null)} When member`s timeout will expire
     */
    this.communicationDisabledUntil = new Date(data.communication_disabled_until) ?? null
    }
}