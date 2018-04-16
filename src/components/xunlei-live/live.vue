<template>
	<transition name="xunlei-fade">
		<div class="xunlei-main">
			<div class="wrapper">  
			    <div class="scroller">
			    	<div ref="tscroll-list-container" class="show-item">
			    		<div class="openurl">
			    			<div class="player-info">
			    				<div class="player">
			    					<div class="avatar">
			    						<img src="http://img2.user.kanimg.com/usrimg/664779935/100x100?t=1523850717" alt="CK🎤雨汐想要陪伴">
			    						<P>CK🎤雨汐想要陪伴</P>
			    					</div>
			    				</div>
			    				<div class="see">
			    					<p>
			    						<span>6782</span>
			    						人 在看
			    					</p>
			    				</div>
			    			</div>
			    			<div class="entry-wp">
			    				<div class="vedio-pic">
			    					<img src="http://img2.user.kanimg.com/usrimg/664779935/300x300?t=1523850717">
			    				</div>
			    				<p class="tip">直播</p>
			    			</div>
			    			<div class="des-show">
			    				<p>河南雨汐求家人</p>
			    			</div>
			    		</div>
			    	</div>
			    	<div ref="tscroll-pull-up">loading</div>
			    </div>
			</div>
	    </div>
	</transition>
</template>

