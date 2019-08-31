import SimpleMap from '../util/SimpleMap.js';
import Match from './Match';

/**
 * @property {Number}       id
 * @property {String}       match
 * @property {String}       type
 * @property {String}       status
 * @property {String}       play_date
 * @property {SimpleMap}    participants    player_id => participant
 */
class PlayBrief extends $.Model {
	
	constructor(data = null) {
		super(data);
		this.participants = new SimpleMap (this.participants, function(item) { return item.player.id; });
	}
	
	get match_info() {
		return Match.get(this.match);
	}
	
}

module.exports = PlayBrief;