import PlayerBuy from './PlayerBuy';

/**
 * @property        {Number}    id
 * @property        {String}    item_name       名称
 * @property        {String}    description     描述
 * @property        {String}    identifier      标识符
 * @property        {String}    match           所属赛事
 * @property        {Array}     detail          详情（内含字段与具体赛事有关）
 * @property-read   {String}    create_time     创建时间（框架自动生成）
 * @property-read   {String}    update_time     更新时间（框架自动生成）
 * @property        {Object}    violates        违背哪几条限制条件（若没有违背则为空）
 * @property-read   {Boolean}   affordable      是否有足够资源兑换
 */
class ShopItem extends $.Model {
	
	constructor(data = null) {
		super(data);
		if (this.violates !== undefined) {
			let violates = {};
			for (let violateIndex of this.violates)
				violates[violateIndex] = this.detail.buy_constraints[violateIndex];
			this.violates = violates;
		}
	}
	
	/**
	 *
	 * @param match
	 * @return {Promise<ShopItem[]>}
	 */
	static async listAll(match) {
		return await $.Http.request(`/${$.Model.id(match)}/shop`, {}, {}, ShopItem);
	}
	
	static async loadOwned(includeAll) {
		return await $.Http.request(`/${$.Model.id(match)}/shop/own_items`, {}, {});
	}
	
	async buy(e) {
		return await $.Http.submit(e, `POST /${this.match}/shop/buy/${this.identifier}`, {}, {}, PlayerBuy);
	}
	
}

module.exports = ShopItem;