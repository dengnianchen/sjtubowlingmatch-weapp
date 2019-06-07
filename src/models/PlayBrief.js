import SimpleMap from '../util/SimpleMap.js';

/**
 * @property {Number}       id
 * @property {String}       match
 * @property {String}       type
 * @property {String}       status
 * @property {String}       play_date
 * @property {Match}        match_info
 * @property {SimpleMap}    participants    player_id => participant
 */
class PlayBrief extends $.Model {
	
	constructor(data = null) {
		super(data);
		this.match_info = $.AppData.matches[this.match];
		this.participants = new SimpleMap (this.participants, 'player_id');
	}
	
}

module.exports = PlayBrief;