const Match = require('./Match');
const User = require('./User');
const Game = require('./Game');
import PlayerItemEffect from './PlayerItemEffect';

/**
 * @property {number}   id
 * @property {number}   user_id         所属用户ID
 * @property {string}   match           所属比赛
 * @property {Object}   state           状态
 * @property {boolean}  state_confirmed 状态是否确认
 * @property {number}   plays           参与比赛场次数
 * @property {boolean}  holdon          是否处于挂机状态
 * @property {string}   create_time     创建时间
 * @property {string}   update_time     更新时间
 * @property {string}   name            选手姓名
 * @property {number}   gender          选手性别
 * @property {string}   avatar          选手头像
 * @property {Object}   effects         选手当前生效的效果
 */
class Player extends $.Model {
	
	constructor(data = null) {
		super(data, {
			user: User,
			effects: {
				'*': PlayerItemEffect
			}
		});
		this.nick = this.effects && this.effects.Nick ?
			this.effects.Nick.detail.nickname :
			null;
	}
	
	/**
	 * 获取关联的赛事信息
	 *
	 * @return {Match}
	 * @author Deng Nianchen
	 */
	get match_info() {
		return Match.get(this.match);
	}
	
	/**
	 * 为当前用户在指定赛事中创建选手信息。
	 *
	 * @param {string|Match}    match   指定赛事
	 * @return {Promise<number>}    新创建的选手ID
	 * @author Deng Nianchen
	 */
	static async create(match) {
		match = $.Model.id(match);
		return await $.Http.request(`PUT /${match}/player`);
	}
	
	/**
	 * 获取指定用户在指定赛事中的选手信息。
	 *
	 * @param {string|Match}    match   指定赛事
	 * @param {number|User}     user    指定用户
	 * @returns {Promise<Player>} 选手信息
	 * @author Deng Nianchen
	 */
	static async getInMatch(match, user) {
		if (!match || !user)
			throw $.Err.FAIL('参数不能为空');
		match = $.Model.id(match);
		user =  $.Model.id(user);
		return await $.Http.request(`/${match}/player/uid/${user}`, {}, {}, Player);
	}
	
	/**
	 * 获取所有参加指定赛事的选手
	 *
	 * @param {string|Match}    match   指定赛事
	 * @return {Promise<Player[]>}
	 * @author Deng Nianchen
	 */
	static async getPlayers(match) {
		match = $.Model.id(match);
		return await $.Http.request(`/${match}/player`, {}, {}, Player);
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

module.exports = Player;