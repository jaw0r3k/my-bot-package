const { Buffer } = require('node:buffer');
const MessageEmbed = require('../structures/builders/MessageEmbed');
const DataResolver = require('./DataResolver');
const Util = require('./Util');

class MessagePayLoad {
  constructor(target, options) {
    this.target = target;
    this.options = options;
    this.data = null;
    this.files = null;
  }
//   get isWebhook() {
//     const Webhook = require('./Webhook');
//     const WebhookClient = require('../client/WebhookClient');
//     return this.target instanceof Webhook || this.target instanceof WebhookClient;
//   }

  get isUser() {
    const User = require('./User');
    const Member = require('../structures/Memeber');
    return this.target instanceof User || this.target instanceof GuildMember;
  }
  get isMessage() {
    const  Message  = require('../structures/Message');
    return this.target instanceof Message;
  }
  get isMessageManager() {
    const MessageManager = require('../managers/MessagesManager');
    return this.target instanceof MessageManager;
  }
  get isInteraction() {
    const Interaction = require('../structures/Interaction');
    return this.target instanceof Interaction ;
  }

  makeContent() {
    let content;
    if (this.options.content === null) {
      content = '';
    } else if (typeof this.options.content !== 'undefined') {
      content = this.options.content
    }

    return content;
  }

  resolveData() {
    if (this.data) return this;
    const isInteraction = this.isInteraction;
    const isWebhook = this.isWebhook;

    const content = this.makeContent();
    const tts = Boolean(this.options.tts);

    let nonce;
    if (typeof this.options.nonce !== 'undefined') {
      nonce = this.options.nonce;
      if (typeof nonce === 'number' ? !Number.isInteger(nonce) : typeof nonce !== 'string') {
        throw new RangeError('MESSAGE_NONCE_TYPE');
      }
    }

    const components = this.options.components?.map(c => c);

    let username;
    let avatarURL;
    if (isWebhook) {
      username = this.options.username ?? this.target.name;
      if (this.options.avatarURL) avatarURL = this.options.avatarURL;
    }

    let flags;
    if (
      typeof this.options.flags !== 'undefined' ||
      (this.isMessage && typeof this.options.reply === 'undefined') ||
      this.isMessageManager
    ) {
      flags = this.options.flags != null ?this.options.flags : this.target.flags;
    }

    if (isInteraction && this.options.ephemeral) {
      flags |= 1 << 6;
    }

    let allowedMentions =
      typeof this.options.allowedMentions === 'undefined'
        ? this.target.client.options.allowedMentions
        : this.options.allowedMentions;

    if (allowedMentions) {
      allowedMentions = allowedMentions.clone();
      allowedMentions.replied_user = allowedMentions.repliedUser;
      delete allowedMentions.repliedUser;
    }

    let message_reference;
    if (typeof this.options.reply === 'object') {
      const reference = this.options.reply.messageReference;
      const message_id = this.isMessage ? reference.id ?? reference : this.target.messages.resolveId(reference);
      if (message_id) {
        message_reference = {
          message_id,
          fail_if_not_exists: this.options.reply.failIfNotExists ?? this.target.client.options.failIfNotExists,
        };
      }
    }

    const attachments = this.options.files?.map((file, index) => ({
      id: index.toString(),
      description: file.description,
    }));
    if (Array.isArray(this.options.attachments)) {
      this.options.attachments.push(...(attachments ?? []));
    } else {
      this.options.attachments = attachments;
    }

    this.data = {
      content,
      tts,
      nonce,
      embeds: this.options.embeds?.map(embed => new MessageEmbed(embed).toJSON()),
      components,
      username,
      avatar_url: avatarURL,
      allowed_mentions:
        typeof content === 'undefined' && typeof message_reference === 'undefined' ? undefined : allowedMentions,
      flags,
      message_reference,
      sticker_ids: this.options.stickers?.map(sticker => sticker.id ?? sticker),
    };
    return this;
  }

  async resolveFiles() {
    if (this.files) return this;

    this.files = await Promise.all(this.options.files?.map(file => this.constructor.resolveFile(file)) ?? []);
    return this;
  }
  static async resolveFile(fileLike) {
    let attachment;
    let name;

    const findName = file => {
      if (typeof file === 'string') {
        return Util.basename(file);
      }

      if (file.path) {
        return Util.basename(file.path);
      }

      return 'file.jpg';
    };

    const ownAttachment =
      typeof fileLike === 'string' || fileLike instanceof Buffer || typeof fileLike.pipe === 'function';
    if (ownAttachment) {
      attachment = fileLike;
      name = findName(attachment);
    } else {
      attachment = fileLike.attachment;
      name = fileLike.name ?? findName(attachment);
    }

    const resource = await DataResolver.resolveFile(attachment);
    return { attachment, name, file: resource };
  }


  static create(target, options, extra = {}) {
    return new this(
      target,
      typeof options !== 'object' || options === null ? { content: options, ...extra } : { ...options, ...extra },
    );
  }
}

module.exports = MessagePayLoad;