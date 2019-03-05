
/**
 *
 */
class PlayBrief extends $.Model {
	
	constructor(data = null) {
		super(data);
		this.match_info = $.AppData.matches[this.match];
		let participants = {};
		this.player_ids = [];
		for (let participant of this.participants) {
			this.player_ids.push(participant.player_id);
			participants[participant.player_id] = participant;
		}
		this.participants = participants;
	}
	
}

module.exports = PlayBrief;