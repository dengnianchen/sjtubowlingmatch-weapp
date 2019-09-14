import PlayerBuy from './PlayerBuy';

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
	
	static async buy(e, item, target_id = null, params = null) {
		let data = {};
		if (target_id) data['target_id'] = target_id;
		if (params) data['data'] = params;
		return await $.Http.submit(e, `POST /${item.match}/shop/buy/${item.identifier}`, data);
	}
	
	static async listBuyRecord(match) {
		return await $.Http.request(`/${$.Model.id(match)}/shop/buy_record`, {}, {}, PlayerBuy);
	}
	
}

module.exports = Shop;