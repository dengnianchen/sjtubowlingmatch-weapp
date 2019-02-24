const User = require('./User');
const Player = require('./Player');
const Play = require('./Play');
const Game = require('./Game');

class PkPlay extends $.Model {
	
	/**
	 * 段位表信息
	 *
	 * @return {*[]}
	 */
	static get rankTable() {
		return [
			{ 'name': 'Open',   'rank_score': 90,  'base_score': 90,  'max_stars': 3 },
			{ 'name': 'Spare',  'rank_score': 120, 'base_score': 120, 'max_stars': 3 },
			{ 'name': 'Strike', 'rank_score': 150, 'base_score': 150, 'max_stars': 4 },
			{ 'name': 'Turkey', 'rank_score': 175, 'base_score': 175, 'max_stars': 10 },
			{ 'name': 'Bagger', 'rank_score': 500, 'base_score': 175, 'max_stars': 1000000 }
		];
	}
	
	/**
	 * 加分信息
	 *
	 * @return {number}
	 */
	static get bonus() {
		return 15;
	}
	
	/**
	 * 通过继承段位加入PK赛
	 
	 * @returns {Promise<Player>}
	 */
	static async joinByInherit() {
		return await $.Http.request(`POST /pk/join-inherit`, {}, {}, Player);
	}
	
	/**
	 *
	 * @param {Game[]}      games
	 * @param {string}      play_date
	 * @param {User|number} judge
	 * @returns {Promise<Player, Play>}
	 */
	static async joinByInitPlay(games, playDate, judge) {
		if (judge instanceof User)
			judge = judge.id;
		return await $.Http.request(`POST /pk/join`, {
			games,
			play_date: playDate,
			judge_id: judge
		}, {}, [ Player, Play ]);
	}
}

module.exports = PkPlay;