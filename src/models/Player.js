const Match = require('./Match');
const User = require('./User');

class Player {
	
	constructor(data) {
		$(this).extend(data);
	}
	
	/**
	 * 获取指定用户在指定赛事中的选手信息。
	 *
	 * @param {string|Match}    match   指定赛事
	 * @param {number|User}     user    指定用户
	 * @returns {Promise<Player>}   选手信息
	 */
	static async getInMatch(match, user) {
		if (match instanceof Match)
			match = match.season;
		if (user instanceof User)
			user = user.id;
		return await $.Http.request(`/${match}/player/${user}`, {}, {}, Player);
	}
	
}

module.exports = Player;