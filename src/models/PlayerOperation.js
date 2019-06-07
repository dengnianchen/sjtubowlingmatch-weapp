import Player from './Player';

/**
 * @property    {number}  id
 * @property    {number}  player_id      关联选手ID
 * @property    {array}   state0         操作前状态
 * @property    {array}   state1         [获取器]操作后的状态
 * @property    {boolean} valid          操作是否有效 / NULL表示未知
 * @property    {string}  create_time    创建时间
 * @property    {string}  update_time    更新时间
 * @property    {Player}  player         [关联]选手信息
 */
class PlayerOperation extends $.Model {
	
	constructor (data = null, typeDesc = null) {
		super(data, $.extend({
			player: Player
		}, typeDesc));
	}
	
}

module.exports = PlayerOperation;