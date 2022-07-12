const BansManager = require("../managers/BansManager");
const MembersManager = require("../managers/MembersManager");
const RolesManager = require("../managers/RolesManager");
const Base = require("./Base");
const Channel = require("./Channel");
const Collection = require("./Collection");
const Permissions = require("../utils/Permissions")
module.exports = class Guild extends Base {
    constructor(client, data) {
      super(client)
      this.id = data.id
      
      this.members = new MembersManager(this.client, this, data.members)
      this.channels = new Collection(
        data.channels.map((channel) => {
          return [channel.id, new Channel(client, channel)];
        }));
        this.bans = new BansManager(this.client, this, data.bans)
        this.roles = new RolesManager(this.client, this, data.roles)
        this.emojis = new Collection(
          data.emojis.map((emoji) => {
            return [emoji.id, emoji];
          }))   
          this._patch(data)
        }
        _patch(data){
          this.description = data.description ?? null
          this.permissions = new Permissions(data.permissions)
          this.features = data.features ?? []
          this.mfaLevel = data.mfa_level
          this.systemChannelId = data.system_channel_id ?? null
          this.systemChannelFlags = data.system_channel_flags
          this.explicitContentFilter = data.explicit_content_filter
          this.defaultMessageNotifications = data.default_message_notifications
          this.verificationLevel = data.verification_level
          /**
           *  @type {String} Id of guild's owner
           */
          this.ownerId = data.owner_id 
          /**
           *  @type {String} Icon of guild in hash
           */
          this.icon = data.icon ?? null
          this.banner = data.banner ?? null
          this.premiumTier = data.premium_tier
          this.premiumSubscriptionCount = data.premium_subscription_count ?? 0
          this.preferredLocale = data.preferred_locale
          this.stickers = data.stickers ?? []
          this.nsfwLevel = data.nsfw_level
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
