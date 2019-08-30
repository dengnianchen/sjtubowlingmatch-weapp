
/**
 * @property {Object[]}   keys
 */
class SimpleMap {
	
	constructor(array, key_name) {
		let key_func = (key_name instanceof Function)
			? key_name
			: function(item) { return item[key_name]; };
		this.keys = [];
		for (let item of array) {
			let key = key_func(item);
			this.keys.push(key);
			this[key] = item;
		}
	}
	
	/**
	 *
	 * @return {Array}
	 */
	toArray() {
		let r = [];
		for (let key of this.keys)
			r.push(this[key]);
		return r;
	}
	
}

module.exports = SimpleMap;