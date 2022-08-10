const Util = require('../../utils/Util');
module.exports = class Attachment {
  constructor(attachment, name = null, data) {
    this.attachment = attachment;
    this.name = name;
    if (data) this._patch(data);
  }
  setDescription(description) {
    this.description = description;
    return this;
  }
  setFile(attachment, name = null) {
    this.attachment = attachment;
    this.name = name;
    return this;
  }
  setName(name) {
    this.name = name;
    return this;
  }

  setSpoiler(spoiler = true) {
    if (spoiler === this.spoiler) return this;

    if (!spoiler) {
      while (this.spoiler) {
        this.name = this.name.slice('SPOILER_'.length);
      }
      return this;
    }
    this.name = `SPOILER_${this.name}`;
    return this;
  }

  _patch(data) {
    this.id = data.id;

    if ('size' in data) {
      this.size = data.size;
    }

    if ('url' in data) {
      this.url = data.url;
    }

    if ('proxy_url' in data) {
      this.proxyURL = data.proxy_url;
    }

    this.height = data.height ?? null;

    this.width = data.width ?? null;
    this.contentType = data.content_type ?? null;

    this.description = data.description ?? null;
    this.ephemeral = data.ephemeral ?? false;
  }

  get spoiler() {
    return Util.basename(this.url ?? this.name).startsWith('SPOILER_');
  }

  toJSON() {
    return Util.flatten(this);
  }
}
