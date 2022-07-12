'use strict';

const BitField = require('./BitField');

class Permissions extends BitField {

    missing(bits, checkAdmin = true) {
        return checkAdmin && this.has(this.constructor.Flags.Administrator) ? [] : super.missing(bits);
    }
    any(permission, checkAdmin = true) {
        return (checkAdmin && super.has(this.constructor.Flags.Administrator)) || super.any(permission);
    }
    has(permission, checkAdmin = true) {
        return (checkAdmin && super.has(this.constructor.Flags.Administrator)) || super.has(permission);
    }
    toArray() {
        return super.toArray(false);
    }
}
Permissions.Flags = {
  CreateInstantInvite: 1n << 0n,
  KickMembers: 1n << 1n,
  BanMembers: 1n << 2n,
  Administrator: 1n << 3n,
  ManageChannels: 1n << 4n,
  ManageGuild: 1n << 5n,
  AddReactions: 1n << 6n,
  ViewAuditLog: 1n << 7n,
  PrioritySpeaker: 1n << 8n,
  Stream: 1n << 9n,
  ViewChannel: 1n << 10n,
  SendMessages: 1n << 11n,
  SendTtsMessages: 1n << 12n,
  ManageMessages: 1n << 13n,
  EmbedLinks: 1n << 14n,
  AttachFiles: 1n << 15n,
  ReadMessageHistory: 1n << 16n,
  MentionEveryone: 1n << 17n,
  UseExternalEmojis: 1n << 18n,
  ViewGuildInsigths: 1n << 19n,
  Connect: 1n << 20n,
  Speak: 1n << 21n,
  MuteMembers: 1n << 22n,
  DeafenMembers: 1n << 23n,
  MoveMembers: 1n << 24n,
  UseVad: 1n << 25n,
  ChangeNickname: 1n << 26n,
  ManageNicknames: 1n << 27n,
  ManageRoles: 1n << 28n,
  ManageWebhooks: 1n << 29n,
  ManageEmojisAndStickers: 1n << 30n,
  UseApplicationCommands: 1n << 31n,
  RequestToSpeak: 1n << 32n,
  ManageEvents: 1n << 33n,
  ManageThreads: 1n << 34n,
  CreatePublicThreads: 1n << 35n,
  CreatePrivateThreads: 1n << 36n,
  UseExternalStickers: 1n << 37n,
  SendMessagesInThreads: 1n << 38n,
  StartEmbeddedActivities: 1n << 39n,
  ModerateMembers: 1n << 40n,
};

Permissions.All = Object.values(Permissions.Flags).reduce((all, p) => all | p, 0n);
Permissions.Default = BigInt(104324673);
Permissions.defaultBit = BigInt(0);

module.exports = Permissions;
