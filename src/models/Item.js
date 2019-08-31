import SimpleMap from '../util/SimpleMap';
import Match from './Match';

/**
 * @property {Number}   id
 * @property {String}   item_name           名称
 * @property {String}   type                类型
 * @property {String}   description         描述
 * @property {String}   identifier          标识符
 * @property {String}   match               所属赛事
 * @property {Number}   version             版本号
 * @property {Boolean}  newest              是否最新
 * @property {Object}   detail              详情（内含字段与具体赛事有关）
 * @property {String}   item_create_time    创建时间
 *
 * @author Deng Nianchen
 */
class Item extends $.Model {
	
	/**
	 * 获取关联的赛事信息
	 *
	 * @return {Match}
	 * @author Deng Nianchen
	 */
	get match_info() {
		return Match.get(this.match);
	}
	
	static async loadAll() {
		let items = await $.Http.request('/item', {}, {}, Item);
		Item._items = new SimpleMap(items, 'id');
	}
	
	/**
	 *
	 * @param {Number|String} id
	 * @return {Item}
	 */
	static get(id) {
		return Item._items[id];
	}
	
	/**
	 * 获取指定赛事中最新的道具信息
	 *
	 * @param {Match|string}    match   赛事对象或名称
	 * @param {string|null}     type    （可选）道具类型，若不指定则获取 所有类型
	 *
	 * @return {Item[]}
	 * @author Deng Nianchen
	 */
	static getNewestOfMatch(match, type = null) {
		let r = {};
		for (let item of Item._items.toArray()) {
			if (item.match === $.Model.id(match) && item.newest &&
				(!type || item.type === type))
				r[item.identifier] = item;
		}
		return r;
	}
	
}

module.exports = Item;