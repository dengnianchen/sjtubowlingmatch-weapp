import Frame from './Frame';

/**
 * Game类用于表示一局球局，包含球局相关的局况、分数等信息
 *
 * @property {number}   id
 * @property {Frame[]}  frames      局内格详情
 * @property {number}   bonus       加分
 * @property {number}   score       总分
 * @property {string}   type        类型（单人赛：single；多人赛：multiple）
 * @property {number}   player_id   进行该局的选手
 * @property {number}   team_id     进行该局的队伍
 * @property {number}   play_id     该局所属的比赛场次
 * @property {string}   play_date   时间
 * @property {string}   create_time 创建时间
 * @author Deng Nianchen
 */
class Game extends $.Model {
	
	constructor(data = null) {
		data = $.extend({ bonus: 0, score: 0, type: 'single' }, data);
		super(data);
		this.frames = Array.apply(null, Array(10)).map(
			(val, i) => new Frame(data.frames ? data.frames[i] : '', i));
		this.calcScore();
	}
	
	updateFrame(i, content) {
		this.frames[i].update(content);
		this.calcScore();
	}
	
	calcScore() {
		this.score = this.bonus;
		for (let i = 0; i < 9; ++i) {
			this.score += this.frames[i].getPins(0) + this.frames[i].getPins(1);
			if (this.frames[i].isStrike()) {
				this.score += this.frames[i + 1].getPins(0);
				if (this.frames[i + 1].isStrike() && i < 8)
					this.score += this.frames[i + 2].getPins(0);
				else
					this.score += this.frames[i + 1].getPins(1);
			} else if (this.frames[i].isSpare())
				this.score += this.frames[i + 1].getPins(0);
		}
		this.score += this.frames[9].getPins(0) + this.frames[9].getPins(1) + this.frames[9].getPins(2);
	}
	
	get isComplete() {
		return this.frames.every(value => value.isComplete());
	}
	
	/**
	 * 将模型对象转换为可传递给服务器的一般数据对象
	 *
	 * @return {object}
	 * @author Deng Nianchen
	 */
	toPlainObject() {
		let plainObject = super.toPlainObject();
		plainObject.frames = Array.apply(null, Array(10)).map(
			(val, i) => this.frames[i].data, this);
		return plainObject;
	}
	
}

module.exports = Game;