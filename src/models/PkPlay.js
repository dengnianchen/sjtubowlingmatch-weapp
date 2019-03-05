import User from './User';
import UserBrief from './UserBrief';
import Player from './Player';
import Play from './Play';
import Game from './Game';

class PkPlay extends $.Model {
	
	/**
	 * 段位表信息
	 *
	 * @return {*[]}
	 */
	static get rankTable() {
		return [
			{ "name": "Open",   "rank_score": 90,  "base_score": 90,  "max_stars": 3 },
			{ "name": "Spare",  "rank_score": 120, "base_score": 120, "max_stars": 3 },
			{ "name": "Strike", "rank_score": 150, "base_score": 150, "max_stars": 4 },
			{ "name": "Turkey", "rank_score": 175, "base_score": 175, "max_stars": 10 },
			{ "name": "Bagger", "rank_score": 500, "base_score": 175, "max_stars": 1000000 }
		];
	}
	
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
	 * 获取所有参加PK赛的选手
	 *
	 * @return {Promise<Player[]>}
	 * @author Deng Nianchen
	 */
	static async getPlayers() {
		return await $.Http.request('/pk/players', {}, {}, Player);
	}
	
}

module.exports = PkPlay;