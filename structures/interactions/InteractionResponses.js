const { default: fetch } = require("node-fetch");
const Constants = require("../../src/Constants");
const MessagePayLoad = require("../../utils/MessagePayLodad");
const Interaction = require("../Interaction");
const Message = require("../Message");

 class InteractionResponses {

    async reply(options) {
      if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
      let payLoad = options instanceof MessagePayLoad ? options.resolveData() : MessagePayLoad.create(this, options).resolveData();
      const { data, files } = await payLoad.resolveFiles();
      this.ephemeral = options.ephemeral ?? false;
      await this.client.api.endpoint(`interactions/${this.id}/${this.token}/callback`, "POST", {
        data: { type: 4, data },
        files,
      })
      this.replied = true;
  
      return options.fetchReply ? this.fetchReply() : undefined;
    }
async deferReply(options = {}) {
    if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
    this.ephemeral = options.ephemeral ?? false;
    await this.client.api.endpoint(`interactions/${this.id}/${this.token}/callback`, "POST", {
      data: { type: 5, data: { flags: this.ephemeral ? 1 << 6 : 0} },
    })
    this.deferred = true;

    return options.fetchReply ? this.fetchReply() : undefined;
  }


  async fetchReply(id="@original") {
     const message = await this.client.api.endpoint(`interactions/${this.client.application.id}/${this.token}/messages/${id}`).then(m  => m.json())
    if(!message) return null
     return message ? this.channel?.messages._add(message, false) ?? new Message(message) : null
  }

  async editReply(options, id="@original") {
    if (!this.deferred && !this.replied) throw new Error('INTERACTION_NOT_REPLIED');
    let payLoad = options instanceof MessagePayLoad ? options.resolveData() : MessagePayLoad.create(this, options).resolveData();
    const { data, files } = await payLoad.resolveFiles();
    const message = await this.client.api.endpoint(`webhooks/${this.client.application.id}/${this.token}/messages/${id}`, "PATCH", {
      data: { data },
      files
    })
    if(!message) return
    this.replied = true;
    return message ? this.channel?.messages._add(message) ?? new Message(message) : null
    }

  async deleteReply(id="@original") {
    if (this.ephemeral) throw new Error('INTERACTION_EPHEMERAL_REPLIED');
    await this.client.api.endpoint(`webhooks/${this.client.application.id}/${this.token}/messages/${id}`, "DELETE" )
  }

  async followUp(options) {
    if (!this.deferred && !this.replied) return Promise.reject(new Error('INTERACTION_NOT_REPLIED'));
    let payLoad = options instanceof MessagePayLoad ? options.resolveData() : MessagePayLoad.create(this, options).resolveData();
    const { data, files } = await payLoad.resolveFiles();
    const message = await this.client.api.endpoint(`webhooks/${this.client.application.id}/${interaction.token}` , "POST", {
      data: { data },
      files
    })
    return message ? this.channel?.messages._add(message, false) ?? new Message(message) : null
    }

  async deferUpdate(options = {}) {
    if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
    this.client.api.endpoint(`interactions/${this.id}/${this.token}/callback`, "POST", {
      data: { type: 6 },
    })
    this.deferred = true;

    return options.fetchReply ? this.fetchReply() : undefined;
  }

  async update(options) {
    if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
    let payLoad = options instanceof MessagePayLoad ? options.resolveData() : MessagePayLoad.create(this, options).resolveData();
    const { data, files } = await payLoad.resolveFiles();
    await this.client.api.endpoint(`interactions/${this.id}/${this.token}/callback`, "POST", {
      data: { type: 7, data },
      files
    })
    this.replied = true;

    return options.fetchReply ? await this.fetchReply() : undefined;
  }

  async showModal(modal) {
    if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
    
    await this.client.api.endpoint(`interactions/${this.id}/${this.token}/callback`, "POST", {
      data: { type: 9, data: modal },
    })
    this.replied = true;
  }

  static applyToClass(structure, ignore = []) {
    const props = [
      'deferReply',
      'reply',
      'fetchReply',
      'editReply',
      'deleteReply',
      'followUp',
      'deferUpdate',
      'update',
      'showModal',
    ];

    for (const prop of props) {
      if (ignore.includes(prop)) continue;
      Object.defineProperty(
        structure.prototype,
        prop,
        Object.getOwnPropertyDescriptor(InteractionResponses.prototype, prop),
      );
    }
  }
}

module.exports = InteractionResponses