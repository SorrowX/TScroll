<template>
	<transition name="xunlei-fade">
		<div class="xunlei-main">   
			<t-scroll 
			    :pullUpData="pullUpData"
			    :renderDataList.sync="renderDataList"
			    v-bind="tScrollOptions"
			    @pullUpLoading="handlerPullUpLoading"
			>
				<template>
					<div ref="tscroll-list-container" class="list-show">
			    		<div 
			    		    class="openurl" 
						    v-for="(item, index) in renderDataList"
			    		    :key="item.data.id"
			    		>
			    			<div class="player-info">
			    				<div class="player">
			    					<div class="avatar">
			    						<img :src="item.data.image" alt="item.data.nickname">
			    					</div>
		    						<P>{{ item.data.nickname }}</P>
			    				</div>
			    				<div class="see">
			    					<p>
			    						<span>{{ item.data.onlineNum }}</span>
			    						人 在看
			    					</p>
			    				</div>
			    			</div>
			    			<div class="entry-wp">
			    				<div class="vedio-pic">
			    					<img :src="item.data.image">
			    				</div>
			    				<p class="tip">直播</p>
			    			</div>
			    			<div class="des-show" v-show="item.data.title">
			    				<p>{{ item.data.title }}</p>
			    			</div>
                            <div class="delimiter"></div>
			    		</div>
			    	</div>
			    	<div ref="tscroll-pull-up" class="loading">loading</div>
				</template>
			</t-scroll>
	    </div>
	</transition>
</template>

