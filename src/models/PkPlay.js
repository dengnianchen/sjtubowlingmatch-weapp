import User from './User';
import UserBrief from './UserBrief';
import Game from './Game';



class PkPlay extends $.Model {
	
	/**
	 * 加分信息
	 *
	 * @return {number}
	 * @author Deng Nianchen
	 */
	static get bonus() {
		return 15;
	}
	
	static async calcInherit() {
		return await $.Http.request('/pk/calc-inherit');
	}
	
	/**
	 * 通过继承段位加入PK赛
	 
	 * @returns {Promise<number>}
	 * @author Deng Nianchen
	 */
	static async joinByInherit() {
		return await $.Http.request(`POST /pk/join-inherit`);
	}
	
	/**
	 * 全新加入赛事，不包含任何状态
	 *
	 * @returns {Promise<number>}
	 * @author Deng Nianchen
	 */
	static async joinNew() {
		return await $.Http.request('POST /pk/join-new');
	}
	
	/**
	 * 登记一场比赛
	 *
	 * @param {string}                  type
	 * @param {Game[]}                  games
	 * @param {User|UserBrief|number}   judge
	 * @returns {Promise<number>}
	 * @author Deng Nianchen
	 */
	static async play(type, games, judge) {
		return await $.Http.request(`POST /pk/play-${type}`, {
			type,
			games,
			judge_id: $.Model.id(judge)
		});
	}
	
	/**
	 * 获取周榜单。
	 *
	 * @param {Number}  week    （可选）统计周次，默认为当前周
	 * @return {Promise<Object>}
	 * @author Deng Nianchen
	 */
	static async getWeeklyList(week = null) {
		if (week)
			return await $.Http.request('/pk/weekly-list', { week });
		else
			return await $.Http.request('/pk/weekly-list');
	}
}

module.exports = PkPlay;