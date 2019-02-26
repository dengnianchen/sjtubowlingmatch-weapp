class Play extends $.Model {
	
	constructor(data = null) {
		super(data);
	}
	
	static async judgeByMe() {
		return await $.Http.request('/play/judge-by-me');
	}
	
	static async judgeConfirm(e, play) {
		if (play instanceof Object)
			play = play.id;
		await $.Http.submit(e, `PUT /play/${play}/judge-confirm`);
	}
}

module.exports = Play;