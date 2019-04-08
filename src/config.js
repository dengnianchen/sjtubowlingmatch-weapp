/**
 * 小程序配置文件
 */
const host = 'https://sjtubowling.applinzi.com';
const storageUrl = 'http://sjtubowling-public.stor.sinaapp.com';

module.exports = {
	storageUrl,
	
	// Welib配置
	welib: {
		host: host + "/test_match",
		wui: {
			/* WUI组件配置 */
			abnor: {
				NO_RECORD: {
					image: null,
					button: null
				},
				PK_UNCONFIRMED: {
					image: null,
					button: null
				},
				PK_INIT_GAME_UNCONFIRMED: {
					image: null,
					button: null
				},
				PK_QUIT: {
					image: null,
					button: null
				},
			}
		}
	}
};