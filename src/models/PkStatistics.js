
/**
 */
class PkStatistics extends $.Model {
	
	/**
	 *
	 * @param {Player} player
	 * @param {Object} condition
	 * @return {Promise<void>}
	 */
	static async getStat(player, condition = null) {
		if (condition)
			return await $.Http.request(
				`/${player.match}/player/${player.id}/statistics`,
				{ condition });
		else
			return await $.Http.request(
				`/${player.match}/player/${player.id}/statistics`);
	}
	
}

module.exports = PkStatistics;