import Match from './Match';
import User from './User';
import PlayerBrief from './PlayerBrief';

/**
 * @property {number}   id
 * @property {number}   user_id             所属用户ID
 * @property {string}   name                选手姓名
 * @property {number}   gender              选手性别
 * @property {string}   avatar              选手头像
 * @property {string}   match               所属比赛
 * @property {object}   detail_info         详情（内容与具体比赛有关）
 * @property {boolean}  detail_confirmed    详情是否确认
 * @property {string}   status              参与状态
 * @property {number}   plays               参与比赛场次数
 * @property {string}   create_time         创建时间
 * @property {string}   update_time         更新时间
 */
class Player extends $.Model {
	
	/**
	 * 根据指定筛选条件获取的选手信息，筛选条件包括：ID列表/状态，若未指定状态
	 * 筛选，则默认为筛选“参赛中”的选手
	 *
	 * @param {string|Match}    match   指定赛事
	 * @param {number|number[]} ids     选手ID列表
	 * @param {string[]}        status  指定状态筛选条件，默认为筛选“参赛中”的选手
	 *
	 * @returns {Promise<PlayerBrief[]>} 选手信息
	 * @author Deng Nianchen
	 */
	static async getPlayers(match, ids = null, status = null) {
		if (!match)
			throw $.Err.FAIL('参数不能为空');
		let params = {};
		if (ids)
			params.ids = ids;
		if (status)
			params.status = status;
		return await $.Http.request(`/${$.Model.id(match)}/player`,
			params, {}, PlayerBrief);
	}
	
	/**
	 * 获取指定用户的选手
	 *
	 * @param {Match|string}    match
	 * @param {User|number}     user
	 * @param {boolean}         brief
	 *
	 * @returns {Promise<Player|PlayerBrief>}
	 * @author Deng Nianchen
	 */
	static async getPlayerByUser(match, user, brief = false) {
		return await $.Http.request(
			`/${$.Model.id(match)}/player/uid/${$.Model.id(user)}`,
			{ brief }, {}, brief ? PlayerBrief : Player);
	}
	
	/**
	 * 获取指定ID的选手
	 *
	 * @param {Match|string}    match
	 * @param {number}          id
	 * @param {boolean}         brief
	 *
	 * @returns {Promise<Player|PlayerBrief>}
	 * @author Deng Nianchen
	 */
	static async getPlayer(match, id, brief = false) {
		return await $.Http.request(`/${$.Model.id(match)}/player/${id}`,
			{ brief }, {}, brief ? PlayerBrief : Player);
	}
	
}

Player.S_NEW = 'new';
Player.S_NORMAL = 'normal';
Player.S_QUIT = 'quit';

module.exports = Player;