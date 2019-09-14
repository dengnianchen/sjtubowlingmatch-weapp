import PlayerOperation from './PlayerOperation';
import Item from './Item';

/**
 * @property {number}   id
 * @property {number}   item_id     兑换的道具ID
 * @property {string}   create_time 兑换时间
 * @property {Item}     item        关联的道具信息
 */
class PlayerBuy extends PlayerOperation {
	
	constructor(data = null) {
		super(data);
		this.item = Item.get(this.item_id);
	}
	
}

module.exports = PlayerBuy;