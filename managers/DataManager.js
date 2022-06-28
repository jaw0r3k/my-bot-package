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
export abstract class CachedManager<K, Holds, R> extends DataManager<K, Holds, R> {
  protected constructor(client: Client, holds: Constructable<Holds>);
  private _add(data: unknown, cache?: boolean, { id, extras }?: { id: K; extras: unknown[] }): Holds;
}
module.exports = DataManager;
