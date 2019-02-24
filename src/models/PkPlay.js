const User = require('./User');
const Player = require('./Player');
const Play = require('./Play');
const Game = require('./Game');

class PkPlay {
	
	/**
	 * 通过继承段位加入PK赛
	 *
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
	static async joinByInitPlay(games, play_date, judge) {
		if (judge instanceof User)
			judge = judge.id;
		return await $.Http.request(`POST /pk/join`, {
			games, play_date, judge_id: judge
		}, {}, [ Player, Play ]);
	}
}

module.exports = PkPlay;