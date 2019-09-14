class Notify extends $.Model {
	
	static async get(page = null) {
		if (page)
			return await $.Http.request(`/notification/${page}`, {}, {}, Notify);
		else
			return await $.Http.request(`/notification`, {}, {}, Notify);
	}
	
	async markAsRead() {
		return await $.Http.request(`PUT /notification/read/${this.id}`);
	}
}

module.exports = Notify;