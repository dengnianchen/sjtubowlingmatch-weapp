/**
 * 小程序配置文件
 */
const host = 'https://sjtubowling.applinzi.com';
const publicUrl = 'http://sjtubowling.applinzi.com/bowling/Public';
const storageUrl = 'http://sjtubowling-public.stor.sinaapp.com';

module.exports = {
	publicUrl, storageUrl,
	
	// Welib配置
	welib: {
		host: host + "/match",
		wui: {
			/* WUI组件配置 */
		}
	}
};