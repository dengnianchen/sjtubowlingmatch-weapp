const Match = require('./Match');
const User = require('./User');
const Game = require('./Game');

/**
 * @property {number}   id
 * @property {number}   user_id     所属用户ID
 * @property {string}   match       所属比赛
 * @property {object}   detail      详情（内容与具体比赛有关）
 * @property {boolean}  detail_confirmed 详情是否确认
 * @property {string}   create_time 创建时间
 * @property {string}   update_time 更新时间
 */
class Player extends $.Model {
	
	constructor(data = null) {
		super(data, {
			user: User
		});
	}
	
	/**
	 * 获取指定用户在指定赛事中的选手信息。
	 *
	 * @param {string|Match}                match   指定赛事
	 * @param {number|User|User[]|number[]} user    指定用户（可以数组形式指定多个用户）
	 * @returns {Promise<Player>|Promise<Player[]>} 选手信息
	 * @author Deng Nianchen
	 */
	static async getInMatch(match, user) {
		if (!match || !user)
			throw $.Err.FAIL('参数不能为空');
		match = $.Model.id(match);
		let uids;
		if (user instanceof Array)
			uids = user.map(value => $.Model.id(value));
		else
			uids = [ $.Model.id(user) ];
		let players = await $.Http.request(`/${match}/player`,
			{ uids }, {}, Player);
		if (user instanceof Array)
			return players;
		return players[0];
	}
	
	/**
	 * 获取指定ID的选手
	 *
	 * @param {number|number[]}  id
	 * @returns {Promise<Player>}
	 * @author Deng Nianchen
	 */
	static async get(id) {
		if (id instanceof Array)
			return await $.Http.request(`/player`, { ids: id }, {}, Player);
		else
			return await $.Http.request(`/player/${id}`, {}, {}, Player);
	}
	
}

Player.S_NEW = 'new';
Player.S_NORMAL = 'normal';
Player.S_QUIT = 'quit';

module.exports = Player;