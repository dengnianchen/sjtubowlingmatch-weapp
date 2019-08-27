import Match from './Match';

/**
 * @author Deng Nianchen
 */
class MatchList extends $.Model {
	
	/**
	 *
	 * @param {Match[]} matches
	 */
	constructor(matches) {
		super();
		for (let match of matches) {
			if (!this[match.category])
				this[match.category] = [];
			this[match.category].push(match);
			this[match.id] = match;
		}
	}
	
	static async getList() {
		let matches = await $.Http.request('/match', {}, {}, Match);
		return new MatchList(matches);
	}
	
}

module.exports = MatchList;