<script>
    import TScroll from '@/base-components/TScroll.vue'

    let allData = {
        "result": 0,
        "message": "ok",
        "data": [{
            "userid": "673369340",
            "status": 1,
            "title": "",
            "image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/0\/815ffda76125b8a5ea472075ca3e63d5.jpg",
            "stream_server": 1,
            "start_time": "2018-04-16 19:49:26",
            "play_url": "",
            "play_hls_url": "",
            "platform": 2,
            "current_point": 4800,
            "current_income": 2095,
            "current_user": 88,
            "record_file": 0,
            "record_status": 1,
            "appos": "ios",
            "appver": "2.9.41",
            "is_official": 0,
            "uuid": "1248301080",
            "roomid": "13598_673369340",
            "stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/13598_673369340",
            "stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/13598_673369340.m3u8",
            "stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/13598_673369340.flv",
            "isvcaccept": 1,
            "model": "iPhone6",
            "osver": "9.3.3",
            "is_answer": 0,
            "current_point_ext": 230,
            "is_confluence": 0,
            "onlinenum": 2497,
            "userinfo": {
                "nickname": "【WS】丫头困难户",
                "avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/673369340\/300x300?t=1523813593",
                "avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/673369340\/100x100?t=1523813593",
                "avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/673369340\/300x300"
            },
            "blocklevel": false,
            "seq2": {
                "onlinenum": 2497,
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
                "playerviewtime": 474,
                "current_point": 4800,
                "current_point_ext": 230,
                "stream_ai": 100,
                "stream_si": 100,
                "blocklevel": "",
                "second_roomnum": 26142,
                "second_playerviewtime": 37017,
                "high_current_point": 70210
            },
            "top": 0,
            "first_play_time": "2017-08-09 21:28:19",
            "gif": "",
            "tag": "",
            "level_info": {
                "total_point": 21680690,
                "manager_num": 8,
                "station": 2,
                "pendant": 2,
                "level": 20,
                "next": 4815310,
                "next_total": 6000000,
                "image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_2.png",
                "station_name": "人气主播",
                "level_next": 21,
                "image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv20.png",
                "image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv20.png"
            },
            "seq2_score": 422161949,
            "index": 1
        },
        {
            "userid": "680992825",
            "status": 1,
            "title": "",
            "image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/5\/68034114d293e322feee9afa2c852ad6.jpg",
            "stream_server": 1,
            "start_time": "2018-04-16 20:03:35",
            "play_url": "",
            "play_hls_url": "",
            "platform": 2,
            "current_point": 198990,
            "current_income": 99295,
            "current_user": 588,
            "record_file": 0,
            "record_status": 1,
            "appos": "ios",
            "appver": "2.9.41",
            "is_official": 0,
            "uuid": "1266419608",
            "roomid": "12980_680992825",
            "stream_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/12980_680992825.flv",
            "stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/12980_680992825.m3u8",
            "stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/12980_680992825.flv",
            "isvcaccept": 1,
            "model": "iPhone6 Plus",
            "osver": "10.3.3",
            "is_answer": 0,
            "current_point_ext": 70210,
            "is_confluence": 0,
            "onlinenum": 7196,
            "userinfo": {
                "nickname": "CK清清🌻随心随缘",  
                "avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/680992825\/300x300?t=1523288596",
                "avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/680992825\/100x100?t=1523288596",
                "avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/680992825\/300x300"
            },
            "blocklevel": false,
            "seq2": {
                "onlinenum": 7196,
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
                "playerviewtime": 300,
                "current_point": 198990,
                "current_point_ext": 70210,
                "stream_ai": 100,
                "stream_si": 100,
                "blocklevel": "",
                "second_roomnum": 26142,
                "second_playerviewtime": 37017,
                "high_current_point": 70210
            },
            "top": 0,
            "first_play_time": "2017-09-19 14:07:58",
            "gif": "",
            "tag": "",
            "level_info": {
                "total_point": 15411260,
                "manager_num": 8,
                "station": 2,
                "pendant": 2,
                "level": 18,
                "next": 164740,
                "next_total": 3960000,
                "image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_2.png",
                "station_name": "人气主播",
                "level_next": 19,
                "image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv18.png",
                "image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv18.png"
            },
            "seq2_score": 132302003,
            "index": 2
        },
        {
            "userid": "662240780",
            "status": 1,
            "title": "成全你的成全",
            "image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/0\/66ef6c90a61a2bf7c3b32c9f138d290a.jpg",
            "stream_server": 1,
            "start_time": "2018-04-16 21:28:39",
            "play_url": "",
            "play_hls_url": "",
            "platform": 2,
            "current_point": 47140,
            "current_income": 23370,
            "current_user": 136,
            "record_file": 0,
            "record_status": 1,
            "appos": "ios",
            "appver": "2.9.40",
            "is_official": 0,
            "uuid": "1235946248",
            "roomid": "19359_662240780",
            "stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/19359_662240780",
            "stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/19359_662240780.m3u8",
            "stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/19359_662240780.flv",
            "isvcaccept": 1,
            "model": "iPhone6s",
            "osver": "11.3",
            "is_answer": 0,
            "online_user_num": 0,
            "onlinenum": 1706,
            "server_time": "2018-04-16 21:28:39",
            "current_point_ext": 46600,
            "is_confluence": 0,
            "userinfo": {
                "nickname": "猫小萌-🐱求过任务",
                "avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/662240780\/300x300?t=1523854750",
                "avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/662240780\/100x100?t=1523854750",
                "avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/662240780\/300x300"
            },
            "blocklevel": false,
            "seq2": {
                "onlinenum": 1706,
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
                "playerviewtime": 457,
                "current_point": 47140,
                "current_point_ext": 46600,
                "stream_ai": 100,
                "stream_si": 100,
                "blocklevel": "",
                "second_roomnum": 26142,
                "second_playerviewtime": 37017,
                "high_current_point": 70210
            },
            "top": 0,
            "first_play_time": "2017-06-17 14:55:55",
            "gif": "",
            "tag": "",
            "level_info": {
                "total_point": 35272289,
                "manager_num": 10,
                "station": 2,
                "pendant": 2,
                "level": 22,
                "next": 6943711,
                "next_total": 8520000,
                "image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_2.png",
                "station_name": "人气主播",
                "level_next": 23,
                "image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv22.png",
                "image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv22.png"
            },
            "seq2_score": 131232128,
            "index": 3
        },
        {
            "userid": "561667036",
            "status": 1,
            "title": "",
            "image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/6\/9b3c41213f75940ada4a28442ca91e3b.jpg",
            "stream_server": 1,
            "start_time": "2018-04-16 20:00:25",
            "play_url": "",
            "play_hls_url": "",
            "platform": 2,
            "current_point": 488690,
            "current_income": 243410,
            "current_user": 1775,
            "record_file": 0,
            "record_status": 1,
            "appos": "ios",
            "appver": "2.9.30",
            "is_official": 0,
            "uuid": "10036",
            "roomid": "17323_561667036",
            "stream_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/17323_561667036.flv",
            "stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/17323_561667036.m3u8",
            "stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/17323_561667036.flv",
            "isvcaccept": 1,
            "model": "iPhone6s Plus",
            "osver": "11.3",
            "is_answer": 0,
            "current_point_ext": 33530,
            "onlinenum": 15123,
            "userinfo": {
                "nickname": "💕莫嘉倪Monica🎹",
                "avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/561667036\/300x300?t=1523706183",
                "avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/561667036\/100x100?t=1523706183",
                "avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/561667036\/300x300"
            },
            "blocklevel": false,
            "seq2": {
                "onlinenum": 15123,
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
                "playerviewtime": 231,
                "current_point": 488690,
                "current_point_ext": 33530,
                "stream_ai": 100,
                "stream_si": 100,
                "blocklevel": "",
                "second_roomnum": 26142,
                "second_playerviewtime": 37017,
                "high_current_point": 70210
            },
            "top": 0,
            "first_play_time": "2017-01-01 00:00:00",
            "gif": "",
            "tag": "",
            "level_info": {
                "total_point": 233171223,
                "manager_num": 18,
                "station": 3,
                "pendant": 3,
                "level": 33,
                "next": 24204777,
                "next_total": 30960000,
                "image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_3.png",
                "station_name": "头牌主播",
                "level_next": 34,
                "image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv33.png",
                "image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv33.png"
            },
            "seq2_score": 129872000,
            "index": 4
        },
        {
            "userid": "696442509",
            "status": 1,
            "title": "",
            "image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/9\/12bad7be162567a80c566506985e4624.jpg",
            "stream_server": 1,
            "start_time": "2018-04-16 18:03:25",
            "play_url": "",
            "play_hls_url": "",
            "platform": 2,
            "current_point": 69540,
            "current_income": 34420,
            "current_user": 567,
            "record_file": 0,
            "record_status": 1,
            "appos": "ios",
            "appver": "2.9.41",
            "is_official": 0,
            "uuid": "1296550089",
            "roomid": "16241_696442509",
            "stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/16241_696442509",
            "stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/16241_696442509.m3u8",
            "stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/16241_696442509.flv",
            "isvcaccept": 1,
            "model": "iPhone6 Plus",
            "osver": "11.2.5",
            "is_answer": 0,
            "current_point_ext": 42320,
            "is_confluence": 0,
            "onlinenum": 6161,
            "userinfo": {
                "nickname": "话社🌞小宝耿直girl…🙏陪伴",
                "avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/696442509\/300x300?t=1523843594",
                "avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/696442509\/100x100?t=1523843594",
                "avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/696442509\/300x300"
            },
            "blocklevel": false,
            "seq2": {
                "onlinenum": 6161,
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
                "playerviewtime": 597,
                "current_point": 69540,
                "current_point_ext": 42320,
                "stream_ai": 100,
                "stream_si": 100,
                "blocklevel": "",
                "second_roomnum": 26142,
                "second_playerviewtime": 37017,
                "high_current_point": 70210
            },
            "top": 0,
            "first_play_time": "2017-12-14 17:57:58",
            "gif": "",
            "tag": "",
            "level_info": {
                "total_point": 14279470,
                "manager_num": 8,
                "station": 2,
                "pendant": 2,
                "level": 18,
                "next": 1296530,
                "next_total": 3960000,
                "image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_2.png",
                "station_name": "人气主播",
                "level_next": 19,
                "image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv18.png",
                "image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv18.png"
            },
            "seq2_score": 128301803,
            "index": 5
        },
        {
            "userid": "698753182",
            "status": 1,
            "title": "",
            "image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/2\/4b65ed221a80e269f79abae1f5affc7d.jpg",
            "stream_server": 1,
            "start_time": "2018-04-16 19:35:26",
            "play_url": "",
            "play_hls_url": "",
            "platform": 2,
            "current_point": 40180,
            "current_income": 19980,
            "current_user": 332,
            "record_file": 0,
            "record_status": 1,
            "appos": "ios",
            "appver": "2.9.35",
            "is_official": 0,
            "uuid": "1299560748",
            "roomid": "13536_698753182",
            "stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/13536_698753182",
            "stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/13536_698753182.m3u8",
            "stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/13536_698753182.flv",
            "isvcaccept": 2,
            "model": "iPhone 8 Plus",
            "osver": "11.3",
            "is_answer": 0,
            "current_point_ext": 33550,
            "is_confluence": 0,
            "online_user_num": 17271,
            "onlinenum": 20422,
            "server_time": "2018-04-16 21:16:08",
            "userinfo": {
                "nickname": "U娱-乳妹🍼♡求荧光棒",
                "avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/698753182\/300x300?t=1523696827",
                "avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/698753182\/100x100?t=1523696827",
                "avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/698753182\/300x300"
            },
            "blocklevel": false,
            "seq2": {
                "onlinenum": 20422,
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
                "playerviewtime": 303,
                "current_point": 40180,
                "current_point_ext": 33550,
                "stream_ai": 100,
                "stream_si": 100,
                "blocklevel": "",
                "second_roomnum": 26142,
                "second_playerviewtime": 37017,
                "high_current_point": 70210
            },
            "top": 0,
            "first_play_time": "2017-12-29 19:01:57",
            "gif": "",
            "tag": "",
            "level_info": {
                "total_point": 3587880,
                "manager_num": 5,
                "station": 1,
                "pendant": 1,
                "level": 14,
                "next": 708120,
                "next_total": 1320000,
                "image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_1.png",
                "station_name": "迅雷主播",
                "level_next": 15,
                "image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv14.png",
                "image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv14.png"
            },
            "seq2_score": 127581935,
            "index": 6
        },
        {
            "userid": "655418614",
            "status": 1,
            "title": "（；￣ェ￣）",
            "image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/4\/0b9a2fcac268eb6a38a530fdf2bcbd91.jpg",
            "stream_server": 1,
            "start_time": "2018-04-16 20:42:20",
            "play_url": "",
            "play_hls_url": "",
            "platform": 2,
            "current_point": 97500,
            "current_income": 48630,
            "current_user": 652,
            "record_file": 0,
            "record_status": 1,
            "appos": "ios",
            "appver": "2.9.30",
            "is_official": 0,
            "uuid": "1216284847",
            "roomid": "13540_655418614",
            "stream_pull": "rtmp:\/\/rtmp.stream.show.xunlei.com\/xlapp\/13540_655418614",
            "stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/13540_655418614.m3u8",
            "stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/13540_655418614.flv",
            "isvcaccept": 1,
            "model": "iPhone6",
            "osver": "10.3.2",
            "is_answer": 0,
            "current_point_ext": 18340,
            "is_confluence": 0,
            "online_user_num": 4175,
            "onlinenum": 6157,
            "server_time": "2018-04-16 21:51:03",
            "userinfo": {
                "nickname": "酥彤❤️求守护😢",
                "avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/655418614\/300x300?t=1523814558",
                "avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/655418614\/100x100?t=1523814558",
                "avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/655418614\/300x300"
            },
            "blocklevel": false,
            "seq2": {
                "onlinenum": 6157,
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
                "playerviewtime": 210,
                "current_point": 97500,
                "current_point_ext": 18340,
                "stream_ai": 100,
                "stream_si": 100,
                "blocklevel": "",
                "second_roomnum": 26142,
                "second_playerviewtime": 37017,
                "high_current_point": 70210
            },
            "top": 0,
            "first_play_time": "2017-05-18 21:17:23",
            "gif": "",
            "tag": "",
            "level_info": {
                "total_point": 68164937,
                "manager_num": 10,
                "station": 3,
                "pendant": 3,
                "level": 25,
                "next": 8731063,
                "next_total": 13200000,
                "image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_3.png",
                "station_name": "头牌主播",
                "level_next": 26,
                "image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv25.png",
                "image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv25.png"
            },
            "seq2_score": 127362042,
            "index": 7
        },
        {
            "userid": "659761605",
            "status": 1,
            "title": "爱笑的女孩运气不会差",
            "image": "http:\/\/cdn3.live.xunlei.com\/cdn\/avatar\/5\/e9c578b67188610ad69cd16edde39259.jpg",
            "stream_server": 1,
            "start_time": "2018-04-16 21:38:40",
            "play_url": "",
            "play_hls_url": "",
            "platform": 2,
            "current_point": 29820,
            "current_income": 13310,
            "current_user": 833,
            "record_file": 0,
            "record_status": 1,
            "appos": "ios",
            "appver": "2.9.40",
            "is_official": 0,
            "uuid": "1223062766",
            "roomid": "13308_659761605",
            "stream_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/13308_659761605.flv",
            "stream_hls_pull": "http:\/\/pullhls.stream.show.xunlei.com\/xlapp\/13308_659761605.m3u8",
            "stream_flv_pull": "http:\/\/pull.stream.show.xunlei.com\/xlapp\/13308_659761605.flv",
            "isvcaccept": 1,
            "model": "iPhone6s",
            "osver": "10.3.3",
            "is_answer": 0,
            "current_point_ext": 18800,
            "is_confluence": 0,
            "onlinenum": 1936,
            "userinfo": {
                "nickname": "师妹❤️爱素颜",
                "avatar": "http:\/\/img2.user.kanimg.com\/usrimg\/659761605\/300x300?t=1523671634",
                "avatar2": "http:\/\/img2.user.kanimg.com\/usrimg\/659761605\/100x100?t=1523671634",
                "avatar_xl": "http:\/\/img2.user.kanimg.com\/usrimg\/659761605\/300x300"
            },
            "blocklevel": false,
            "seq2": {
                "onlinenum": 1936,
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
                "playerviewtime": 165,
                "current_point": 29820,
                "current_point_ext": 18800,
                "stream_ai": 100,
                "stream_si": 100,
                "blocklevel": "",
                "second_roomnum": 26142,
                "second_playerviewtime": 37017,
                "high_current_point": 70210
            },
            "top": 0,
            "first_play_time": "2017-06-04 23:22:56",
            "gif": "",
            "tag": "",
            "level_info": {
                "total_point": 73236372,
                "manager_num": 10,
                "station": 3,
                "pendant": 3,
                "level": 25,
                "next": 3659628,
                "next_total": 13200000,
                "image_pendant": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/pendant\/pendant_3.png",
                "station_name": "头牌主播",
                "level_next": 26,
                "image_leve": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/old\/lv25.png",
                "image_level2": "http:\/\/cdn3.live.xunlei.com\/cdn\/player_image\/level\/oldcard\/lv25.png"
            },
            "seq2_score": 127262138,
            "index": 8
        }]
    }

    let key = 0

    function getRandomData() {
    	let ret = [], self = this
        for (let i = 0, len = 20; i < len; i++) {
        	let index = Math.floor(Math.random() * allData.data.length)
        	let obj = allData.data[index]
			ret.push({
				image: obj.userinfo.avatar,
				nickname: obj.userinfo.nickname,
				onlineNum: obj.onlinenum,
				title: obj.title,
                id: key ++
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

    // 以上都是前戏,下面才是主角,主角就该如此简单 tScrollOptions配置可省略哦
	export default {
		components: { TScroll },
		data() {
			return {
				pullUpData: [],
				renderDataList: [],
                tScrollOptions: {
					scrollBarOption: {
						show: true,
						fade: true
					},
					scrollOption: {
						maxSpeed: 1.4,
						sensitivity: 1,
						pullDownDistance: 0,
						preventDefault: false
					}
				}
			}
		},
		methods: {
			handlerPullUpLoading() {
				mockData(1500).then((ret) => {
					this.pullUpData = ret
				})
			}
		},
        mounted() {
        	mockData(100).then((ret) => {
        		this.pullUpData = ret
        	})

            console.log('vm.$Lazyload', this.$Lazyload)
        }
	}
</script>

<style scoped>
    .xunlei-fade-enter-active, .xunlei-fade-leave-active {
		transition: all .3s;
	}
	.xunlei-fade-enter, .xunlei-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
        opacity: 0;
	}

	.xunlei-main {
		width: 100%;
		height: 100%;
        max-width: 540px;
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		right: 0;
        bottom: 0;
        margin: auto;
		background-color: #efefef;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
	}

	.xunlei-main .wrapper { }

	.xunlei-main .scroller {  }

    .xunlei-main .list-show {
        background-color: #efefef;
    }

	.openurl {
		background-color: #fff;
		position: absolute;
		width: 100%;
	}

	.openurl .player-info {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		height: 0.533333rem;
		padding: 0.12rem 0.133333rem;
	}
	.openurl .player {
        display: flex;
        flex: row nowrap;
        align-items: center;
	}
	.openurl .avatar img {
		width: 0.533333rem;
		height: 0.533333rem;
		border-radius: 50%;
	}
	.openurl .player p {
        padding-left: 0.133333rem;
        color: #2d2d2d;
        font-size: 14px;
	}
	.see p span {
        color: red;
	}

	.entry-wp {
        position: relative;
	}
	.entry-wp .vedio-pic{
        position: relative;
        overflow: hidden;
        padding-top: 80%;
        height: 0;

	}
	.entry-wp img {
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0; 
	}
	.entry-wp .tip {
		position: absolute;
		left: 0;
		top: 0.12rem;
		height: 0.266667rem;
		padding: 0 0.133333rem;
		background-color: #000;
		color: #fff;
	}

	.openurl .des-show {
		height: 0.4rem;
		display: flex;
		flex: row nowrap;
		align-items: center;
		padding: 0 0.133333rem;
	}
	.openurl .des-show p {
		font-size: 15px;
	}

    .openurl .delimiter {
        height: 0.12rem;
        background-color: #efefef;
    }

	.xunlei-main .loading {
		height: 0.533333rem;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFAF0;
		position: absolute;
	}
</style>