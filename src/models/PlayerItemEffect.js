import Item from './Item';

/**
 * @property {number}   id
 * @property {number}   player_id   关联选手ID
 * @property {Object}   state0      操作前状态
 * @property {Object}   state1      操作后的状态
 * @property {boolean}  valid       操作是否有效 / NULL表示未知
 * @property {number}   item_id     关联道具ID
 * @property {number}   buy_id      关联购买记录ID
 * @property {Object}   detail      详情
 * @property {string}   create_time 创建时间
 * @property {string}   expire_time 更新时间
 * @property {number}   till_plays  有效场次
 */
class PlayerItemEffect extends $.Model {
	
	get item() {
		Item.get(this.item_id);
	}
	
}

module.exports = PlayerItemEffect;