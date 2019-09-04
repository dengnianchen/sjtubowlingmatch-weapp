
/**
 * @property {number} roundIndex
 * @property {number} gameIndex
 * @property {number} frameIndex
 */
class FrameRef extends $.Model {
	
	/**
	 *
	 * @param roundIndex
	 * @param gameIndex
	 * @param frameIndex
	 */
	constructor(roundIndex, gameIndex, frameIndex) {
		super();
		this.roundIndex = roundIndex;
		this.gameIndex = gameIndex;
		this.frameIndex = frameIndex;
	}

	get id() {
		return `Frame.${this.roundIndex}.${this.gameIndex}.${this.frameIndex}`;
	}
	
	getPrevFrame(maxRounds, maxGames) {
		let gameIndex = this.gameIndex;
		let frameIndex = this.frameIndex;
		let roundIndex = this.roundIndex;
		gameIndex--;
		if (gameIndex < 0) {
			frameIndex--;
			gameIndex = maxGames - 1;
		}
		if (frameIndex < 0) {
			roundIndex--;
			frameIndex = 9;
			gameIndex = maxGames - 1;
		}
		if (roundIndex < 0)
			return null;
		return new FrameRef(roundIndex, gameIndex, frameIndex);
	}
	
	getNextFrame(maxRounds, maxGames) {
		let gameIndex = this.gameIndex;
		let frameIndex = this.frameIndex;
		let roundIndex = this.roundIndex;
		if (++gameIndex >= maxGames) {
			gameIndex = 0;
			frameIndex++;
		}
		if (frameIndex === 10) {
			frameIndex = 0;
			gameIndex = 0;
			roundIndex++;
		}
		if (roundIndex >= maxRounds)
			return null;
		return new FrameRef(roundIndex, gameIndex, frameIndex);
	}
	
	static createFromId(id) {
		let activeFrameIdSplited = id.split('.');
		return new FrameRef(parseInt(activeFrameIdSplited[1]),
			parseInt(activeFrameIdSplited[2]),
			parseInt(activeFrameIdSplited[3]));
	}
}

module.exports = FrameRef;