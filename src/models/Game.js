const Frame = require('./Frame');

/**
 * Game类用于表示一局球局，包含球局相关的局况、分数等信息
 *
 * @property {number}   id
 * @property {Frame[]}   frames      局内格详情
 * @property {number}   bonus       加分
 * @property {number}   score       总分
 * @property {string}   type        类型（单人赛：single；多人赛：multiple）
 * @property {Play}     play        [关联]该局所属的比赛
 * @property {Player}   player      [关联]进行该局的选手
 * @property {string}   create_time 创建时间
 * @author Deng Nianchen
 */
class Game {
	constructor(data = null) {
		if (!data) {
			this.frames = Array.apply(null, Array(10)).map((val, i) => new Frame('', i));
			this.bonus = 0;
			this.score = 0;
			this.type = 'single';
		} else {
			$(this).extend(data);
			this.frames = Array.apply(null, Array(10)).map((val, i) => new Frame(data.frames[i], i));
		}
	}
	
	updateFrame(i, content) {
		this.frames[i].update(content);
	}
	
}

module.exports = Game;