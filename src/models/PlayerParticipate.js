import PlayerOperation from './PlayerOperation';
import Play from './Play';

/**
 * @property        {number}  id
 * @property        {number}  play_id        所参与的比赛场次ID
 * @property        {string}  result         参与结果（含义视具体比赛而定）
 * @property        {array}   detail         参与详情
 * @property        {boolean} accept         是否确认所参与比赛的登记结果，Null表示未操作
 * @property-read   {Play}    play           [关联]所参与的比赛场次信息
 */
class PlayerParticipate extends PlayerOperation {

	constructor(data = null) {
		super(data, {
			play: Play
		});
	}
}

module.exports = PlayerParticipate;