
/**
 * @property {Object[]}   keys
 */
class SimpleMap {
	
	constructor(array, key_name) {
		this.keys = [];
		for (let item of array) {
			this.keys.push(item[key_name]);
			this[item[key_name]] = item;
		}
	}
	
}

module.exports = SimpleMap;