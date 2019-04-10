class Notify {
	
	static async get(page = null) {
		if (page)
			return await $.Http.request(`/notification/${page}`);
		else
			return await $.Http.request(`/notification`);
	}
}

module.exports = Notify;