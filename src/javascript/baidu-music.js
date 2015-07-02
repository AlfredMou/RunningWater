var addPart=[{
				image:"http://c.hiphotos.baidu.com/ting/s%3D210/sign=b845edf20ed162d981ee651d21dfa950/242dd42a2834349bb976cdb3cdea15ce36d3be90.jpg",
				header:{
					name:"醉梦千城",
					singerUrl:"http://y.baidu.com/zmusic",
					listener:"11296 ",
					listenTime:"4986043"
				},
				context:[{
							songUrl:"http://y.baidu.com/song/178889",
							songName:"断剑残梦",
							playUrl:"http://y.baidu.com/gufeng/musician",
						},{
							songUrl:"http://y.baidu.com/song/164653",
							songName:"哀故人",
							playUrl:"http://y.baidu.com/gufeng/musician",
						},{
							songUrl:"http://y.baidu.com/song/137341",
							songName:"莲华错·梵音",
							playUrl:"http://y.baidu.com/gufeng/musician",
						}]
			},
			{
				image:"http://b.hiphotos.baidu.com/ting/s%3D210/sign=ebe9d1f4aad3fd1f3209a53b004f25ce/aa18972bd40735fa8faf0c639c510fb30e240888.jpg",
				header:{
					name:"W.K.",
					singerUrl:"http://y.baidu.com/wk211",
					listener:"3935",
					listenTime:"3711485"
				},
				context:[{
							songUrl:"http://y.baidu.com/song/178889",
							songName:"【朝忆梨花暮忆雪】天地无恙",
							playUrl:"http://y.baidu.com/gufeng/musician",
						},{
							songUrl:"http://y.baidu.com/song/164653",
							songName:"抹香鲸之海（歌曲版）",
							playUrl:"http://y.baidu.com/gufeng/musician",
						},{
							songUrl:"http://y.baidu.com/song/137341",
							songName:"后会有期",
							playUrl:"http://y.baidu.com/gufeng/musician",
						}]
			},
			{
				image:"http://d.hiphotos.baidu.com/ting/s%3D210/sign=2786839bf31f3a295ec8d2cfa924bce3/f9dcd100baa1cd11d9595065ba12c8fcc2ce2d83.jpg",
				header:{
					name:"音频怪物",
					singerUrl:"http://y.baidu.com/zmusic",
					listener:"11296 ",
					listenTime:"4986043"
				},
				context:[{
							songUrl:"http://y.baidu.com/song/178889",
							songName:"拂世之剑—《倩女幽魂2》",
							playUrl:"http://y.baidu.com/gufeng/musician",
						},{
							songUrl:"http://y.baidu.com/song/164653",
							songName:"君临天下一《天下HD》筑梦..",
							playUrl:"http://y.baidu.com/gufeng/musician",
						}]
			},
			{
				image:"http://a.hiphotos.baidu.com/ting/s%3D210/sign=a82b84d1fff2b211e02e824ffa816511/ae51f3deb48f8c542cfd278d3e292df5e0fe7f62.jpg",
				header:{
					name:"河图",
					singerUrl:"http://y.baidu.com/zmusic",
					listener:"11296 ",
					listenTime:"4986043"
				},
				context:[{
							songUrl:"http://y.baidu.com/song/178889",
							songName:"斗仙",
							playUrl:"http://y.baidu.com/gufeng/musician",
						},{
							songUrl:"http://y.baidu.com/song/164653",
							songName:"不良人—《不良人》手游暨..",
							playUrl:"http://y.baidu.com/gufeng/musician",
						},{
							songUrl:"http://y.baidu.com/song/164653",
							songName:"第三十八年夏至",
							playUrl:"http://y.baidu.com/gufeng/musician",
						}]
			},
			{
				image:"http://g.hiphotos.baidu.com/ting/s%3D210/sign=1757cca57eec54e745ec1d1f89399bfd/18d8bc3eb13533fab4e3d2b5add3fd1f40345bd7.jpg",
				header:{
					name:"以冬",
					singerUrl:"http://y.baidu.com/zmusic",
					listener:"11296 ",
					listenTime:"4986043"
				},
				context:[{
							songUrl:"http://y.baidu.com/song/178889",
							songName:"你一生的故事",
							playUrl:"http://y.baidu.com/gufeng/musician",
						}]
			}]
var htmlModel="<div class='water-running-block'><div class='image-block'><img src='{image}' width='210' height='210'></div><div class='message-content'><h4 class='baidu-music-h'><a href='{singerUrl}'>{name}</a></h4><p class='singer-message'><i class='listener-number'></i><span>{listener}</span>人<i class='listen-time'></i><span>{listenTime}</span></p><ul class='sing-list'>[<li><span><a href='{songUrl}'>{songName}</a></span><div class='play-icon'><a href='{playUrl}'><i class='music-play'></i></a></div></li>]</ul></div></div>";
$(function() {
	var waterRunning=$(".water-running").runningWater({
		htmlModel:htmlModel,
		xList:[0,250,500,750,1000],
		width:1200,
		respond:true
	});
	waterRunning.appendBlocks(addPart);
});