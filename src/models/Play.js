/**
 * @property        {number}              id
 * @property        {string}              match          赛事名称
 * @property        {string}              type           比赛类型
 * @property        {string}              status         比赛状态（new:未登记, filled:已登记, player_accepted：选手已接受，accepted: 已接受，player_refused：被选手拒绝，refused：被裁判拒绝）
 * @property        {string}              play_date      比赛日期
 * @property        {number}              judge_id       裁判ID
 * @property        {string}              create_time    创建时间
 * @property        {string}              update_time    更新时间
 * @property-read   {User}                judge          [关联]裁判
 * @property-read   {PlayerParticipate[]} participants   [关联]参与方
 * @property-read   {Game[]}              games          [关联]比赛球局
 * @property-read   {Match}               match_info     [关联]赛事信息
 
 */
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

	static async getPlay(id) {
		return await $.Http.request(`/play/${id}`, {}, {}, Play);
	}
	
}

module.exports = Play;