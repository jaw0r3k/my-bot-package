const ClientPresence = require("../structures/presence/ClientPresence")

/**
 * Options for a client.
 * @typedef {object} ClientOptions
 * @property {?object} ws Websocket options
 * @property {?object} allowedMentions Allowed Mentions sended with message
 * @property {?boolean} failIfNotExists Faild if replied message not exits
 * @property {?number} guildWaitTimeout
 * @property {?ClientPresenceData} presence
 */

/**
 * 
 * @param {ClientOptions} options 
 * @returns {ClientOptions}
 */
function resolveClientOptions(options={}){
    return {
        ws: {
            os: options.ws?.os ?? "Linux", 
            browser: options.ws?.browser ?? "Bot Package",
            device: options.ws?.device ?? "JavaScript",
        },
        allowedMentions: {
            parse: options.allowedMentions?.parse ?? ["roles", "users" , "everyone"],
            roles: options.allowedMentions?.roles ?? [],
            users: options.allowedMentions?.users ?? [],
            replied_user: options.allowedMentions?.repliedUser
        },
        failIfNotExists: options.failIfNotExists ?? false,
        guildWaitTimeout: options.guildWaitTimeout ?? 20_000,
        presence: new ClientPresence(options.presence)
    }
}
module.exports = resolveClientOptions