/**
 * 小程序配置文件
 */
const host = 'https://sjtubowling.applinzi.com/test_match';
const storageUrl = 'http://sjtubowling-public.stor.sinaapp.com';
const cstorUrl = 'https://sinacloud.net/sjtubowling/match';

module.exports = {
	storageUrl,
	cstorUrl,
	host,
	// Welib配置
	welib: {
		host,
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