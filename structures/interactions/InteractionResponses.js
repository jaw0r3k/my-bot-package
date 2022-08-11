const { default: fetch } = require("node-fetch");
const Constants = require("../../src/Constants");
const MessagePayLoad = require("../../utils/MessagePayLodad");
const Interaction = require("../Interaction");
const Message = require("../Message");

 class InteractionResponses {

    async reply(options) {
      if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
      let payLoad;
      if (options instanceof MessagePayLoad) {
        payLoad = options.resolveData();
      } else {
        payLoad = MessagePayLoad.create(this, options).resolveData();
      }
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
    await this.client.api.endpoint(`interactions/${this.id}/${this.token}/callback`, "POST" {
      data: { type: 5, data: { flags: this.ephemeral ? 1 << 6 : 0} },
    })
    this.deferred = true;

    return options.fetchReply ? this.fetchReply() : undefined;
  }


  async fetchReply() {
     const message = await this.client.api.endpoint(`interactions/${this.id}/${this.token}/messages/@original`).then(m  => m.json())
    if(!message) return null
     return new Message(message)
  }

  async editReply(options) {
    if (!this.deferred && !this.replied) throw new Error('INTERACTION_NOT_REPLIED');
    const message = await this.client.api.endpoint(`interactions/${this.id}/${this.token}/messages/@original`, "PATCH"{
      data: { data: options },
    }).then(m  => m.json())
    if(!message) return
    this.replied = true;
    return message;
  }

  async deleteReply() {
    if (this.ephemeral) throw new Error('INTERACTION_EPHEMERAL_REPLIED');
    await this.client.api.endpoint(`interactions/${this.id}/${this.token}/messages/@original`, "DELETE" )}


  followUp(options) {
    if (!this.deferred && !this.replied) return Promise.reject(new Error('INTERACTION_NOT_REPLIED'));
    return this.webhook.send(options);
  }

  async deferUpdate(options = {}) {
    if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
    await fetch(`${Constants.api}/interactions/${this.id}/${this.token}/callback`,{
      method: "POST",
      body: JSON.stringify({ type: 6 }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.deferred = true;

    return options.fetchReply ? this.fetchReply() : undefined;
  }

  async update(options) {
    if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
    await fetch(`${Constants.api}/interactions/${this.id}/${this.token}/callback`,{
      method: "POST",
      body: JSON.stringify({ type: 7, data: options }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.replied = true;

    return options.fetchReply ? this.fetchReply() : undefined;
  }

  async showModal(modal) {
    if (this.deferred || this.replied) throw new Error('INTERACTION_ALREADY_REPLIED');
    
    await fetch(`${Constants.api}/interactions/${this.id}/${this.token}/callback`,{
      method: "POST",
      body: JSON.stringify({ type: 9, data: modal }),
      headers: {
        "Content-Type": "application/json"
      }
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