/**
 * @property {string} data
 * @property {number[]} flags
 * @property {number} state
 * @property {number[]} pins
 */
class Frame {
	
	static F_STRIKE = 1;
	static F_SPARE = 2;
	static F_SPLIT = 4;
	static S_INVALID = -1;
	static S_UNCOMPLETED = 0;
	static S_COMPLETED = 1;
	
	/**
	 *
	 * @param {string} data
	 * @param {boolean} isLastFrame
	 * @returns {*}
	 */
	constructor(data, isLastFrame = false) {
		this.state = Frame.S_UNCOMPLETED;
		if (!isLastFrame) { // 不是最后一格的时候
			this.flags = [ 0 ];
			this.pins = [ 0, 0 ];
			// 首先判断是否为全中
			if (data === 'X') {
				this.flags[0] = Frame.F_STRIKE;
				this.pins[0] = 10;
				this.state = Frame.S_COMPLETED;
				return;
			}
			// 判断data开头是否有分屏标记，如果有，记录标记并从data的开头移除
			if (data.startsWith('S')) {
				this.flags[0] = Frame.F_SPLIT;
				data = data.replace(/^S/, '');
			}
			if (data.length === 0)
				return;
			// data不可能超过2个字符长度
			if (data.length >= 3) {
				this.state = Frame.S_INVALID;
				return;
			}
			// 识别data中的第一个字符（第一球情况）
			switch (data[0]) {
				case '-': // 0个瓶的标记
					this.pins[0] = 0;
					break;
				default: // 其他字符只接受1-9
					this.pins[0] = parseInt(data[0]);
					if (isNaN(this.pins[0]) || this.pins[0] === 0) {
						this.state = Frame.S_INVALID;
						return;
					}
			}
			// 如果data存在两个字符，则识别第二球情况
			if (data.length >= 2) {
				switch (data[1]) {
					case '-': // 0个瓶的标记
						this.pins[1] = 0;
						break;
					case '/': // 补中标记
						this.pins[1] = 10 - this.pins[0];
						this.flags[0] |= Frame.F_SPARE;
						break;
					default: // 其他字符只接受1-9，且与第一球相加不能超过9
						this.pins[0] = parseInt(data[0]);
						if (isNaN(this.pins[0]) || this.pins[1] === 0 || this.pins[0] + this.pins[1] > 9) {
							this.state = Frame.S_INVALID;
							return;
						}
				}
				this.state = Frame.S_COMPLETED;
			}
			return;
		}
		this.pins = [ 0, 0, 0 ];
		this.flags = [];
		if (data.length === 0)
			return;
		
		for (let chars = 1; chars <= data.length; ++chars) {
			let f = new Frame(data.substr(0, chars));
			if (f.state === Frame.S_INVALID) {
				this.state = Frame.S_INVALID;
				return;
			} else if (f.state === Frame.S_COMPLETED) {
				this.pins[0] = f.pins[0];
				this.pins[1] = f.pins[1];
				this.flags.push(f.flags[0]);
				data = data.substr(chars);
				break;
			}
		}
		
		if ($frame === 'XXX')
			return array_fill(0, 3, Frame.F_STRIKE);
		if (substr($frame, 0, 2) === 'XX')
			return array_fill(0, 2, Frame.F_STRIKE);
		if (substr($frame, 0, 1) === 'X')
			return [ Frame.F_STRIKE, $this->getFrameFlag(substr($frame, 1)) ];
		if (substr($frame, -1) === 'X')
			return [ $this->getFrameFlag(substr($frame, 0, -1)), Frame.F_STRIKE ];
		return [ $this->getFrameFlag($frame) ];
		
	}
	
	isStrike(index = 0) {
		return this.flags[index] & Frame.F_STRIKE;
	}
	
	isSpare(index = 0) {
		return this.flags[index] & Frame.F_SPARE;
	}
	
	isOpen(index = 0) {
		return !this.isStrike(index) && !this.isSpare(index);
	}
	
	isSplit(index = 0) {
		return this.flags[index] & Frame.F_SPLIT;
	}
	
	isKiller(index = 0) {
		return this.isSpare(index) && this.isSplit(index);
	}
	
}