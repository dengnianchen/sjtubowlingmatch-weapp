
/**
 */
class PkStatistics extends $.Model {
	
	/**
	 *
	 * @param {Player} player
	 * @return {Promise<void>}
	 */
	static async getBasic(player) {
		return await $.Http.request(
			`/${player.match}/player/${player.id}/statistics/basic`);
	}
	
	/**
	 *
	 * @param {Player} player
	 * @param {Object} condition
	 * @return {Promise<void>}
	 */
	static async getPlay(player, condition = null) {
		if (condition)
			return await $.Http.request(
				`/${player.match}/player/${player.id}/statistics/play`,
				{ condition });
		else
			return await $.Http.request(
				`/${player.match}/player/${player.id}/statistics/play`);
	}
	
}

module.exports = PkStatistics;