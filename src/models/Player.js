const Match = require('./Match');
const User = require('./User');
const Game = require('./Game');

/**
 * @property {number}   id
 * @property {number}   user_id     所属用户ID
 * @property {string}   match       所属比赛
 * @property {object}   detail      详情（内容与具体比赛有关）
 * @property {string}   create_time 创建时间
 * @property {string}   update_time 更新时间
 */
class Player extends $.Model {
	
	constructor(data = null) {
		super(data);
	}
	
	/**
	 * 获取指定用户在指定赛事中的选手信息。
	 *
	 * @param {string|Match}    match   指定赛事
	 * @param {number|User}     user    指定用户
	 * @returns {Promise<Player>}   选手信息
	 */
	static async getInMatch(match, user) {
		if (!match || !user)
			return null;
		if (match instanceof Match)
			match = match.id;
		if (user instanceof User)
			user = user.id;
		return await $.Http.request(`/${match}/player/${user}`, {}, {}, Player);
	}
	
}

module.exports = Player;