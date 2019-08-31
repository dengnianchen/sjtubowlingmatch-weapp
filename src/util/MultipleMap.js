
/**
 * @property {Object[]}   keys
 */
class MultipleMap {
	
	constructor(array, key_name) {
		let key_func = (key_name instanceof Function)
			? key_name
			: function(item) { return item[key_name]; };
		for (let index in array) {
			if (!array.hasOwnProperty(index))
				continue;
			let key = key_func(array[index]);
			if (!this[key])
				this[key] = [];
			this[key].push(array[index]);
		}
	}
	
}

module.exports = MultipleMap;