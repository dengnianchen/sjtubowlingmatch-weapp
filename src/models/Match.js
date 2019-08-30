import SimpleMap from '../util/SimpleMap';
import MultipleMap from '../util/MultipleMap';

/**
 * @property {string}   id
 * @property {string}   category        赛事大类
 * @property {string}   name            名称
 * @property {string}   start_date      开始时间
 * @property {string}   end_date        结束时间
 * @property {object}   detail          详情
 * @property {string}   create_time     创建时间
 * @property {string}   update_time     更新时间
 * @property {string}   status          状态（finished / active / coming）
 * @property {number}   week            周次
 * @property {number}   day_in_week     周内日期
 */
class Match extends $.Model {
	
	/**
	 *
	 * @return {boolean}
	 */
	get is_begin() {
		return this.week < this.detail.begin_weeks;
	}
	
	static async loadAll() {
		let matches = await $.Http.request('/match', {}, {}, Match);
		Match._matchesCat = new MultipleMap(matches, 'category');
		Match._matches = new SimpleMap(matches, 'id');
	}
	
	static get all() {
		return Match._matches;
	}
	
	static get allCat() {
		return Match._matchesCat;
	}
	
	static get(match_id_or_category) {
		return Match._matches[match_id_or_category] ||
			Match._matchesCat[match_id_or_category];
	}
	
}

module.exports = Match;