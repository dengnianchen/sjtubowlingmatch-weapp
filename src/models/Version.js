/**
 * @property {Number}   major   主版本号
 * @property {Number}   minor   次版本号
 * @property {String}   date    版本日期
 * @property {String}   content 版本更新内容
 */
class Version extends $.Model {
	
	constructor(data) {
		super();
		let versionSplited = data.split('.');
		this.major = parseInt(versionSplited[0]);
		this.minor = parseInt(versionSplited[1]);
		if (versionSplited.length > 2)
			this.date = versionSplited[2];
	}
	
	static async getServerVersion() {
		return await $.Http.request('/version', {}, {}, Version);
	}
	
	static compare(v1, v2) {
		return v1.major - v2.major || v1.minor - v2.minor;
	}
	
	get id() {
		if (this.date)
			return `${this.major}.${this.minor}.${this.date}`;
		return `${this.major}.${this.minor}`;
	}
	
}

module.exports = Version;