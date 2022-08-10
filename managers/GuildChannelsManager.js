const Channel = require("../structures/Channel");
const CachedManager = require("./CachedManager");
const ChannelsManager = require("./ChannelsManager");

module.exports = class GuildChannelsManager extends ChannelsManager  {
    constructor(client, guild){
      super(client, Channel)
      this.guild = guild
    }
    _add(data, { cache = true } = {}) {
        const existing = this.cache.get(data.id);
        if (existing) {
          if (cache) existing._patch(data);
          return existing;
        }
        
        const channel = Channel.generateChannel(this.client, data);
    
        if (!channel) {
          return null;
        }
    
        if (cache) this.cache.set(channel.id, channel);
    
        return channel;
      }
      async create(options, reason) {
        if(!options.name) throw new Error("No Name")
        if(!options.type) options.type = 1
        const data = await this.client.api.endpoint(`guilds/${this.guild.id}/channels`, "POST", { reason, data: options})
        return this._add(data, this.guild);
      }
      async setPostition(channel, position, reason){
        const id = this.resolveId(channel)
        if(!position) position = 0
        await this.client.api.endpoint(`guilds/${guild.id}/channels`, "PATCH", {id, position, reason})
      }
}