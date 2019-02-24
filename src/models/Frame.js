const F_STRIKE = 1;
const F_SPARE = 2;
const F_SPLIT = 4;
const smStates = {
	start: {
		trans: [ 'SXN', 's', 'x', 'n' ]
	},
	invalid: null,
	's': {
		flag: F_SPLIT,
		trans: [ 'P', 'n' ]
	},
	'x': {
		flag: F_STRIKE,
		end: 1,
		trans: [ 'SXN', 'xs', 'xx', 'xn' ]
	},
	'n': {
		trans: [ '/M', 'n/', 'nm' ]
	},
	'n/': {
		flag: F_SPARE,
		end: 1,
		trans: [ 'XN', 'n/x', 'n/n' ]
	},
	'nm': {
		end: 1
	},
	'xs': {
		flag: F_SPLIT,
		trans: [ 'P', 'xn' ]
	},
	'xx': {
		flag: F_STRIKE,
		end: 2,
		trans: [ 'XN', 'xxx', 'xxn' ]
	},
	'xn': {
		trans: [ '/M', 'xn/', 'xnm' ]
	},
	'xn/': {
		flag: F_SPARE,
		end: 2
	},
	'xnm': {
		end: 2
	},
	'xxx': {
		flag: F_STRIKE,
		end: 3
	},
	'xxn': {
		end: 2
	},
	'n/x': {
		flag: F_STRIKE,
		end: 2
	},
	'n/n': {
		end: 1
	}
};

/**
 * @property {string} data
 * @property {number} frameIdx
 * @property {number[]} flags
 * @property {number[]} pins
 * @property {object} smState
 */
class Frame extends $.Model {
	
	/**
	 *
	 * @param {string} data
	 * @param {number} frameIdx
	 * @returns {*}
	 */
	constructor(data, frameIdx) {
		super();
		this.frameIdx = frameIdx;
		this.update(data);
	}
	
	update(data) {
		this.data = data;
		this.smState = smStates.start;
		this.flags = [ 0 ];
		this.pins = [];
		for (let i = 0; i < data.length; ++i) {
			let trans = this.smState.trans;
			if (this.isComplete()) {
				this.smState = smStates.invalid;
				break;
			}
			if (this.isLastFrame() && this.smState.end)
				this.flags.push(0);
			
			let r = this.analysisChar(data[i]);
			let match = trans[0].match(r[0]);
			if (!match || (match[0] === 'M' && this.getPins(-1) + r[1] > 9)) {
				this.smState = smStates.invalid;
				break;
			}
			if (r[1] >= 0)
				this.pins.push(r[1]);
			this.smState = smStates[trans[match.index + 1]];
			if (this.smState.flag !== undefined)
				this.flags[this.flags.length - 1] |= this.smState.flag;
		}
	}
	
	isComplete() {
		if (this.smState === null)
			return false;
		return this.smState.trans === undefined || (!this.isLastFrame() && this.smState.end)
	}
	
	isValid() {
		return this.smState !== null;
	}
	
	isLastFrame() {
		return this.frameIdx === 9;
	}
	
	isStrike(index = 0) {
		return this.flags[index] & F_STRIKE;
	}
	
	isSpare(index = 0) {
		return this.flags[index] & F_SPARE;
	}
	
	isOpen(index = 0) {
		return !this.isStrike(index) && !this.isSpare(index);
	}
	
	isSplit(index = 0) {
		return this.flags[index] & F_SPLIT;
	}
	
	isKiller(index = 0) {
		return this.isSpare(index) && this.isSplit(index);
	}
	
	getAcceptable() {
		if (!this.isValid() || this.isComplete())
			return '';
		return this.smState.trans[0]
			.replace(/N/, '-123456789')
			.replace(/P/, '2345678')
			.replace(/M/, '-123456789'.substr(0, 10 - this.getPins(-1)));
	}
	
	getPins(index) {
		if (index < 0) index = this.pins.length + index;
		if (index < 0 || index >= this.pins.length)
			return 0;
		return this.pins[index];
	}
	
	/**
	 *
	 * @param {string} c
	 * @returns {*[]}
	 */
	analysisChar(c) {
		switch (c) {
			case 'X': return [ /X/, 10 ];
			case 'S': return [ /S/, -1 ];
			case '/': return [ /\//, 10 - this.getPins(-1) ];
			case '-': return [ /[NM]/, 0 ];
			default:
				let n = parseInt(c);
				if (isNaN(n) || n === 0)
					return [ /E/, 0 ];
				if (n >= 2 && n <= 8)
					return [ /[NMP]/, n ];
				return [ /[NM]/, n ];
		}
	}
	
	toString() {
		return this.data;
	}
	
	toPlainObject() {
		return this.data;
	}
	
}

module.exports = Frame;