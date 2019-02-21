/**
 * @property {string} data
 * @property {number[]} flags
 */
class Frame {
	
	static F_STRIKE = 1;
	static F_SPARE = 2;
	static F_SPLIT = 4;
	
	constructor(data) {
		
		if (!$is_last_frame) {
			$flag = 0;
			if (preg_match('/X/', $frame))
				$flag |= Frame.F_STRIKE;
			else if (preg_match('/\//', $frame))
				$flag |= Frame.F_SPARE;
			if (preg_match('/S/', $frame))
				$flag |= Frame.F_SPLIT;
			return [ $flag ];
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