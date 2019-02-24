/**
 * @property {number}   id
 * @property {string}   category       赛事大类
 * @property {string}   season         赛季
 * @property {string}   start_time     开始时间
 * @property {string}   end_time       结束时间
 * @property {boolean}  active         是否激活
 * @property {object}   detail         详情
 * @property {string}   create_time    创建时间
 * @property {string}   update_time    更新时间
 */
class Match {
	
	constructor(data) {
		$(this).extend(data);
	}
	
	static async getAll(category) {
		return await $.Http.request(`/${category}/all-seasons`, {}, {}, Match);
	}
	static async get(match) {
		return await $.Http.request(`/${match}`, {}, {}, Match);
	}
}

module.exports = Match;