<script>
    let allData = {
    	"result": 0,
    	"message": "ok",
    	"data": [{
    		"userid": "664779935",
    		"status": 1,
    		"title": "河南雨汐求家人",
    		"image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/5\/2224b6df722cc5a1914461532249a0dd.jpg",
    		"stream_server": 1,
    		"start_time": "2018-04-16 11:52:08",
    		"play_url": "",
    		"play_hls_url": "",
    		"platform": 1,
    		"current_point": 8760,
    		"current_income": 4295,
    		"current_user": 563,
    		"record_file": 0,
    		"record_status": 1,
    		"appos": "android",
    		"appver": "3.3.220.0",
    		"is_official": 0,
    		"uuid": "1238376488",
    		"roomid": "13277_664779935",
    		"stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/13277_664779935",
    		"stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/13277_664779935.m3u8",
    		"stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/13277_664779935.flv",
    		"isvcaccept": 1,
    		"model": "OPPO R11 Plusk",
    		"osver": "7.1.1",
    		"is_answer": 0,
    		"online_user_num": 6264,
    		"onlinenum": 6782,
    		"server_time": "2018-04-16 14:20:16",
    		"stream_ai": 84,
    		"stream_ai_time": "2018-04-16 11:52:28",
    		"current_point_ext": 5590,
    		"is_confluence": 0,
    		"userinfo": {
    			"nickname": "CK🎤雨汐想要陪伴",
    			"avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/664779935\/300x300?t=1523850717",
    			"avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/664779935\/100x100?t=1523850717",
    			"avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/664779935\/300x300"
    		},
    		"blocklevel": false,
    		"seq2": {
    			"onlinenum": 6782,
    			"hot_level": 0,
    			"is_recommend": 0,
    			"is_sign": 0,
    			"status": 1,
    			"is_official": 0,
    			"toutiao": 1,
    			"toutiao2": 0,
    			"top1": 0,
    			"newPlayer": 0,
    			"is_follow": 0,
    			"playerviewtime": 1221,
    			"current_point": 8760,
    			"current_point_ext": 5590,
    			"stream_ai": 100,
    			"stream_si": 100,
    			"blocklevel": "",
    			"second_roomnum": 26344,
    			"second_playerviewtime": 37017,
    			"high_current_point": 59370
    		},
    		"top": 0,
    		"first_play_time": "2017-06-28 19:42:10",
    		"gif": "",
    		"tag": "",
    		"level_info": {
    			"total_point": 4860970,
    			"manager_num": 5,
    			"station": 1,
    			"pendant": 1,
    			"level": 15,
    			"next": 1235030,
    			"next_total": 1800000,
    			"image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_1.png",
    			"station_name": "迅雷主播",
    			"level_next": 16,
    			"image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv15.png",
    			"image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv15.png"
    		},
    		"seq2_score": 423271152,
    		"index": 1
    	}, {
    		"userid": "707822732",
    		"status": 1,
    		"title": "",
    		"image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/2\/764f62145f15dd32984b08220da664c9.jpg",
    		"stream_server": 1,
    		"start_time": "2018-04-16 13:30:20",
    		"play_url": "",
    		"play_hls_url": "",
    		"platform": 2,
    		"current_point": 59380,
    		"current_income": 29685,
    		"current_user": 376,
    		"record_file": 0,
    		"record_status": 1,
    		"appos": "ios",
    		"appver": "2.9.41",
    		"is_official": 0,
    		"uuid": "1415955430",
    		"roomid": "10947_707822732",
    		"stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/10947_707822732",
    		"stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/10947_707822732.m3u8",
    		"stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/10947_707822732.flv",
    		"isvcaccept": 1,
    		"model": "iPhone6s Plus",
    		"osver": "11.3",
    		"is_answer": 0,
    		"current_point_ext": 59370,
    		"is_confluence": 0,
    		"onlinenum": 4265,
    		"userinfo": {
    			"nickname": "泊翰-秋秋求守护",
    			"avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/707822732\/300x300?t=1523809576",
    			"avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/707822732\/100x100?t=1523809576",
    			"avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/707822732\/300x300"
    		},
    		"blocklevel": false,
    		"seq2": {
    			"onlinenum": 4265,
    			"hot_level": 0,
    			"is_recommend": 0,
    			"is_sign": 0,
    			"status": 1,
    			"is_official": 0,
    			"toutiao": 0,
    			"toutiao2": 0,
    			"top1": 0,
    			"newPlayer": 0,
    			"is_follow": 0,
    			"playerviewtime": 244,
    			"current_point": 59380,
    			"current_point_ext": 59370,
    			"stream_ai": 100,
    			"stream_si": 100,
    			"blocklevel": "",
    			"second_roomnum": 26344,
    			"second_playerviewtime": 37017,
    			"high_current_point": 59370
    		},
    		"top": 0,
    		"first_play_time": "2018-03-05 13:14:28",
    		"gif": "",
    		"tag": "",
    		"level_info": {
    			"total_point": 1236280,
    			"manager_num": 5,
    			"station": 1,
    			"pendant": 1,
    			"level": 11,
    			"next": 83720,
    			"next_total": 480000,
    			"image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_1.png",
    			"station_name": "迅雷主播",
    			"level_next": 12,
    			"image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv11.png",
    			"image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv11.png"
    		},
    		"seq2_score": 132171330,
    		"index": 2
    	}, {
    		"userid": "577901328",
    		"status": 1,
    		"title": "给糖就笑🍭",
    		"image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/8\/a4d87b63856173fe87309d7816ef1359.jpg",
    		"stream_server": 1,
    		"start_time": "2018-04-16 13:02:47",
    		"play_url": "",
    		"play_hls_url": "",
    		"platform": 1,
    		"current_point": 30880,
    		"current_income": 15315,
    		"current_user": 2014,
    		"record_file": 0,
    		"record_status": 1,
    		"appos": "android",
    		"appver": "3.1.210.0",
    		"is_official": 0,
    		"uuid": "507021744",
    		"roomid": "13605_577901328",
    		"stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/13605_577901328",
    		"stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/13605_577901328.m3u8",
    		"stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/13605_577901328.flv",
    		"isvcaccept": 1,
    		"model": "",
    		"osver": "8.1.0",
    		"is_answer": 0,
    		"online_user_num": 22906,
    		"onlinenum": 22970,
    		"server_time": "2018-04-16 14:20:28",
    		"stream_ai": 0,
    		"stream_ai_time": "2018-04-16 13:59:51",
    		"current_point_ext": 20870,
    		"is_confluence": 0,
    		"userinfo": {
    			"nickname": "小七宝💕给糖就笑🍭",
    			"avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/577901328\/300x300?t=1523610387",
    			"avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/577901328\/100x100?t=1523610387",
    			"avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/577901328\/300x300"
    		},
    		"blocklevel": false,
    		"seq2": {
    			"onlinenum": 22970,
    			"hot_level": 0,
    			"is_recommend": 0,
    			"is_sign": 0,
    			"status": 1,
    			"is_official": 0,
    			"toutiao": 0,
    			"toutiao2": 0,
    			"top1": 0,
    			"newPlayer": 0,
    			"is_follow": 0,
    			"playerviewtime": 68,
    			"current_point": 30880,
    			"current_point_ext": 20870,
    			"stream_ai": 100,
    			"stream_si": 100,
    			"blocklevel": "",
    			"second_roomnum": 26344,
    			"second_playerviewtime": 37017,
    			"high_current_point": 59370
    		},
    		"top": 7,
    		"first_play_time": "2017-10-18 23:58:28",
    		"gif": "",
    		"tag": "http:\/\/cdn3.live.xunlei.com\/images\/201704\/356ec8ce38bf46cf1ba30ba9d5c9ccaf.png",
    		"level_info": {
    			"total_point": 29627300,
    			"manager_num": 8,
    			"station": 2,
    			"pendant": 2,
    			"level": 21,
    			"next": 4068700,
    			"next_total": 7200000,
    			"image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_2.png",
    			"station_name": "人气主播",
    			"level_next": 22,
    			"image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv21.png",
    			"image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv21.png"
    		},
    		"seq2_score": 126391302,
    		"index": 3
    	}, {
    		"userid": "632809693",
    		"status": 1,
    		"title": "屋外",
    		"image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/3\/8ad5113374e93c637870c654214e2cfc.jpg",
    		"stream_server": 1,
    		"start_time": "2018-04-16 13:31:42",
    		"play_url": "",
    		"play_hls_url": "",
    		"platform": 2,
    		"current_point": 20,
    		"current_income": 5,
    		"current_user": 970,
    		"record_file": 0,
    		"record_status": 1,
    		"appos": "ios",
    		"appver": "2.9.30",
    		"is_official": 0,
    		"uuid": "1028824231",
    		"roomid": "14363_632809693",
    		"stream_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/14363_632809693.flv",
    		"stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/14363_632809693.m3u8",
    		"stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/14363_632809693.flv",
    		"isvcaccept": 1,
    		"model": "iPhone6s Plus",
    		"osver": "11.3",
    		"is_answer": 0,
    		"current_point_ext": 10,
    		"online_user_num": 724,
    		"onlinenum": 3964,
    		"server_time": "2018-04-16 13:44:08",
    		"userinfo": {
    			"nickname": "雨欣🌹求守护",
    			"avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/632809693\/300x300?t=1523318094",
    			"avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/632809693\/100x100?t=1523318094",
    			"avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/632809693\/300x300"
    		},
    		"blocklevel": false,
    		"seq2": {
    			"onlinenum": 3964,
    			"hot_level": 0,
    			"is_recommend": 1,
    			"is_sign": 0,
    			"status": 1,
    			"is_official": 0,
    			"toutiao": 0,
    			"toutiao2": 0,
    			"top1": 0,
    			"newPlayer": 0,
    			"is_follow": 0,
    			"playerviewtime": 189,
    			"current_point": 20,
    			"current_point_ext": 10,
    			"stream_ai": 100,
    			"stream_si": 100,
    			"blocklevel": "",
    			"second_roomnum": 26344,
    			"second_playerviewtime": 37017,
    			"high_current_point": 59370
    		},
    		"top": 0,
    		"first_play_time": "2017-01-01 00:00:00",
    		"gif": "",
    		"tag": "",
    		"level_info": {
    			"total_point": 60900972,
    			"manager_num": 10,
    			"station": 3,
    			"pendant": 3,
    			"level": 24,
    			"next": 2795028,
    			"next_total": 11520000,
    			"image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_3.png",
    			"station_name": "头牌主播",
    			"level_next": 25,
    			"image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv24.png",
    			"image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv24.png"
    		},
    		"seq2_score": 124661331,
    		"index": 4
    	}, {
    		"userid": "713925586",
    		"status": 1,
    		"title": "",
    		"image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/6\/a256498ffbbf796c7176585e2997f5d7.jpg",
    		"stream_server": 1,
    		"start_time": "2018-04-16 02:23:16",
    		"play_url": "",
    		"play_hls_url": "",
    		"platform": 1,
    		"current_point": 20,
    		"current_income": 5,
    		"current_user": 1160,
    		"record_file": 0,
    		"record_status": 1,
    		"appos": "android",
    		"appver": "3.3.220.0",
    		"is_official": 0,
    		"uuid": "1425015373",
    		"roomid": "12458_713925586",
    		"stream_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/12458_713925586.flv",
    		"stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/12458_713925586.m3u8",
    		"stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/12458_713925586.flv",
    		"isvcaccept": 1,
    		"model": "OPPO A59s",
    		"osver": "5.1",
    		"is_answer": 0,
    		"online_user_num": 1386,
    		"onlinenum": 11894,
    		"server_time": "2018-04-16 04:21:18",
    		"stream_ai": 361,
    		"stream_ai_time": "2018-04-16 02:23:41",
    		"current_point_ext": 10,
    		"userinfo": {
    			"nickname": "秀儿想被宠",
    			"avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/713925586\/300x300?t=1523858805",
    			"avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/713925586\/100x100?t=1523858805",
    			"avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/713925586\/300x300"
    		},
    		"blocklevel": false,
    		"seq2": {
    			"onlinenum": 11894,
    			"hot_level": 0,
    			"is_recommend": 0,
    			"is_sign": 0,
    			"status": 1,
    			"is_official": 0,
    			"toutiao": 0,
    			"toutiao2": 0,
    			"top1": 0,
    			"newPlayer": 1,
    			"is_follow": 0,
    			"playerviewtime": 655,
    			"current_point": 20,
    			"current_point_ext": 10,
    			"stream_ai": 100,
    			"stream_si": 100,
    			"blocklevel": "",
    			"second_roomnum": 26344,
    			"second_playerviewtime": 37017,
    			"high_current_point": 59370
    		},
    		"top": 0,
    		"first_play_time": "2018-04-09 21:01:26",
    		"gif": "",
    		"tag": "",
    		"level_info": {
    			"total_point": 3270,
    			"manager_num": 1,
    			"station": 1,
    			"pendant": 1,
    			"level": 1,
    			"next": 2730,
    			"next_total": 6000,
    			"image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_1.png",
    			"station_name": "迅雷主播",
    			"level_next": 2,
    			"image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv1.png",
    			"image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv1.png"
    		},
    		"seq2_score": 123490223,
    		"index": 5
    	}, {
    		"userid": "710442845",
    		"status": 1,
    		"title": "",
    		"image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/5\/2e3e8d07394edfd59c06b70a9874213b.jpg",
    		"stream_server": 1,
    		"start_time": "2018-04-16 12:52:14",
    		"play_url": "",
    		"play_hls_url": "",
    		"platform": 2,
    		"current_point": 196440,
    		"current_income": 98115,
    		"current_user": 3047,
    		"record_file": 0,
    		"record_status": 1,
    		"appos": "ios",
    		"appver": "2.9.43",
    		"is_official": 0,
    		"uuid": "1420766154",
    		"roomid": "17795_710442845",
    		"stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/17795_710442845",
    		"stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/17795_710442845.m3u8",
    		"stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/17795_710442845.flv",
    		"isvcaccept": 1,
    		"model": "iPhone 8 Plus",
    		"osver": "11.3",
    		"is_answer": 0,
    		"current_point_ext": 5200,
    		"is_confluence": 0,
    		"onlinenum": 12370,
    		"userinfo": {
    			"nickname": "泊瀚逗逗求逗宝守护",
    			"avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/710442845\/300x300?t=1523789313",
    			"avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/710442845\/100x100?t=1523789313",
    			"avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/710442845\/300x300"
    		},
    		"blocklevel": false,
    		"seq2": {
    			"onlinenum": 12370,
    			"hot_level": 0,
    			"is_recommend": 0,
    			"is_sign": 0,
    			"status": 1,
    			"is_official": 0,
    			"toutiao": 0,
    			"toutiao2": 0,
    			"top1": 0,
    			"newPlayer": 0,
    			"is_follow": 0,
    			"playerviewtime": 392,
    			"current_point": 196440,
    			"current_point_ext": 5200,
    			"stream_ai": 100,
    			"stream_si": 100,
    			"blocklevel": "",
    			"second_roomnum": 26344,
    			"second_playerviewtime": 37017,
    			"high_current_point": 59370
    		},
    		"top": 0,
    		"first_play_time": "2018-03-29 19:06:29",
    		"gif": "",
    		"tag": "",
    		"level_info": {
    			"total_point": 1246390,
    			"manager_num": 5,
    			"station": 1,
    			"pendant": 1,
    			"level": 11,
    			"next": 73610,
    			"next_total": 480000,
    			"image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_1.png",
    			"station_name": "迅雷主播",
    			"level_next": 12,
    			"image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv11.png",
    			"image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv11.png"
    		},
    		"seq2_score": 123371252,
    		"index": 6
    	}, {
    		"userid": "714243982",
    		"status": 1,
    		"title": "新主播求关注",
    		"image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/2\/3bdcd22c2a151817f4a4a778ca05f402.jpg",
    		"stream_server": 1,
    		"start_time": "2018-04-16 08:17:18",
    		"play_url": "",
    		"play_hls_url": "",
    		"platform": 2,
    		"current_point": 200,
    		"current_income": 50,
    		"current_user": 663,
    		"record_file": 0,
    		"record_status": 1,
    		"appos": "ios",
    		"appver": "2.9.43",
    		"is_official": 0,
    		"uuid": "1425383549",
    		"roomid": "13271_714243982",
    		"stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/13271_714243982",
    		"stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/13271_714243982.m3u8",
    		"stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/13271_714243982.flv",
    		"isvcaccept": 1,
    		"model": "iPhone 8",
    		"osver": "11.0.3",
    		"is_answer": 0,
    		"online_user_num": 4564,
    		"onlinenum": 7611,
    		"server_time": "2018-04-16 12:01:10",
    		"current_point_ext": 10,
    		"userinfo": {
    			"nickname": "妍儿～",
    			"avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/714243982\/300x300?t=1523834516",
    			"avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/714243982\/100x100?t=1523834516",
    			"avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/714243982\/300x300"
    		},
    		"blocklevel": false,
    		"seq2": {
    			"onlinenum": 7611,
    			"hot_level": 0,
    			"is_recommend": 0,
    			"is_sign": 0,
    			"status": 1,
    			"is_official": 0,
    			"toutiao": 0,
    			"toutiao2": 0,
    			"top1": 0,
    			"newPlayer": 1,
    			"is_follow": 0,
    			"playerviewtime": 360,
    			"current_point": 200,
    			"current_point_ext": 10,
    			"stream_ai": 100,
    			"stream_si": 100,
    			"blocklevel": "",
    			"second_roomnum": 26344,
    			"second_playerviewtime": 37017,
    			"high_current_point": 59370
    		},
    		"top": 0,
    		"first_play_time": "2018-04-14 15:19:28",
    		"gif": "",
    		"tag": "",
    		"level_info": {
    			"total_point": 610,
    			"manager_num": 1,
    			"station": 1,
    			"pendant": 1,
    			"level": 1,
    			"next": 5390,
    			"next_total": 6000,
    			"image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_1.png",
    			"station_name": "迅雷主播",
    			"level_next": 2,
    			"image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv1.png",
    			"image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv1.png"
    		},
    		"seq2_score": 123310817,
    		"index": 7
    	}, {
    		"userid": "713649838",
    		"status": 1,
    		"title": "",
    		"image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/8\/a9167ee883241307ab9be72a33d84e11.jpg",
    		"stream_server": 1,
    		"start_time": "2018-04-16 13:15:39",
    		"play_url": "",
    		"play_hls_url": "",
    		"platform": 2,
    		"current_point": 490,
    		"current_income": 245,
    		"current_user": 92,
    		"record_file": 0,
    		"record_status": 1,
    		"appos": "ios",
    		"appver": "2.9.43",
    		"is_official": 0,
    		"uuid": "1424714989",
    		"roomid": "15918_713649838",
    		"stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/15918_713649838",
    		"stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/15918_713649838.m3u8",
    		"stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/15918_713649838.flv",
    		"isvcaccept": 1,
    		"model": "iPhone6s",
    		"osver": "10.3.3",
    		"is_answer": 0,
    		"is_confluence": 0,
    		"current_point_ext": 90,
    		"onlinenum": 6205,
    		"userinfo": {
    			"nickname": "U娱-M雪宝儿",
    			"avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/713649838\/300x300?t=1523582153",
    			"avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/713649838\/100x100?t=1523582153",
    			"avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/713649838\/300x300"
    		},
    		"blocklevel": false,
    		"seq2": {
    			"onlinenum": 6205,
    			"hot_level": 0,
    			"is_recommend": 0,
    			"is_sign": 0,
    			"status": 1,
    			"is_official": 0,
    			"toutiao": 0,
    			"toutiao2": 0,
    			"top1": 0,
    			"newPlayer": 1,
    			"is_follow": 0,
    			"playerviewtime": 249,
    			"current_point": 490,
    			"current_point_ext": 90,
    			"stream_ai": 100,
    			"stream_si": 100,
    			"blocklevel": "",
    			"second_roomnum": 26344,
    			"second_playerviewtime": 37017,
    			"high_current_point": 59370
    		},
    		"top": 0,
    		"first_play_time": "2018-04-08 19:31:52",
    		"gif": "",
    		"tag": "",
    		"level_info": {
    			"total_point": 12760,
    			"manager_num": 1,
    			"station": 1,
    			"pendant": 1,
    			"level": 2,
    			"next": 5240,
    			"next_total": 12000,
    			"image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_1.png",
    			"station_name": "迅雷主播",
    			"level_next": 3,
    			"image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv2.png",
    			"image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv2.png"
    		},
    		"seq2_score": 123271315,
    		"index": 8
    	}]
    }

    function getRandomData() {
    	let ret = []
        for (let i = 0, len = 10; i < len; i++) {
        	let index = Math.floor(Math.random() * allData.data.length)
        	let d = allData.data[index]
			ret.push({
				image: d.image,
				nickname: d.userinfo.nickname,
				onlineNum: d.onlinenum,
				title: d.title
			})
        }
        return ret
    }

    function mockData(ms) {
    	return new Promise((resolve, reject) => {
    		setTimeout(() => {
    			return resolve(getRandomData())
    		}, ms || 2000)
    	})
    }

	export default {
        mounted() {
        	mockData(100).then((ret) => {
        		console.log(ret)
        	})
        }
	}
</script>

<style scoped>
    .xunlei-fade-enter-active, .xunlei-fade-leave-active {
		transition: all .3s;
	}
	.xunlei-fade-enter, .xunlei-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	}

	.xunlei-main {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 5;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	}

	.xunlei-main .wrapper {

	}

	.xunlei-main .scroller {
		
	}

	.openurl .player-info {
		
	}
</style>