
/**
 * @property {Object[]}   keys
 */
class MultipleMap {
	
	constructor(array, key_name) {
		let key_func = (key_name instanceof Function)
			? key_name
			: function(item) { return item[key_name]; };
		for (let item of array) {
			let key = key_func(item);
			if (!this[key])
				this[key] = [];
			this[key].push(item);
		}
	}
	
}

module.exports = MultipleMap;