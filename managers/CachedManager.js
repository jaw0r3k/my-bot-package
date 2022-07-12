'use strict';

const Collection = require('../structures/Collection');
const DataManager = require('./DataManager');

class CachedManager extends DataManager {
  constructor(client, holds, iterable) {
    super(client, holds);

    Object.defineProperty(this, '_cache', { value: new Collection() });


    if (iterable) {
      for (const item of iterable) {
        this._add(item);
      }
    }
  }

  get cache() {
    return this._cache;
  }

  _add(data, cache = true, { id, extras = [] } = {}) {
    const existing = this._cache.get(id ?? data.id);
    if (existing) {
      if (cache) {
        existing._patch(data);
        return existing;
      }
      const clone = existing._clone();
      clone._patch(data);
      return clone;
    }

    const entry = this.holds && !(data instanceof this.holds) ? new this.holds(this.client, data, ...extras) : data;
    if (cache) this._cache.set(id ?? entry.id, entry);
    return entry;
  }
}

module.exports = CachedManager;
