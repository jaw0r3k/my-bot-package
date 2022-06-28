const BitField = require("./BitField")

module.exports = class Intents extends BitField {
    static Flags = {
        Guilds: 1,
        GuildMembers: 2,
        GuildBans: 4,
        GuildEmojisAndStickers: 8,
        GuildIntegrations: 16,
        GuildWebhooks: 32,
        GuildInvites: 64,
        GuildVoiceStates: 128,
        GuildPresences: 256,
        GuildMessages: 512,
        GuildMessageReactions: 1024,
        GuildMessageTyping: 2048,
        DirectMessages: 4096,
        DirectMessageReactions: 8192,
        DirectMessageTyping: 16384,
        MessageContent: 32768,
        GuildScheduledEvents: 65536,
        // 4 numbers magically disappear
        AutoModerationConfiguration: 1048576,
        AutoModerationExecution: 2097152
    }
}
