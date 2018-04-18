<template>
	<transition name="youliao-fade">
		<div class="youliao-main">   
			<div class="header">
				<span>关注</span>
				<span>推荐</span>
				<span>最新</span>
			</div>
			<!-- <div class="wrapper" ref="wrapper">
			    <div class="scroller" ref="scroller">
			    	<div ref="tscroll-list-container" class="list">
			    		<div class="list-item">
			    			<div class="list-item-left">
			    				<div class="left-img-content">
			    					<img src="http://sl.image.7niu.n0808.com/vf_96cb4a52b8f59653a7020d35abff8305e1a3527e.jpg">
			    				</div>
			    			</div>
			    			<div class="list-item-right">
			    				<div class="right-img-content">
			    					<img src="http://sl.image.7niu.n0808.com/vf_1fb7da8cfb38e5aa197161003f3fcade20a36bf3.jpg">
			    				</div>
			    			</div>
			    		</div>
			    	</div>
			    	<div ref="tscroll-pull-up">加载更多</div>
			    </div>
			</div> -->

			<t-scroll 
			    :pullUpData="pullUpData"
			    v-bind="tScrollOptions"
			    :renderDataList.sync="renderDataList"
			    @pullUpLoading="handlerPullUpLoading"
			>
				<template>
					<div ref="tscroll-list-container" class="list">
						<div 
						    class="list-item"
						    v-for="(item, index) in renderDataList"
						    :key="item.data.key"
						>
							<div class="list-item-left">
								<div class="left-img-content">
									<img :src="item.data.leftData.res_info.dynamic_url">
								</div>
							</div>
							<div class="list-item-right">
								<div class="right-img-content">
									<img :src="item.data.rightData.res_info.dynamic_url">
								</div>
							</div>
						</div>
					</div>
					<div ref="tscroll-pull-up" class="pull-up">
						<img src="../../common/images/common/loading.gif">
						<span>  正在加载中...</span>
					</div>
				</template>
			</t-scroll>

			<div class="footer">
				小葫芦 底部
			</div>
	    </div>
	</transition>
</template>

