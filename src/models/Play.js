import PlayerParticipate from './PlayerParticipate';
import User from './User';
import Game from './Game';
import PlayBrief from './PlayBrief';

/**
 * @property    {number}                id
 * @property    {string}                match           赛事名称
 * @property    {string}                type            比赛类型
 * @property    {string}                status          比赛状态（new:未登记, filled:已登记, player_accepted：选手已接受，accepted: 已接受，player_refused：被选手拒绝，refused：被裁判拒绝）
 * @property    {string}                play_date       比赛日期
 * @property    {number}                judge_id        裁判ID
 * @property    {string}                create_time     创建时间
 * @property    {string}                update_time     更新时间
 * @property    {User}                  judge           [关联]裁判
 * @property    {PlayerParticipate[]}   participants    [关联]参与方
 * @property    {Game[]}                games           [关联]比赛球局
 *
 */
class Play extends $.Model {
	
	constructor(data = null) {
		super(data, {
			judge: User,
			participants: PlayerParticipate,
			games: Game
		});
		this.match_info = $.AppData.matches[this.match];
		this.status_names = {
			'new': '待录入',
			'filled': '等待参赛选手确认',
			'player_accepted': '等待裁判确认',
			'accepted': '已确认',
			'player_refused': '被参赛选手拒绝',
			'refused': '被裁判拒绝'
		};
		let participants = {};
		this.player_ids = [];
		for (let participant of this.participants) {
			this.player_ids.push(participant.player.id);
			participants[participant.player.id] = participant;
		}
		this.participants = participants;
	}
	
	/**
	 * 根据赛事和ID获取比赛信息。
	 *
	 * @param {String|Match}    match   赛事
	 * @param {number}          id      比赛ID
	 *
	 * @returns {Promise<Play>}
	 * @author Deng Nianchen
	 */
	static async getPlay(match, id) {
		return await $.Http.request(`/${$.Model.id(match)}/play/${id}`, {}, {},
			Play);
	}
	
	/**
	 * 获取当前用户在指定赛事中所有裁判的比赛。
	 *
	 * @param {String|Match}    match   赛事
	 *
	 * @return {Promise<PlayBrief>}
	 */
	static async judgeByMe(match) {
		return await $.Http.request(`/${$.Model.id(match)}/play/judge-by-me`,
			{}, {}, PlayBrief);
	}
	
	/**
	 * 获取指定赛事的有效比赛，可以指定筛选条件。
	 *
	 * @param {String|Match}    match   赛事
	 * @param {Object}          filters （可选）筛选条件，目前支持from_week, to_week, play_by
	 *
	 * @return {Promise<PlayBrief[]>}
	 * @author Deng Nianchen
	 */
	static async getPlays(match, filters = null) {
		let params = filters || {};
		return await $.Http.request(`/${$.Model.id(match)}/play`, params, {},
			PlayBrief);
	}
	
	/**
	 * 裁判确认指定比赛场次（接受或拒绝）
	 *
	 * @param {String|Match}    match   赛事
	 * @param {Play|number}     play    指定比赛场次
	 * @param {boolean|string}  accept  接受或拒绝
	 * @param {Event}           e       submit事件
	 *
	 * @return {Promise<number>}
	 * @author Deng Nianchen
	 */
	static async judgeConfirm(match, play, accept, e) {
		await $.Http.submit(e, `POST /${$.Model.id(match)}/play/${$.Model.id(play)}/judge-confirm/${accept}`);
	}
	
	/**
	 * 选手确认指定比赛场次（接受或拒绝）
	 *
	 * @param {String|Match}    match   赛事
	 * @param {Play|number}     play    指定比赛场次
	 * @param {boolean|string}  accept  接受或拒绝
	 * @param {Event}           e       submit事件
	 *
	 * @return {Promise<number>}
	 * @author Deng Nianchen
	 */
	static async playerConfirm(match, play, accept, e) {
		await $.Http.submit(e, `POST /${$.Model.id(match)}/play/${$.Model.id(play)}/player-confirm/${accept}`);
	}
	
}

/**
 * 比赛状态：未登记
 */
Play.S_NEW = 'new';
/**
 * 比赛状态：已登记未被双方选手确认
 */
Play.S_FILLED = 'filled';
/**
 * 比赛状态：双方选手已确认，有待裁判确认
 */
Play.S_PLAYER_ACCEPTED = 'player_accepted';
/**
 * 比赛状态：裁判已确认
 */
Play.S_ACCEPTED = 'accepted';
/**
 * 比赛状态：被选手拒绝
 */
Play.S_PLAYER_REFUSED = 'player_refused';
/**
 * 比赛状态：被裁判拒绝
 */
Play.S_REFUSED = 'refused';


module.exports = Play;