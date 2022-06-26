 class Collection extends Map {
    constructor(objets){
        super(objets)
    }
    some(fn){
		for (const [key, val] of this) {
			if (fn(val, key, this)) return true;
		}
		return false;
    }
    find(fn){
		for (const [key, val] of this) {
			if (fn(val, key, this)) return val;
		}
		return undefined;
    }
    findKey(fn){
		for (const [key, val] of this) {
			if (fn(val, key, this)) return key;
		}
		return undefined;
    }
    filter(fn){
        const results = new this.constructor();
		for (const [key, val] of this) {
			if (fn(val, key, this)) results.set(key, val);
		}
        return results
    }
    sort(compareFunction = Collection.defaultSort) {
		const entries = [...this.entries()];
		entries.sort((a, b) => compareFunction(a[1], b[1], a[0], b[0]));

		super.clear();

		// Set the new entries
		for (const [k, v] of entries) {
			super.set(k, v);
		}
		return this;
	}
    static defaultSort(firstValue, secondValue) {
		return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1;
	}
    forEach(fn){
		for (const [key, val] of this) {
			fn(val, key, this)
		}
        return this
    }
    hasAny(keys){
        for(k in keys){
            if(this.has(k)) return true
        }
        return false
    }
    every(fn){
		for (const [key, val] of this) {
			if (!fn(val, key, this)) return false;
		}
		return true;
    }
    hasEvery(keys){
        for(k in keys){
            if(this.has(k)) return false
        }
        return true
    }
    first(amount) {
		if (typeof amount === 'undefined') return this.values().next().value;
		if (amount < 0) return this.last(amount * -1);
		amount = Math.min(this.size, amount);
		const iter = this.values();
		return Array.from({ length: amount }, () => iter.next().value);
	}
    at(index) {
		const arr = [...this.values()];
		return arr.at(index);
	}
    random(amount) {
		const arr = [...this.values()];
		if (typeof amount === 'undefined') return arr[Math.floor(Math.random() * arr.length)];
		if (!arr.length || !amount) return [];
		return Array.from(
			{ length: Math.min(amount, arr.length) },
			() => arr.splice(Math.floor(Math.random() * arr.length), 1)[0],
		);
	}
    randomKey(amount) {
		const arr = [...this.keys()];
		if (typeof amount === 'undefined') return arr[Math.floor(Math.random() * arr.length)];
		if (!arr.length || !amount) return [];
		return Array.from(
			{ length: Math.min(amount, arr.length) },
			() => arr.splice(Math.floor(Math.random() * arr.length), 1)[0],
		);
	}
    reverse() {
		const entries = [...this.entries()].reverse();
		this.clear();
		for (const [key, value] of entries) this.set(key, value);
		return this;
	}
    sweep(fn) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const previousSize = this.size;
		for (const [key, val] of this) {
			if (fn(val, key, this)) this.delete(key);
		}
		return previousSize - this.size;
	}
    toJSON() {
		return [...this.values()];
	}
}
module.exports = Collection