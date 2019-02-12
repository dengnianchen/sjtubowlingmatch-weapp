class Player {
	
	constructor(data) {
		$(this).extend(data);
	}
	
	static get current() {
		let rawData = $.Session.get('user');
		if (!rawData)
			return null;
		return new Player(rawData);
	}
	
	static set current(user) {
		$.Session.set('user', user);
	}
	
}

module.exports = Player;