import ShopItem from './Shop';

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
class OwnedItem extends $.Model {
	
	constructor(data = null) {
		super(data, {
			item: ShopItem
		});
		var currentTime = Date.now();
		var targetTime = (new Date(this.expire_time)).getTime();
		this.time_left = targetTime - currentTime;
		var offsetDays = Math.floor(this.time_left / (3600 * 24 * 1000));
		var offsetTimeInDay = this.time_left - offsetDays * 3600 * 24 * 1000;
		var offsetHours = Math.floor(offsetTimeInDay / (3600 * 1000));
		var offsetMinutes = Math.floor(offsetTimeInDay % (3600 * 1000) / 60000);
		this.str_time_left = (offsetDays > 0 ? `${offsetDays}天` : '') +
			(offsetDays > 0 || offsetHours > 0 ? `${offsetHours}小时`  : '') +
			`${offsetMinutes}分钟`;
	}
	
	static async list(match, includeAll) {
		return await $.Http.request(`/${$.Model.id(match)}/shop/own_items${includeAll ? '/all' : ''}`, {}, {}, OwnedItem);
	}
	
	async use(e, data) {
		return await $.Http.submit(e, `POST /${this.item.match}/shop/use/${this.id}`, data);
	}
	
}

module.exports = OwnedItem;