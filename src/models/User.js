import UserBrief from './UserBrief';

const md5 = require('md5');

/**
 * User类用以表示一名用户
 *
 * @property {number}       id
 * @property {string}       name                选手姓名
 * @property {boolean}      is_init_password    是否是初始密码
 * @property {string}       avatar              头像
 * @property {string}       create_time         创建时间
 * @property {string}       update_time         更新时间
 * @author Deng Nianchen
 */
class User extends $.Model {
	
	constructor(data = null) {
		super(data);
	}
	
	/**
	 * 修改密码
	 *
	 * @param {string}    $password
	 * @returns {Promise<void>}
	 */
	async changePassword($password) {
		return await $.Http.request('PUT /user/password', {
			password: md5($password)
		});
	}
	
	/**
	 * 获取当前登陆的选手信息
	 *
	 * @returns {User}
	 * @author Deng Nianchen
	 */
	static get current() {
		let data = $.Session.get('user');
		if (!data || data instanceof User)
			return data;
		User.current = data = new User(data);
		return data;
	}
	
	/**
	 * 设置当前登陆的选手信息
	 *
	 * @param {User} user 选手信息
	 * @author Deng Nianchen
	 */
	static set current(user) {
		$.Session.set('user', user);
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
		User.current = await $.Http.request('PUT /user/bind', {
			name,
			password: md5(password)
		}, {}, User);
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
		User.current = await $.Http.request('POST /user', {
			name,
			password: md5(password),
			gender
		}, {}, User);
	}
	
	static async getAll() {
		return await $.Http.request('/user', {}, {}, UserBrief);
	}
	
}

module.exports = User;