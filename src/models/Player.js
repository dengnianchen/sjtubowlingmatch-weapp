const md5 = require('md5');

/**
 * Player类用以表示一名选手（也可以认为是本系统的用户）
 *
 * @property {number}       id
 * @property {string}       name            选手姓名
 * @property {Array<Game>}  games           该选手打过的球局情况
 * @property {string}       create_time     创建时间
 * @property {string}       update_time     更新时间
 * @property {string}       last_visit_time （来自wx_session）上次访问时间
 * @property {wx.UserInfo}  wx_info         （来自wx_session）微信号相关信息
 * @author Deng Nianchen
 */
class Player {
	
	constructor(data) {
		$(this).extend(data);
	}
	
	/**
	 * 获取当前登陆的选手信息
	 *
	 * @returns {Player}
	 * @author Deng Nianchen
	 */
	static get current() {
		let data = $.Session.get('player');
		if (!data || data instanceof Player)
			return data;
		Player.current = data = new Player(data);
		return data;
	}
	
	/**
	 * 设置当前登陆的选手信息
	 *
	 * @param {Player} player 选手信息
	 * @author Deng Nianchen
	 */
	static set current(player) {
		$.Session.set('player', player);
	}
	
	/**
	 * 绑定现有选手账号到当前微信号
	 *
	 * @param {string}  name        账号名称
	 * @param {string}  password    账号密码
	 * @returns {Promise<void>}
	 * @author Deng Nianchen
	 */
	static async bind(name, password) {
		Player.current = await $.Http.request('PUT /player/bind', {
			name,
			password: md5(password)
		}, {}, Player);
	}
	
	/**
	 * 注册选手账号并绑定当前微信号
	 *
	 * @param {string}  name        选手姓名
	 * @param {string}  password    密码
	 * @param {number}  gender      性别
	 * @returns {Promise<void>}
	 * @author Deng Nianchen
	 */
	static async register(name, password, gender) {
		Player.current = await $.Http.request('POST /player', {
			name,
			password: md5(password),
			gender
		}, {}, Player);
	}
	
}

module.exports = Player;