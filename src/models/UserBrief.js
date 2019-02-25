/**
 * @property {number} id
 * @property {string} name
 * @property {number} gender
 * @property {string} avatarUrl
 *
 * @author Deng Nianchen
 */
class UserBrief extends $.Model {
	
	constructor(data) {
		super(data);
	}
	
}

module.exports = UserBrief;