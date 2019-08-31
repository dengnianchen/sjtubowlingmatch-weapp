
/**
 * @property {Object[]}   keys
 */
class SimpleMap {
	
	constructor(array, key_name) {
		let key_func = (key_name instanceof Function)
			? key_name
			: function(item) { return item[key_name]; };
		this.keys = [];
		for (let index in array) {
			if (!array.hasOwnProperty(index))
				continue;
			let key = key_func(array[index]);
			this.keys.push(key);
			this[key] = array[index];
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