<script>
    import TScroll from '@/base-components/TScroll.vue'

    let allData = {
	    "card_list":[
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36154961156899840",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1060,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523915755534",
	                    "duration":"18.155102",
	                    "file_name":"80119.mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/90680be376bebd27e78bac05cfe64db9",
	                    "singer":"杜德伟",
	                    "status":1,
	                    "title":"脱掉(圣诞版)",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/4e45bc7de514c8686318e61d697fbd97",
	                    "video_count":119
	                },
	                "comment_count":26,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_98b14ac1961701cde639a743117ba5762c80c0be.jpg",
	                "duration":14,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_98b14ac1961701cde639a743117ba5762c80c0be.jpg",
	                "fav_count":245,
	                "file_size":7624094,
	                "gcid":"98b14ac1961701cde639a743117ba5762c80c0be",
	                "have_fav":false,
	                "id":"36154961156899840",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":340,
	                    "city_name":"深圳",
	                    "code":"340.0",
	                    "desc":"深圳",
	                    "location_name":"深圳"
	                },
	                "play_count":46922,
	                "play_url":"http://sl.video.xycdn.n0808.com/98b14ac1961701cde639a743117ba5762c80c0be?sign=8e9a10dc4c900c6440dd40ff90f29f38&t=5ae330f3&xsign=1524838643-15b7357a7419ae2c2fc2a37ff633fffb",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"06d3acd4abf857ca0589e8737df73e1b7184098f",
	                "share_count":0,
	                "source":"",
	                "status":1,
	                "title":"#你以为你很美，然而……#@有料君 卡死我了",
	                "uid":"664533125",
	                "upline_time":1499673973,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"会跳舞的二B青年",
	                "birthday":"",
	                "city":"",
	                "country":"",
	                "description":"会跳舞的二B青年",
	                "kind":"yl_nvshen",
	                "live_extra":{

	                },
	                "login_time":"2018-02-09 12:51:45",
	                "mail":"",
	                "mobile":"",
	                "newno":"1225151013",
	                "nick_name":"脑门女士",
	                "params":{
	                    "fav_count":13375,
	                    "lastest_res_title":"#行走的表情包#@有料君 我好像个痞子",
	                    "play_count":1969951,
	                    "play_time":2203855,
	                    "pub_res_count":29,
	                    "res_update_time":1503738091,
	                    "share_count":760
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/664533125/default/1500598702/300x300",
	                "province":"",
	                "pub_extra":{
	                    "uid":664533125,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-06-27 11:53:18",
	                "sex":"female",
	                "uid":"664533125",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"664533125",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"664533125",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36154910794583040",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":633,
	                    "category_id":4005,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523962746857",
	                    "duration":"15.281633",
	                    "file_name":"50020.mp3",
	                    "order_id":2438,
	                    "poster_url":"http://image.7niu.n0808.com/0f5c56d66d8220ea8efe5204c67f61ec",
	                    "singer":"尼古拉斯赵四 / 宋小宝",
	                    "status":1,
	                    "title":"谁是舞王",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/3511fe06424ffd8258d763c384387bcc",
	                    "video_count":42
	                },
	                "comment_count":27,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_1fb7da8cfb38e5aa197161003f3fcade20a36bf3.jpg",
	                "duration":14,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_1fb7da8cfb38e5aa197161003f3fcade20a36bf3.jpg",
	                "fav_count":372,
	                "file_size":7952386,
	                "gcid":"1fb7da8cfb38e5aa197161003f3fcade20a36bf3",
	                "have_fav":false,
	                "id":"36154910794583040",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":340,
	                    "city_name":"深圳",
	                    "code":"340.0",
	                    "desc":"深圳",
	                    "location_name":"深圳"
	                },
	                "play_count":49801,
	                "play_url":"http://sl.video.xycdn.n0808.com/1fb7da8cfb38e5aa197161003f3fcade20a36bf3?sign=c3af88e2c9cff3b0a04e0c915835d38b&t=5ae330f3&xsign=1524838643-4d28c0953aa02005ea0b834761985585",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"eea31afdbe6006384392692e339197235fa3d81b",
	                "share_count":55,
	                "source":"",
	                "status":1,
	                "title":"#我的朋友是逗比#@有料君 没形象，手指动一动点赞好不啦～",
	                "uid":"664533125",
	                "upline_time":1499673781,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"会跳舞的二B青年",
	                "birthday":"",
	                "city":"",
	                "country":"",
	                "description":"会跳舞的二B青年",
	                "kind":"yl_nvshen",
	                "live_extra":{

	                },
	                "login_time":"2018-02-09 12:51:45",
	                "mail":"",
	                "mobile":"",
	                "newno":"1225151013",
	                "nick_name":"脑门女士",
	                "params":{
	                    "fav_count":13375,
	                    "lastest_res_title":"#行走的表情包#@有料君 我好像个痞子",
	                    "play_count":1969951,
	                    "play_time":2203855,
	                    "pub_res_count":29,
	                    "res_update_time":1503738091,
	                    "share_count":760
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/664533125/default/1500598702/300x300",
	                "province":"",
	                "pub_extra":{
	                    "uid":664533125,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-06-27 11:53:18",
	                "sex":"female",
	                "uid":"664533125",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"664533125",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"664533125",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36061585372090368",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":50,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523956667024",
	                    "duration":"27.141224",
	                    "file_name":"10050.mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/34598464db3bde983596033896a192a0",
	                    "singer":"西瓜JUN",
	                    "status":1,
	                    "title":"小拳拳捶你胸口",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/9e6a3ca02bd1924f37ae55533a63b0ed",
	                    "video_count":116
	                },
	                "comment_count":44,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_db0be766fba6b0f63c394c9611678abbc2c40f20.jpg",
	                "duration":17,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_db0be766fba6b0f63c394c9611678abbc2c40f20.jpg",
	                "fav_count":408,
	                "file_size":9296154,
	                "gcid":"db0be766fba6b0f63c394c9611678abbc2c40f20",
	                "have_fav":false,
	                "id":"36061585372090368",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":132,
	                    "city_name":"重庆",
	                    "code":"132.0",
	                    "desc":"重庆",
	                    "location_name":"重庆"
	                },
	                "play_count":56829,
	                "play_url":"http://sl.video.xycdn.n0808.com/db0be766fba6b0f63c394c9611678abbc2c40f20?sign=ed8e4ecae5063e33eb79fa3e6e0a65f7&t=5ae330f3&xsign=1524838643-2f7c764b77ea45bf724c6288dfebe850",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"f947d27d38e64c183b48fa60bf184b2672de1cc1",
	                "share_count":10,
	                "source":"",
	                "status":1,
	                "title":"#我要上热门#嫌弃我 哼",
	                "uid":"666428629",
	                "upline_time":1499317773,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"评论我每条都有看 谢谢大家支持🎀微博：林夕MoMo96",
	                "birthday":"19961104",
	                "city":"重庆市",
	                "country":"中华人民共和国",
	                "description":"评论我每条都有看 谢谢大家支持🎀微博：林夕MoMo96",
	                "kind":"rad",
	                "live_extra":{
	                    "head_portrait":"http://img2.user.kanimg.com/usrimg/666428629/300x300",
	                    "last_ptime":"2017-11-16 14:45:12",
	                    "nickname":"林夕MoMo",
	                    "rad_status":"2",
	                    "rad_title":"",
	                    "record_num":"0",
	                    "roomInfo":{
	                        "userid":666428629
	                    },
	                    "roomusers":0,
	                    "sex":"2",
	                    "station":1,
	                    "total_point":580,
	                    "uid":666428629,
	                    "uuid":"49040590"
	                },
	                "login_time":"2018-03-27 17:33:18",
	                "mail":"",
	                "mobile":"152*****605",
	                "newno":"1240091863",
	                "nick_name":"林夕MoMo",
	                "params":{
	                    "fav_count":63276,
	                    "lastest_res_title":"#我要上头条#",
	                    "play_count":7661166,
	                    "play_time":174004,
	                    "pub_res_count":133,
	                    "res_update_time":1513082299,
	                    "share_count":897
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/666428629/300x300",
	                "province":"重庆市",
	                "pub_extra":{
	                    "uid":666428629,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-07-05 18:17:18",
	                "sex":"female",
	                "uid":"666428629",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"666428629",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"666428629",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36293888439225344",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1873,
	                    "category_id":4004,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523965876375",
	                    "duration":"42.834167",
	                    "file_name":"Who - Tujamo,Plastik Funk_01.mp3",
	                    "order_id":1997,
	                    "poster_url":"http://image.7niu.n0808.com/4164fe4cf5c303d2aa2ee07c4bf55b3a",
	                    "singer":"Tujamo,Plastik Funk",
	                    "status":1,
	                    "title":"Who",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/85a75f8c519e4327a19d4a937f0c08e1",
	                    "video_count":141
	                },
	                "comment_count":23,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_9c19896c13216237c480641c4ca24f1c12fc397b.jpg",
	                "duration":15,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_9c19896c13216237c480641c4ca24f1c12fc397b.jpg",
	                "fav_count":206,
	                "file_size":8467305,
	                "gcid":"9c19896c13216237c480641c4ca24f1c12fc397b",
	                "have_fav":false,
	                "id":"36293888439225344",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":132,
	                    "city_name":"重庆",
	                    "code":"132.0",
	                    "desc":"重庆",
	                    "location_name":"重庆"
	                },
	                "play_count":32417,
	                "play_url":"http://sl.video.xycdn.n0808.com/9c19896c13216237c480641c4ca24f1c12fc397b?sign=abbc76790e411fb1b20555341655d20b&t=5ae330f3&xsign=1524838643-9a179ec205d1d2526faa391f3a904fbd",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"c41f308b869cf0891a1f8e1954e71ad9d84f33c4",
	                "share_count":3,
	                "source":"",
	                "status":1,
	                "title":"#我的手指♂戏真多#哈哈……",
	                "uid":"666392632",
	                "upline_time":1500203939,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"愿善良的人被世界温柔以待……",
	                "birthday":"19960228",
	                "city":"重庆市",
	                "country":"中华人民共和国",
	                "description":"愿善良的人被世界温柔以待……",
	                "kind":"per",
	                "live_extra":{

	                },
	                "login_time":"2017-12-14 23:05:17",
	                "mail":"",
	                "mobile":"136*****789",
	                "newno":"1240056380",
	                "nick_name":"•薛洁洁～",
	                "params":{
	                    "fav_count":258,
	                    "lastest_res_title":"#我的手指♂戏真多#哈哈……",
	                    "play_count":38171,
	                    "play_time":8695,
	                    "pub_res_count":2,
	                    "res_update_time":1500203946,
	                    "share_count":3
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/666392632/default/1505837990/300x300",
	                "province":"重庆市",
	                "pub_extra":{
	                    "uid":666392632,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-07-05 14:55:46",
	                "sex":"female",
	                "uid":"666392632",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"666392632",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"666392632",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36042898526702592",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1640,
	                    "category_id":5,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523959202699",
	                    "duration":"17.304156",
	                    "file_name":"你以为你很美，然而.......mp3",
	                    "order_id":2412,
	                    "poster_url":"http://image.7niu.n0808.com/93388c075235c4cc7f2db262534d14f8",
	                    "singer":"有料君",
	                    "status":1,
	                    "title":"你以为你很美，然而......",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/d41bbcaea17b569134012963d957e31e",
	                    "video_count":151
	                },
	                "comment_count":81,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_d4f649ad1c8a6418a04c188facb8c8acb6835ceb.jpg",
	                "duration":16,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_d4f649ad1c8a6418a04c188facb8c8acb6835ceb.jpg",
	                "fav_count":1350,
	                "file_size":10757258,
	                "gcid":"d4f649ad1c8a6418a04c188facb8c8acb6835ceb",
	                "have_fav":false,
	                "id":"36042898526702592",
	                "lat":"",
	                "lng":"",
	                "location_info":{

	                },
	                "play_count":604146,
	                "play_url":"http://sl.video.xycdn.n0808.com/d4f649ad1c8a6418a04c188facb8c8acb6835ceb?sign=e6be79bfa8aab5656ee6a16176b9a08e&t=5ae330f3&xsign=1524838643-b476717089d861d7e00c891a5a8c1c7a",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"91298e5d7cd828a02028024cccb986a55fb7f212",
	                "share_count":354,
	                "source":"",
	                "status":1,
	                "title":"#我要上精选#盗亦有道",
	                "uid":"660430830",
	                "upline_time":1499246488,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"一群制造快乐的人",
	                "birthday":"",
	                "city":"",
	                "country":"",
	                "description":"一群制造快乐的人",
	                "kind":"per",
	                "live_extra":{

	                },
	                "login_time":"2018-04-04 10:46:42",
	                "mail":"",
	                "mobile":"152*****410",
	                "newno":"1233548739",
	                "nick_name":"彦",
	                "params":{
	                    "fav_count":2043,
	                    "lastest_res_title":"#我要上精选#盗亦有道",
	                    "play_count":806229,
	                    "play_time":4809938,
	                    "pub_res_count":10,
	                    "res_update_time":1499246525,
	                    "share_count":363
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/660430830/default/1451577600/300x300",
	                "province":"",
	                "pub_extra":{
	                    "uid":660430830,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-06-07 18:00:01",
	                "sex":"male",
	                "uid":"660430830",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"660430830",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"660430830",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36228186305729536",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1715,
	                    "category_id":3,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523897796674",
	                    "duration":"18.625292",
	                    "file_name":"TOCA.mp3",
	                    "order_id":1700,
	                    "poster_url":"http://image.7niu.n0808.com/6eca3fd3e53aa44c9f484e9b3eb4d34b",
	                    "singer":"Fly Project",
	                    "status":1,
	                    "title":"Toca Toca ",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/0b9079c9fbb21226042b0f3424c0b2a8",
	                    "video_count":454
	                },
	                "comment_count":0,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_96cb4a52b8f59653a7020d35abff8305e1a3527e.jpg",
	                "duration":17,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_96cb4a52b8f59653a7020d35abff8305e1a3527e.jpg",
	                "fav_count":63,
	                "file_size":9317948,
	                "gcid":"96cb4a52b8f59653a7020d35abff8305e1a3527e",
	                "have_fav":false,
	                "id":"36228186305729536",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":158,
	                    "city_name":"长沙",
	                    "code":"158.0",
	                    "desc":"长沙",
	                    "location_name":"长沙"
	                },
	                "play_count":7057,
	                "play_url":"http://sl.video.xycdn.n0808.com/96cb4a52b8f59653a7020d35abff8305e1a3527e?sign=4e1326668cc90243df85ecb97cf66976&t=5ae330f3&xsign=1524838643-9b83bd9b744157722fbe068d9fbc58ea",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"8e938f1e73d171dde7e86849d745f75ce68ae894",
	                "share_count":0,
	                "source":"",
	                "status":1,
	                "title":"我用有料拍摄了一段酷炫的短视频，快来看我",
	                "uid":"666016822",
	                "upline_time":1499953305,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"",
	                "birthday":"",
	                "city":"",
	                "country":"",
	                "description":"",
	                "kind":"per",
	                "live_extra":{

	                },
	                "login_time":"2018-03-26 22:23:25",
	                "mail":"",
	                "mobile":"",
	                "newno":"1239646176",
	                "nick_name":"小泛舟",
	                "params":{
	                    "fav_count":213,
	                    "lastest_res_title":"",
	                    "play_count":28177,
	                    "play_time":24516,
	                    "pub_res_count":18,
	                    "res_update_time":1500369732,
	                    "share_count":0
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/666016822/default/1499953634/300x300",
	                "province":"",
	                "pub_extra":{
	                    "uid":666016822,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-07-03 19:06:53",
	                "sex":"female",
	                "uid":"666016822",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"666016822",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"666016822",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36222942938137600",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":971,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523879797142",
	                    "duration":"32.026122",
	                    "file_name":"80030.mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/400356bb372d219e3237d10f16ccdae1",
	                    "singer":"Tungevaag & Raaban",
	                    "status":1,
	                    "title":"Samsara (Part 2)",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/b0d3b2d4ed259d8e38915e080aff26a3",
	                    "video_count":418
	                },
	                "comment_count":38,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_17e28799f561277acb8c75cb435b265e590bf09f.jpg",
	                "duration":17,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_17e28799f561277acb8c75cb435b265e590bf09f.jpg",
	                "fav_count":350,
	                "file_size":10001208,
	                "gcid":"17e28799f561277acb8c75cb435b265e590bf09f",
	                "have_fav":false,
	                "id":"36222942938137600",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":58,
	                    "city_name":"沈阳",
	                    "code":"58.0",
	                    "desc":"沈阳",
	                    "location_name":"沈阳"
	                },
	                "play_count":57461,
	                "play_url":"http://sl.video.xycdn.n0808.com/17e28799f561277acb8c75cb435b265e590bf09f?sign=b985ee0b131b9654d8019d19fd0c35ae&t=5ae330f3&xsign=1524838643-6d7beb76231802e77a5298e75412e5b5",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"5bb57f13207f1dd21379c1d79ecdaf5a09c9e599",
	                "share_count":25,
	                "source":"",
	                "status":1,
	                "title":"神经病",
	                "uid":"654831543",
	                "upline_time":1499933303,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"沈阳的…跳舞的…嗯…就这样…",
	                "birthday":"",
	                "city":"沈阳市",
	                "country":"中华人民共和国",
	                "description":"沈阳的…跳舞的…嗯…就这样…",
	                "kind":"per",
	                "live_extra":{

	                },
	                "login_time":"2018-02-22 12:22:09",
	                "mail":"",
	                "mobile":"185*****200",
	                "newno":"1215615679",
	                "nick_name":"洋先生",
	                "params":{
	                    "fav_count":3857,
	                    "lastest_res_title":"#有料15秒舞蹈大赛#咖喱给gay…",
	                    "play_count":683415,
	                    "play_time":445443,
	                    "pub_res_count":57,
	                    "res_update_time":1511255704,
	                    "share_count":90
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/654831543/default/1451577600/300x300",
	                "province":"辽宁省",
	                "pub_extra":{
	                    "uid":654831543,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-05-15 19:26:26",
	                "sex":"male",
	                "uid":"654831543",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"654831543",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"654831543",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36107117328860160",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1661,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523958456553",
	                    "duration":"28.839184",
	                    "file_name":"990111増田俊郎 (ますだ としお)-鬼火の童-鬼切、虎徹にございます! (我们是鬼火童子鬼切、虎彻!).mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/1f67dd0e16a7db9ceebfab702185acc5",
	                    "singer":"増田俊郎",
	                    "status":1,
	                    "title":"鬼火の童-鬼切、虎徹にございます!",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/924c435475136fc746329006b2e0b86b",
	                    "video_count":157
	                },
	                "comment_count":127,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_31f2af1a384b0fdd56279485c31223f7d0b2153a.jpg",
	                "duration":15,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_31f2af1a384b0fdd56279485c31223f7d0b2153a.jpg",
	                "fav_count":1020,
	                "file_size":8200392,
	                "gcid":"31f2af1a384b0fdd56279485c31223f7d0b2153a",
	                "have_fav":false,
	                "id":"36107117328860160",
	                "lat":"",
	                "lng":"",
	                "location_info":{

	                },
	                "play_count":295810,
	                "play_url":"http://sl.video.xycdn.n0808.com/31f2af1a384b0fdd56279485c31223f7d0b2153a?sign=f3e703219a1972bf394f82536e5958f7&t=5ae330f3&xsign=1524838643-0a8acc64157567d490a4db17278145ed",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"36a4180f49484443adc1cc3c4cf6c1aaa9bcd82f",
	                "share_count":35,
	                "source":"",
	                "status":1,
	                "title":"#带上有料去旅行#施个忍术",
	                "uid":"476505670",
	                "upline_time":1499491463,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"👑KING.913💗微博：bib-obi💗",
	                "birthday":"",
	                "city":"杭州市",
	                "country":"中华人民共和国",
	                "description":"👑KING.913💗微博：bib-obi💗",
	                "kind":"yl_nvshen",
	                "live_extra":{

	                },
	                "login_time":"2018-04-16 11:57:32",
	                "mail":"",
	                "mobile":"158*****852",
	                "newno":"381757955",
	                "nick_name":"哔啵哔星人",
	                "params":{
	                    "fav_count":123628,
	                    "lastest_res_title":"#你今天真好看#人家明明每天都很好看",
	                    "play_count":22973868,
	                    "play_time":4031300,
	                    "pub_res_count":91,
	                    "res_update_time":1509779521,
	                    "share_count":3779
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/476505670/default/1504767422/300x300",
	                "province":"浙江省",
	                "pub_extra":{
	                    "uid":476505670,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2015-05-27 09:38:16",
	                "sex":"female",
	                "uid":"476505670",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"476505670",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"476505670",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36070035212994560",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1297,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523962662004",
	                    "duration":"42.344438",
	                    "file_name":"10235.mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/24ceac2edf519becb8e3d455a1678c52",
	                    "singer":"林俊杰",
	                    "status":1,
	                    "title":"不潮不用花钱",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/1436b65338a03eff08a360969976dc78",
	                    "video_count":90
	                },
	                "comment_count":10,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_bcecccde4f5bab00c1e6d50a81040a1349be63f5.jpg",
	                "duration":17,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_bcecccde4f5bab00c1e6d50a81040a1349be63f5.jpg",
	                "fav_count":74,
	                "file_size":9289694,
	                "gcid":"bcecccde4f5bab00c1e6d50a81040a1349be63f5",
	                "have_fav":false,
	                "id":"36070035212994560",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":158,
	                    "city_name":"长沙",
	                    "code":"158.0",
	                    "desc":"长沙",
	                    "location_name":"长沙"
	                },
	                "play_count":11449,
	                "play_url":"http://sl.video.xycdn.n0808.com/bcecccde4f5bab00c1e6d50a81040a1349be63f5?sign=accf4273fea70ac29de5b1183115ae54&t=5ae330f3&xsign=1524838643-da431e12430f14960576d816ecb76130",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"c703805877696c2615b0dfae9f7fd11d4b41f8ef",
	                "share_count":0,
	                "source":"",
	                "status":1,
	                "title":"#我要上热门#请你不要到处抠抠",
	                "uid":"613409134",
	                "upline_time":1499350008,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"2017快乐男声，新生代潮流音乐人，新浪微博:Clown_钟枞",
	                "birthday":"",
	                "city":"长沙市",
	                "country":"中华人民共和国",
	                "description":"2017快乐男声，新生代潮流音乐人，新浪微博:Clown_钟枞",
	                "kind":"yl_nanshen",
	                "live_extra":{

	                },
	                "login_time":"2018-03-28 15:05:16",
	                "mail":"",
	                "mobile":"136*****008",
	                "newno":"554577989",
	                "nick_name":"Zc_钟枞",
	                "params":{
	                    "fav_count":9082,
	                    "lastest_res_title":"#我要上热门#演员",
	                    "play_count":1982844,
	                    "play_time":297166,
	                    "pub_res_count":177,
	                    "res_update_time":1511095081,
	                    "share_count":76
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/613409134/default/1508928328/300x300",
	                "province":"湖南省",
	                "pub_extra":{
	                    "uid":613409134,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2016-12-19 03:00:06",
	                "sex":"male",
	                "uid":"613409134",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"613409134",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"613409134",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36130364189052928",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1826,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523960143859",
	                    "duration":"27.132000",
	                    "file_name":"识食物者为俊杰 - 冯提莫_01.mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/3384a249628d00680a2800129fc917c7",
	                    "singer":"冯提莫",
	                    "status":1,
	                    "title":"识食物者为俊杰",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/a270f2004721e07ebe949b84384ca31c",
	                    "video_count":112
	                },
	                "comment_count":65,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_4131fa73573b490e0529827d2ee9ae1df9c65df1.jpg",
	                "duration":17,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_4131fa73573b490e0529827d2ee9ae1df9c65df1.jpg",
	                "fav_count":665,
	                "file_size":8698884,
	                "gcid":"4131fa73573b490e0529827d2ee9ae1df9c65df1",
	                "have_fav":false,
	                "id":"36130364189052928",
	                "lat":"",
	                "lng":"",
	                "location_info":{

	                },
	                "play_count":167316,
	                "play_url":"http://sl.video.xycdn.n0808.com/4131fa73573b490e0529827d2ee9ae1df9c65df1?sign=2d02c819646777e8c0ffd725d4ec7e26&t=5ae330f3&xsign=1524838643-c756656683d0286d9695f14fe46ea3be",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"61cea1a45229f43265e3ad994df71915f659da78",
	                "share_count":16,
	                "source":"",
	                "status":1,
	                "title":"#带上有料去旅行#给宝宝点赞",
	                "uid":"476505670",
	                "upline_time":1499580143,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"👑KING.913💗微博：bib-obi💗",
	                "birthday":"",
	                "city":"杭州市",
	                "country":"中华人民共和国",
	                "description":"👑KING.913💗微博：bib-obi💗",
	                "kind":"yl_nvshen",
	                "live_extra":{

	                },
	                "login_time":"2018-04-16 11:57:32",
	                "mail":"",
	                "mobile":"158*****852",
	                "newno":"381757955",
	                "nick_name":"哔啵哔星人",
	                "params":{
	                    "fav_count":123628,
	                    "lastest_res_title":"#你今天真好看#人家明明每天都很好看",
	                    "play_count":22973868,
	                    "play_time":4031300,
	                    "pub_res_count":91,
	                    "res_update_time":1509779521,
	                    "share_count":3779
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/476505670/default/1504767422/300x300",
	                "province":"浙江省",
	                "pub_extra":{
	                    "uid":476505670,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2015-05-27 09:38:16",
	                "sex":"female",
	                "uid":"476505670",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"476505670",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"476505670",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36273005163709440",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":52,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523962662284",
	                    "duration":"27.648000",
	                    "file_name":"10052.mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/c5ad6ddab9d5d952d4bf690d89297370",
	                    "singer":"DJ Flex / Yo Gotti",
	                    "status":1,
	                    "title":"搓澡舞",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/651bb77489341b68d254d4a6a03cf291",
	                    "video_count":416
	                },
	                "comment_count":23,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_13ad0eabba4252f094446fca06cf7d77d5cf9ae1.jpg",
	                "duration":16,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_13ad0eabba4252f094446fca06cf7d77d5cf9ae1.jpg",
	                "fav_count":142,
	                "file_size":4570591,
	                "gcid":"13ad0eabba4252f094446fca06cf7d77d5cf9ae1",
	                "have_fav":false,
	                "id":"36273005163709440",
	                "lat":"",
	                "lng":"",
	                "location_info":{

	                },
	                "play_count":26503,
	                "play_url":"http://sl.video.xycdn.n0808.com/13ad0eabba4252f094446fca06cf7d77d5cf9ae1?sign=248948c2ec78d0496735eb443428865d&t=5ae330f3&xsign=1524838643-77bf739c4d81c60b34fe8be348569196",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"402aa1315edbfa22b71294b8a62ffb5e28777e2e",
	                "share_count":0,
	                "source":"",
	                "status":1,
	                "title":"#拍有料时的你→_→#老妈你是不可能阻止我录有料的",
	                "uid":"666186595",
	                "upline_time":1500124275,
	                "video_height":960,
	                "video_type":"ps_yl",
	                "video_width":540
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"需要不断的练习微博:ah钟嘉华",
	                "birthday":"",
	                "city":"长沙市",
	                "country":"中华人民共和国",
	                "description":"需要不断的练习微博:ah钟嘉华",
	                "kind":"yl_nanshen",
	                "live_extra":{

	                },
	                "login_time":"2017-11-27 16:48:51",
	                "mail":"",
	                "mobile":"159*****625",
	                "newno":"1239813997",
	                "nick_name":"ahua",
	                "params":{
	                    "fav_count":5389,
	                    "lastest_res_title":"#主播带你拍mv第一弹#估计只有自己看得懂了",
	                    "play_count":661708,
	                    "play_time":25369,
	                    "pub_res_count":85,
	                    "res_update_time":1512555841,
	                    "share_count":35
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/666186595/default/1508383283/300x300",
	                "province":"湖南省",
	                "pub_extra":{
	                    "uid":666186595,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-07-04 14:45:36",
	                "sex":"male",
	                "uid":"666186595",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"666186595",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"666186595",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36064993010255872",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1472,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523962662058",
	                    "duration":"34.670089",
	                    "file_name":"980041.mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/d52012f319f388388c2efb4d47148d62",
	                    "singer":"Angie Miller",
	                    "status":1,
	                    "title":"This Is the Life",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/bd32609e42eab43f001c5b9120096c2f",
	                    "video_count":82
	                },
	                "comment_count":18,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_fe00ea35d48ce5030cc1757873d363c752faafbc.jpg",
	                "duration":16,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_fe00ea35d48ce5030cc1757873d363c752faafbc.jpg",
	                "fav_count":102,
	                "file_size":9003289,
	                "gcid":"fe00ea35d48ce5030cc1757873d363c752faafbc",
	                "have_fav":false,
	                "id":"36064993010255872",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":131,
	                    "city_name":"北京",
	                    "code":"131.0",
	                    "desc":"北京",
	                    "location_name":"北京"
	                },
	                "play_count":36498,
	                "play_url":"http://sl.video.xycdn.n0808.com/fe00ea35d48ce5030cc1757873d363c752faafbc?sign=75e7d567b387faf7cc0fb309b7a10183&t=5ae330f3&xsign=1524838643-f1db65b82bf3fa7479865f6af201063b",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"9163f2b2cc5ea5fd7eda021f1e9cf2afffe6ad99",
	                "share_count":4,
	                "source":"",
	                "status":1,
	                "title":"#我的大学不一样#你们的点赞是我最大的动力",
	                "uid":"664360108",
	                "upline_time":1499330773,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"👑KING.913 微博：麋鹿林7，舞蹈编导，一个有才的cool girl",
	                "birthday":"",
	                "city":"",
	                "country":"",
	                "description":"👑KING.913 微博：麋鹿林7，舞蹈编导，一个有才的cool girl",
	                "kind":"per",
	                "live_extra":{

	                },
	                "login_time":"2017-12-27 20:56:57",
	                "mail":"",
	                "mobile":"133*****925",
	                "newno":"1225104552",
	                "nick_name":"小碗妹妹",
	                "params":{
	                    "fav_count":4437,
	                    "lastest_res_title":"#BEA舞#大家一起来用这个音乐尬舞啊哈哈哈",
	                    "play_count":1734546,
	                    "play_time":760796,
	                    "pub_res_count":28,
	                    "res_update_time":1501662208,
	                    "share_count":74
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/664360108/default/1501832722/300x300",
	                "province":"",
	                "pub_extra":{
	                    "uid":664360108,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-06-26 15:15:22",
	                "sex":"female",
	                "uid":"664360108",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"664360108",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"664360108",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36091399721981952",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":692,
	                    "category_id":0,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523962662154",
	                    "duration":"17.658776",
	                    "file_name":"50079.mp3",
	                    "order_id":0,
	                    "poster_url":"http://image.7niu.n0808.com/aca3205b9bfbb9815caf643e32f4cfea",
	                    "singer":"洛天依",
	                    "status":1,
	                    "title":"神经病之歌",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/2e73db45c66a6678c2989b00dbfdef58",
	                    "video_count":32
	                },
	                "comment_count":25,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_7804b368ce14df9f31f074dcb6b3c033eebe5660.jpg",
	                "duration":17,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_7804b368ce14df9f31f074dcb6b3c033eebe5660.jpg",
	                "fav_count":320,
	                "file_size":9349893,
	                "gcid":"7804b368ce14df9f31f074dcb6b3c033eebe5660",
	                "have_fav":false,
	                "id":"36091399721981952",
	                "lat":"",
	                "lng":"",
	                "location_info":{

	                },
	                "play_count":37608,
	                "play_url":"http://sl.video.xycdn.n0808.com/7804b368ce14df9f31f074dcb6b3c033eebe5660?sign=48aab034d1d20dbf2eea91ab60c5ad87&t=5ae330f3&xsign=1524838643-9cd94bd365154c1012d26921c50e6956",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"229a965705c32ad145b8f7814e3dc47ffd1d0292",
	                "share_count":23,
	                "source":"",
	                "status":1,
	                "title":"#哈哈舞#哈哈舞",
	                "uid":"666701390",
	                "upline_time":1499431506,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"",
	                "birthday":"",
	                "city":"",
	                "country":"",
	                "description":"",
	                "kind":"per",
	                "live_extra":{

	                },
	                "login_time":"",
	                "mail":"",
	                "mobile":"",
	                "newno":"1240362654",
	                "nick_name":"杨清羽$clown",
	                "params":{
	                    "fav_count":557,
	                    "lastest_res_title":"太好笑了",
	                    "play_count":82913,
	                    "play_time":128477,
	                    "pub_res_count":3,
	                    "res_update_time":1499609771,
	                    "share_count":26
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/666701390/default/1499353776/300x300",
	                "province":"",
	                "pub_extra":{
	                    "uid":666701390,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-07-06 23:05:46",
	                "sex":"male",
	                "uid":"666701390",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"666701390",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"666701390",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36137001309179904",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":207,
	                    "category_id":3,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523962928621",
	                    "duration":"28.865306",
	                    "file_name":"30009.mp3",
	                    "order_id":1731,
	                    "poster_url":"http://image.7niu.n0808.com/917a06456e43dff315cb97d5cbaa9b84",
	                    "singer":"Yellow Claw / Quavo / Tinie Tempah / Cesqeaux",
	                    "status":1,
	                    "title":"Stacks ",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/5386339600905b8b43bac9b6a8313d58",
	                    "video_count":78
	                },
	                "comment_count":9,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_f64842a07cc8140cc46bcb5c4e6ee3b2b07b2bc5.jpg",
	                "duration":17,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_f64842a07cc8140cc46bcb5c4e6ee3b2b07b2bc5.jpg",
	                "fav_count":70,
	                "file_size":9160720,
	                "gcid":"f64842a07cc8140cc46bcb5c4e6ee3b2b07b2bc5",
	                "have_fav":false,
	                "id":"36137001309179904",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":158,
	                    "city_name":"长沙",
	                    "code":"158.0",
	                    "desc":"长沙",
	                    "location_name":"长沙"
	                },
	                "play_count":23962,
	                "play_url":"http://sl.video.xycdn.n0808.com/f64842a07cc8140cc46bcb5c4e6ee3b2b07b2bc5?sign=d7aa067ba5a1b996ce654d24b30d4242&t=5ae330f3&xsign=1524838643-b822a873168ff255a4c29664934eed30",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"71c3f8d3ad230485dbb77d61ac972ddf2719b9f7",
	                "share_count":1,
	                "source":"",
	                "status":1,
	                "title":"#惊不惊喜，意不意外#我能说拍完后脑勺撞了个大包么？",
	                "uid":"613409134",
	                "upline_time":1499605462,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"2017快乐男声，新生代潮流音乐人，新浪微博:Clown_钟枞",
	                "birthday":"",
	                "city":"长沙市",
	                "country":"中华人民共和国",
	                "description":"2017快乐男声，新生代潮流音乐人，新浪微博:Clown_钟枞",
	                "kind":"yl_nanshen",
	                "live_extra":{

	                },
	                "login_time":"2018-03-28 15:05:16",
	                "mail":"",
	                "mobile":"136*****008",
	                "newno":"554577989",
	                "nick_name":"Zc_钟枞",
	                "params":{
	                    "fav_count":9082,
	                    "lastest_res_title":"#我要上热门#演员",
	                    "play_count":1982844,
	                    "play_time":297166,
	                    "pub_res_count":177,
	                    "res_update_time":1511095081,
	                    "share_count":76
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/613409134/default/1508928328/300x300",
	                "province":"湖南省",
	                "pub_extra":{
	                    "uid":613409134,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2016-12-19 03:00:06",
	                "sex":"male",
	                "uid":"613409134",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"613409134",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"613409134",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36248053922138112",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":259,
	                    "category_id":4003,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523959027694",
	                    "duration":"40.019592",
	                    "file_name":"30061.mp3",
	                    "order_id":1779,
	                    "poster_url":"http://image.7niu.n0808.com/5b4e1e27cc1212c33acbb2aa0e442e4f",
	                    "singer":"Dan Farber",
	                    "status":1,
	                    "title":"Fresh Off The Grill",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/a94600efd59b63fb987cb079221db6a7",
	                    "video_count":29
	                },
	                "comment_count":34,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_34b1fe20d36e98086075a24f033e95d952946e3b.jpg",
	                "duration":16,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_34b1fe20d36e98086075a24f033e95d952946e3b.jpg",
	                "fav_count":367,
	                "file_size":9228007,
	                "gcid":"34b1fe20d36e98086075a24f033e95d952946e3b",
	                "have_fav":false,
	                "id":"36248053922138112",
	                "lat":"",
	                "lng":"",
	                "location_info":{
	                    "city_code":132,
	                    "city_name":"重庆",
	                    "code":"132.0",
	                    "desc":"重庆",
	                    "location_name":"重庆"
	                },
	                "play_count":43360,
	                "play_url":"http://sl.video.xycdn.n0808.com/34b1fe20d36e98086075a24f033e95d952946e3b?sign=47df2021b9d049cdece1c738fd04a3bb&t=5ae330f3&xsign=1524838643-bcd7f55f55410b7677c60c98aa708f9f",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"ddd24c6fb099d4985a425eb6bf204c1a590507f4",
	                "share_count":8,
	                "source":"",
	                "status":1,
	                "title":"#我差点就信了#我差点就信了",
	                "uid":"666428629",
	                "upline_time":1500029095,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"评论我每条都有看 谢谢大家支持🎀微博：林夕MoMo96",
	                "birthday":"19961104",
	                "city":"重庆市",
	                "country":"中华人民共和国",
	                "description":"评论我每条都有看 谢谢大家支持🎀微博：林夕MoMo96",
	                "kind":"rad",
	                "live_extra":{
	                    "head_portrait":"http://img2.user.kanimg.com/usrimg/666428629/300x300",
	                    "last_ptime":"2017-11-16 14:45:12",
	                    "nickname":"林夕MoMo",
	                    "rad_status":"2",
	                    "rad_title":"",
	                    "record_num":"0",
	                    "roomInfo":{
	                        "userid":666428629
	                    },
	                    "roomusers":0,
	                    "sex":"2",
	                    "station":1,
	                    "total_point":580,
	                    "uid":666428629,
	                    "uuid":"49040590"
	                },
	                "login_time":"2018-03-27 17:33:18",
	                "mail":"",
	                "mobile":"152*****605",
	                "newno":"1240091863",
	                "nick_name":"林夕MoMo",
	                "params":{
	                    "fav_count":63276,
	                    "lastest_res_title":"#我要上头条#",
	                    "play_count":7661166,
	                    "play_time":174004,
	                    "pub_res_count":133,
	                    "res_update_time":1513082299,
	                    "share_count":897
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/666428629/300x300",
	                "province":"重庆市",
	                "pub_extra":{
	                    "uid":666428629,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-07-05 18:17:18",
	                "sex":"female",
	                "uid":"666428629",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"666428629",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"666428629",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        },
	        {
	            "display_type":18,
	            "res_from":"short_video_youliao_share",
	            "res_id":"36200079428163584",
	            "res_info":{
	                "audio_info":{
	                    "audio_id":1854,
	                    "category_id":4001,
	                    "category_id_list":[

	                    ],
	                    "data_type":"loadToMem:1523961676522",
	                    "duration":"25.251200",
	                    "file_name":"男朋友1_1.mp3",
	                    "order_id":1131,
	                    "poster_url":"http://image.7niu.n0808.com/2855b3ca306ba67abcf0224399867bf7",
	                    "singer":"有料君",
	                    "status":1,
	                    "title":"都说了我有男朋友",
	                    "type":"mp3",
	                    "url":"http://image.7niu.n0808.com/69779e12937e0ef5c2f4e88c96d1b4ad",
	                    "video_count":331
	                },
	                "comment_count":78,
	                "cover_url":"http://sl.image.7niu.n0808.com/vf_e54727779aa55660cff398e876a56bc548e7e88d.jpg",
	                "duration":17,
	                "dynamic_url":"http://sl.image.7niu.n0808.com/vf_e54727779aa55660cff398e876a56bc548e7e88d.jpg",
	                "fav_count":1060,
	                "file_size":9336125,
	                "gcid":"e54727779aa55660cff398e876a56bc548e7e88d",
	                "have_fav":false,
	                "id":"36200079428163584",
	                "lat":"",
	                "lng":"",
	                "location_info":{

	                },
	                "play_count":468330,
	                "play_url":"http://sl.video.xycdn.n0808.com/e54727779aa55660cff398e876a56bc548e7e88d?sign=08750f06a3ff0e95c42718dfe5827e0f&t=5ae330f3&xsign=1524838643-7348c68e062c0ee6a33307d943ac76de",
	                "poster_height":960,
	                "poster_width":540,
	                "real_gcid":"c973f4dea1fe20327bb37ef0787c84f408b600c2",
	                "share_count":0,
	                "source":"",
	                "status":1,
	                "title":"#都说了我有男朋友#扎心了老铁哈哈哈 记得送我小心心喔",
	                "uid":"660170956",
	                "upline_time":1499846086,
	                "video_height":1280,
	                "video_type":"ps_yl",
	                "video_width":720
	            },
	            "res_type":"short_video",
	            "user_info":{
	                "biography":"👑 KING.913 不只爱transition谢谢你的喜欢谢谢你的爱❤️",
	                "birthday":"19970421",
	                "city":"北京市",
	                "country":"中华人民共和国",
	                "description":"👑 KING.913 不只爱transition谢谢你的喜欢谢谢你的爱❤️",
	                "kind":"yl_nvshen",
	                "live_extra":{

	                },
	                "login_time":"2018-02-10 22:11:26",
	                "mail":"",
	                "mobile":"156*****020",
	                "newno":"1223552045",
	                "nick_name":"道行尚浅小师妹",
	                "params":{
	                    "fav_count":45543,
	                    "lastest_res_title":"#给我一个舞台我就能出道#这首歌终于拍成我喜欢的样子了copy毒舌哑巴",
	                    "play_count":6921549,
	                    "play_time":5366103,
	                    "pub_res_count":161,
	                    "res_update_time":1508745251,
	                    "share_count":499
	                },
	                "portrait_url":"http://img2.user.kanimg.com/usrimg/660170956/default/1518270849/300x300",
	                "province":"北京市",
	                "pub_extra":{
	                    "uid":660170956,
	                    "v_comment":"",
	                    "v_status":0,
	                    "v_url":"http://7xnvqo.com1.z0.glb.clouddn.com/9f3d6885b3807da9018df8351f1ec254d27da2e8"
	                },
	                "register_date":"2017-06-06 16:02:41",
	                "sex":"female",
	                "uid":"660170956",
	                "vip_extra":[
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"0",
	                        "uid":"660170956",
	                        "vasID":2,
	                        "vasType":"0"
	                    },
	                    {
	                        "VIPLevel":"0",
	                        "isVIP":"0",
	                        "isYear":"-1",
	                        "uid":"660170956",
	                        "vasID":14,
	                        "vasType":"0"
	                    }
	                ]
	            }
	        }
	    ],
	    "length":16,
	    "result":"ok",
	    "ts":"1523974643"
	}

    let key = 0

    function getRandomData() {
    	let ret = [], self = this
        for (let i = 0, len = 20; i < len; i++) {
        	let index = Math.floor(Math.random() * allData.length)
        	let leftData = allData.card_list[index]
        	index = Math.floor(Math.random() * allData.length)
        	let rightData = allData.card_list[index]
			ret.push({ leftData, rightData, key: key++ })
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
		components: { TScroll },
		data() {
			return {
				pullUpData: [],
				renderDataList: [],
				tScrollOptions: {
					scrollBarOption: {
						show: true,
						fade: false
					},
					scrollOption: {
						excrMin: 40 + 40,
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
		}
	}
</script>

<style scoped>
    .youliao-fade-enter-active, .youliao-fade-leave-active {
		transition: all .3s;
	}
	.youliao-fade-enter, .youliao-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	}

	.youliao-main {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 6;
		top: 0;
		left: 0;
		right: 0;
		background-color: #eee;
		display: flex;
		flex-direction: column;
	}

	.youliao-main .header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        height: 0.533333rem;
        font-size: 16px;
        z-index: 10;
        background-color: #fff;
	}
	.youliao-main .header span {
        padding: 0 0.133333rem;
	}

	.youliao-main .footer {
        display: flex;
        justify-content: center;
        align-items: center;
		height: 0.533333rem;
        flex: none;
        font-size: 16px;
        z-index: 10;
        background-color: #fff;
	}

	.youliao-main .wrapper {
		flex: 1;
		position: relative;
		z-index: 8;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.youliao-main .list-item {
		display: flex;
		position: absolute;
		flex-direction: row;
		flex-wrap: nowrap;
		width: 100%;
	}
	.list-item .list-item-left {
		position: relative;
        padding-right: 0.006667rem;
        padding-bottom: 0.006667rem;
	}
	.list-item .list-item-right {
		position: relative;
		padding-left: 0.006667rem;
        padding-bottom: 0.006667rem;
	}
	.youliao-main .left-img-content {
        flex: 1;
        position: relative;
        height: 0;
        overflow: hidden;
        width: 2.5rem;
        padding-top: 177.777%;
	}
	.youliao-main .right-img-content {
        flex: 1;
        position: relative;
        height: 0;
        overflow: hidden;
        width: 2.5rem;
        padding-top: 177.777%;
	}
	.youliao-main .list-item img {
		width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0; 
	}

	.youliao-main .pull-up {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 0.533333rem;
		background-color: #FFFAF0;
	}
	.youliao-main .pull-up img {
		width: 0.266667rem;
		height: 0.266667rem;
	}
</style>