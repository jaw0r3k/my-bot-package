
function createEnum(keys) {
    const coolEnum = {};
    for (const [index, key] of keys.entries()) {
      if (key === null) continue;
      coolEnum[key] = index;
      coolEnum[index] = key;
    }
    return coolEnum;
  }

module.exports = {
    createEnum, 
    ActivityType: createEnum(["Playing", "Streaming", "Listening", "Watching", "Custom", "Competing"]),
    CommandType: createEnum([null, "ChatInput", "User", "Message"]),
    ComponentType: createEnum([null, "ActionRow", "Button", "SelectMenu"]),
    CommandOptionType: createEnum([null, "SubCommand", "SubCommandGroup", "String", "Integer", "Message"]),
    InteractionType: createEnum([null, "Ping", "Command", "Component", "Autocomplete", "Modal"]),
    ButtonStyle: createEnum(["Primary", "Secondary", "Success", "Danger", "Link" ]),
    ChannelType: createEnum([  "GuildText", "Dm", "GuildVoice", "GroupDm", "GuildCategory", "GuildNews", ...Array(4).fill(null), "GuildNewsThread", "GuildPublicThread", "GuildPrivateThread", "GuildStageVoice", "GuildDirectory", "GuildForum"]),
    MessageType: createEnum(["Default", "RecipentAdd", "RecipientRemove", "Call", "ChannelNameChange", "ChannelIconChange", "ChannelPinnedMessage", "UserJoin", "GuildBoost", "GuildBoostTier1", "GuildBoostTier2", "GuildBoostTier3", "ChannelFollowAdd", "GuildDiscoveryDisqualified", "GuildDiscoveryRequalified", 
    "GuildDIscoveryGracePeriodInitialWarning", "GuildDIscoveryGracePeriodFinalWarning", "ThreadCreated", "Reply", "ChantInputCommand", "ThreadStarterMessage", "GuildInviteRemider", "ContexMenuCommand", "AutoModeractionAction"]),
    MessageActivityType: createEnum(["Join", "Spectate", "Listen", "JoinRequest"]),
    EmbedTypes: createEnum(["Rich", "Image", "Video", "Gifv", "Article", "Link"]),
}