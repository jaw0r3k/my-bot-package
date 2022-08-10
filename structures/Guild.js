const BansManager = require("../managers/BansManager");
const MembersManager = require("../managers/MembersManager");
const RolesManager = require("../managers/RolesManager");
const Base = require("./Base");
const Channel = require("./Channel");
const Collection = require("./Collection");
const Permissions = require("../utils/Permissions")
module.exports = class Guild extends Base {
    constructor(client, data={}) {
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
          this.name = data.name
          this.description = data.description ?? null
          this.permissions = new Permissions(data.permissions)
          this.features = data.features ?? []
          this.mfaLevel = data.mfa_level
          this.systemChannelId = data.system_channel_id ?? null
          this.systemChannelFlags = data.system_channel_flags
          this.explicitContentFilter = data.explicit_content_filter
          this.defaultMessageNotifications = data.default_message_notifications
          this.verificationLevel = data.verification_level
          this.ownerId = data.owner_id 
          this.icon = data.icon ?? null
          this.iconHash = data.icon_hash
          this.banner = data.banner ?? null
          this.premiumTier = data.premium_tier
          this.discoverySplash = data.discovery_splash
          this.vanityUrlCode = data.vanity_url_code
          this.widgetEnabled = data.widget_enabled
          this.afkTimeout = data.afk_timeout
          this.afkCHannelId = data.afk_channel_id
          this.region = data.region
          this.widgetChannelId = data.widget_channel_id
          this.rulesChannelId = data.rules_channel_id
          this.premiumSubscriptionCount = data.premium_subscription_count ?? 0
          this.preferredLocale = data.preferred_locale
          this.stickers = data.stickers ?? []
          this.publicUpdatesChannelId = data.public_updates_channel_id
          this.maxVideoChannelUsers = data.max_video_channel_users
          this.maxMembers = data.max_memebers
          this.maxPresences = data.max_presences

          this.approximateMemberCount = data.approximate_member_count
          this.welcomeScreen = data.welcome_screen
          this.premiumProgressBarEnabled = data.premium_progress_bar_enabled
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
