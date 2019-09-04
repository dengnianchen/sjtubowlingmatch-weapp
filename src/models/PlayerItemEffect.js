import Item from './Item';

/**
 * @property {number}   id
 * @property {number}   player_id   关联选手ID
 * @property {Object}   state0      操作前状态
 * @property {Object}   state1      操作后的状态
 * @property {boolean}  valid       操作是否有效 / NULL表示未知
 * @property {number}   item_id     关联道具ID
 * @property {string}   item_name   关联道具名称
 * @property {number}   buy_id      关联购买记录ID
 * @property {Object}   detail      详情
 * @property {string}   create_time 创建时间
 * @property {string}   expire_time 更新时间
 * @property {number}   till_plays  有效场次
 */
class PlayerItemEffect extends $.Model {
	
	constructor(data = null) {
		super(data);
		this.item_name = this.item.item_name;
	}
	
	/**
	 * 获取关联的道具信息
	 *
	 * @return {Item}
	 * @author Deng Nianchen
	 */
	get item() {
		return Item.get(this.item_id);
	}
	
}

module.exports = PlayerItemEffect;