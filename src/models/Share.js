import Item from './Item';
import Player from './Player';
import Play from './Play';

/**
 *
 */
class Share extends $.Model {
	
	static achieve(item, level, player) {
		let levelName = `${level + 1}级`;
		if (item.detail['hide'])
			levelName = '隐藏成就';
		else if (item.detail['targets'].length === level + 1)
			levelName = '最高级';
		return {
			title: `获得成就：${item.item_name}（${levelName}）`,
			imageUrl: `https://imgx.sinacloud.net/sjtubowling/c_crop,w_512,h_512,x_${512 * (level + 1)}--c_pad,h_400,w_500,g_center/match/pk/achieve_${item.identifier}.png`,
			path: `/pages/pkPlayer/index?match=${item.match}&id=${player.id}&tab=1`
		}
	}
	
	/**
	 *
	 * @param {{item:Item,applyTarget:Player,applyData:Object}} buyInfo
	 */
	static buy(buyInfo) {
		let title = '';
		let imageUrl = `https://imgx.sinacloud.net/sjtubowling/c_pad,h_400,w_500,g_center/match/pk/shop_${buyInfo.item.identifier}.png`;
		let path = Page.current().getPath();
		switch (buyInfo.item.identifier) {
			case 'Meme':
				title = this._rand([
					"表情包出击！",
					"又有倒霉鬼要做表情包喽",
					"这次我会给你选个简单点儿的~",
					"表情包，燥起来！"
				]);
				break;
			case 'Nick':
				title = `快报！${buyInfo.applyTarget.name}喜提昵称“${buyInfo.applyData.nickname}”！`;
				break;
			default:
				title = `兑换道具：${buyInfo.item.item_name}`
		}
		return { title, imageUrl, path };
	}
	
	/**
	 *
	 * @param {Play} playInfo
	 */
	static play(playInfo) {
		if (playInfo.type === 'Init') {
			let p = playInfo.participants[playInfo.participants.keys[0]];
			let playerName = p.player.nick || p.player.name;
			return {
				title: `${playerName}的定级赛：${p.detail.score}分`,
				path: `pages/pkResult/index?match=${playInfo.match}&id=${playInfo.id}`
			};
		}
		let typeName = playInfo.match_info.detail['type_table'][playInfo.type]['name'];
		let pA = playInfo.participants[playInfo.participants.keys[0]];
		let pB = playInfo.participants[playInfo.participants.keys[1]];
		let playerNameA = pA.player.nick || pA.player.name;
		let playerNameB = pB.player.nick || pB.player.name;
		let gamesA = playInfo.games.filter(function(game) {
			return game.player_id === pA.player_id
		});
		let gamesB = playInfo.games.filter(function(game) {
			return game.player_id === pB.player_id
		});
		
		let candidates = (function () {
			let candidates = [];
			
			try {
				// 局分模块
				if (pA.detail.score >= 390 && pB.detail.score >= 390)
					candidates.push(`${playerNameA}和${playerNameB}的神仙PK`);
				else if (pA.detail.score >= 390)
					candidates.push(`属于${playerNameA}的个人天秀`);
				else if (pB.detail.score >= 390)
					candidates.push(`属于${playerNameB}的个人天秀`);
				else if (pA.detail['basic_effects'] &&
					pA.detail['basic_effects']['CoinBonusLowScore'] &&
					pB.detail['basic_effects'] &&
					pB.detail['basic_effects']['CoinBonusLowScore'])
					candidates.push(`${playerNameA}和${playerNameB}的菜鸡互啄`);
				else if (pA.detail.score - pB.detail.score >= 30)
					candidates.push(`${playerNameB}被${playerNameA}“教做人”了`);
				else if (pB.detail.score - pA.detail.score >= 30)
					candidates.push(`${playerNameA}被${playerNameB}“教做人”了`);
				
				// 局况模块
				let splitA = gamesA[0].statistic['split'] +
					gamesA[1].statistic['split'];
				let splitB = gamesB[0].statistic['split'] +
					gamesB[1].statistic['split'];
				if (splitA >= 6 && splitB >= 6)
					candidates.push(`${playerNameA}和${playerNameB}的分屏大战`);
				else if (splitA >= 6)
					candidates.push(`${playerNameA}之今日无奈：又分屏了`);
				else if (splitB >= 6)
					candidates.push(`${playerNameB}之今日无奈：又分屏了`);
				let strikeA = gamesA[0].statistic['strike'] +
					gamesA[1].statistic['strike'];
				let strikeB = gamesB[0].statistic['strike'] +
					gamesB[1].statistic['strike'];
				if (strikeA >= 10 && strikeB >= 10)
					candidates.push(`${playerNameA}和${playerNameB}上演了一场全中大戏`);
				else if (strikeA >= 10)
					candidates.push(`${playerNameA}：爆叉就行了`);
				else if (strikeB >= 10)
					candidates.push(`${playerNameB}：爆叉就行了`);
				
				if (candidates.length)
					return candidates;
			} catch (ex) {}
			
			// 基础模块
			if (playInfo.type === 'Friendly')
				candidates.push(`${playerNameA}和${playerNameB}的友好交流`);
			if (playInfo.type === 'Normal') {
				candidates.push(`${playerNameA}和${playerNameB}的激烈对决`);
			}
			return candidates;
		})();
		return {
			title: `${typeName}速递：` + this._rand(candidates),
			path: `pages/pkResult/index?match=${playInfo.match}&id=${playInfo.id}`
		}
	}
	
	static _rand(candidates) {
		return candidates[Math.floor(Math.random() * candidates.length)];
	}
	
}

module.exports = Share;