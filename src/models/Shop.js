/**
 *
 */
class Shop extends $.Model {
	
	/**
	 *
	 * @param match
	 * @return {Promise<Object>}
	 */
	static async buyCheck(match) {
		return await $.Http.request(`/${$.Model.id(match)}/shop/buy_check`);
	}
	
	static async loadOwned(includeAll) {
		return await $.Http.request(`/${$.Model.id(match)}/shop/own_items`);
	}
	
	static async buy(e, item) {
		return await $.Http.submit(e, `POST /${item.match}/shop/buy/${item.identifier}`);
	}
	
}

module.exports = Shop;