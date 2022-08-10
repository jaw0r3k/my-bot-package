
function createEnum(keys) {
    const coolEnum = {};
    for (const [index, key] of Object.entries(keys)) {
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
    CommandOptionType: createEnum([null, "SubCommand", "SubCommandGroup", "String", "Integer", "Message"]),
    InteractionType: createEnum(["Ping", "Command", "Component", "Autocomplete", "Modal"]),
    ButtonStyle: createEnum(["Primary", "Secondary", "Success", "Danger", "Link" ]),
    ChannelType: createEnum({"GuildText":0, "Dm":1, "GuildVoice":2, "GroupDm":3, "GuildCategory":4, "GuildNews":5, "GuildNewsThread":10, "GuildPublicThread":11, "GuildPrivateThread": 12, "GuildStageVoice": 13, "GuildDirectory": 14, "GuildForum": 15}),
    MessageType: createEnum(["Default", "RecipentAdd", "RecipientRemove", "Call", "ChannelNameChange", "ChannelIconChange", "ChannelPinnedMessage", "UserJoin", "GuildBoost", "GuildBoostTier1", "GuildBoostTier2", "GuildBoostTier3", "ChannelFollowAdd", "GuildDiscoveryDisqualified", "GuildDiscoveryRequalified", 
    "GuildDIscoveryGracePeriodInitialWarning", "GuildDIscoveryGracePeriodFinalWarning", "ThreadCreated", "Reply", "ChantInputCommand", "ThreadStarterMessage", "GuildInviteRemider", "ContexMenuCommand", "AutoModeractionAction"]),
    MessageActivityType: createEnum(["Join", "Spectate", "Listen", "JoinRequest"]),
    EmbedTypes: createEnum(["Rich", "Image", "Video", "Gifv", "Article", "Link"]),
}