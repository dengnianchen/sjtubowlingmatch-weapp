class Play extends $.Model {
	
	constructor(data = null) {
		super(data);
	}
	
	static async judgeByMe() {
		return await $.Http.request('/play/judge-by-me');
	}
	
	/**
	 * 裁判确认指定比赛场次（接受或拒绝）
	 *
	 * @param {Event}       e       submit事件
	 * @param {Play|number} play    指定比赛场次
	 * @param {boolean}     accept  接受或拒绝
	 * @return {Promise<void>}
	 */
	static async judgeConfirm(e, play, accept) {
		play = $.Model.id(play);
		await $.Http.submit(e, `POST /play/${play}/judge-confirm/${accept}`);
	}

}

module.exports = Play;