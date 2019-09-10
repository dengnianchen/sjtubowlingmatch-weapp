import Item from './Item';

// detail: {
//   {identifier}: { // 成就项目标识符 => 详情
//     progress?: number // 当前进度
//     achieve_times?: string[] // 各等级成就的获得时间
//   }
// }
/**
 * @property {number}   id
 * @property {string}   identifier
 * @property {string}   name
 * @property {number}   level
 * @property {number}   progress
 * @property {number}   target
 * @property {number}   level_percent
 * @property {number}   progress_percent
 */
class AchieveBrief extends $.Model {
	
	/**
	 *
	 * @param {Item} achieve_item
	 * @param {{progress:Number,achieve_times:String[]}} achieve_detail
	 */
	constructor(achieve_item, achieve_detail) {
		super();
		
		this.id = achieve_item.id;
		this.identifier = achieve_item.identifier;
		this.name = achieve_item.item_name;
		if (!achieve_detail) {
			this.level = -1;
			this.progress = 0;
		} else {
			this.level = achieve_detail.achieve_times ?
				achieve_detail.achieve_times.length - 1 : -1;
			this.progress = achieve_detail.progress || 0;
		}
		this.target = achieve_item.detail['targets'][this.level + 1] || null;
		this.level_percent = (this.level + 1) / achieve_item.detail['targets'].length * 100;
		this.progress_percent = this.target ? this.progress / this.target * 100 : 100;
	}
	
}

/**
 * @property {string}   identifier
 * @property {string}   name
 * @property {number}   level
 * @property {number}   progress
 * @property {number}   target
 * @property {number}   level_percent
 * @property {number}   progress_percent
 * @property {string}   desc
 * @property {number}   points
 * @property {string}   target_desc
 * @property {number}   target_points
 */
class AchieveDetail extends $.Model {
	
	/**
	 *
	 * @param {AchieveBrief} achieve_brief
	 */
	constructor(achieve_brief) {
		super(achieve_brief);
		let achieve_item = Item.get(this.id);
		this.desc = this.level >= 0 ?
			achieve_item.description.replace('$', achieve_item.detail['targets'][this.level]) :
			null;
		this.points = this.level >= 0 ?
			achieve_item.detail['points'][this.level] :
			null;
		this.target_desc = this.target ?
			achieve_item.description.replace('$', achieve_item.detail['targets'][this.level + 1]) :
			null;
		this.target_points = this.target ?
			achieve_item.detail['points'][this.level + 1] :
			null;
	}
	
}

/**
 * @property        {number}  id
 * @property        {number}  points    成就积分
 * @property        {AchieveBrief[]}  detail  各成就项进度详情
 */
class PlayerAchieve extends $.Model {
	
	constructor(data = null) {
		super(data);
		let rawDetail = data['detail'];
		let achieveItems = Item.getNewestOfMatch(rawDetail['match'], 'achieve');
		this.detail = [];
		for (let identifier in achieveItems)
			this.detail.push(new AchieveBrief(achieveItems[identifier],
				rawDetail[identifier]));
		this.detail.sort(function (a, b) {
			if (a.level_percent > b.level_percent + 1e-3)
				return -1;
			if (a.level_percent < b.level_percent - 1e-3)
				return 1;
			if (a.progress_percent > b.progress_percent)
				return -1;
			if (a.progress_percent < b.progress_percent)
				return 1;
			return a.id - b.id;
		});
	}
	
	static async get(player) {
		return await $.Http.request(`/${player.match}/player/${$.Model.id(player)}/achieves`,
			{}, {}, PlayerAchieve);
	}
	
	/**
	 *
	 * @param {Number} index
	 *
	 * @return {AchieveDetail}
	 * @author Deng Nianchen
	 */
	getDetail(index) {
		return new AchieveDetail(this.detail[index]);
	}
}

module.exports = PlayerAchieve;