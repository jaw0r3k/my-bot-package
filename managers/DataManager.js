'use strict';

const BaseManager = require('./BaseManager');
const { Error } = require('../errors');

/**
 * Manages the API methods of a data model along with a collection of instances.
 * @extends {BaseManager}
 * @abstract
 */
class DataManager {
  constructor(client, holds) {
    Object.defineProperty(this, 'client', { value: client });
    Object.defineProperty(this, 'holds', { value: holds });
  }

  resolve(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance;
    if (typeof idOrInstance === 'string') return this.cache.get(idOrInstance) ?? null;
    return null;
  }

  resolveId(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance.id;
    if (typeof idOrInstance === 'string') return idOrInstance;
    return null;
  }

  valueOf() {
    return this.cache;
  }
}

module.exports = DataManager;
