<template>
  <div class="home">
      <t-scroll-x 
          :simpleScroll="simpleScroll"
      >
          <template>
              <ul ref="tscroll-list-container" class="tscroll-list-container">
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/youliao" tag="li">有料短视频</router-link>
                  <router-link to="/sv/1" tag="li">视频</router-link>
                  <router-link :to="{ name: 'my-video', params: { id: 1 } }" tag="li">我的视频</router-link>
                  <router-link to="/banner" tag="li">根据高宽比自动计算高度的轮播器</router-link>
                  <router-link to="/banner2" tag="li">指定高度的轮播(图片播放器)</router-link>
                  <router-link to="/waterfall" tag="li">瀑布流</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/xunlei-live" tag="li">迅雷直播</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
              </ul>
          </template>
      </t-scroll-x>
      <router-view></router-view>
  </div>
</template>

<script>
    import TScrollX from '@/base-components/TScrollX.vue'
    export default {
        name: 'Home',
        components: { TScrollX },
        data () {
            return {
                simpleScroll: '',
            }
        },
        mounted() {
            this.simpleScroll = 'translateY'
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home {
        position: fixed;
        z-index: 10;
        width: 100%;
        height: 100%;
        max-width: 540px;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        overflow: hidden;
        background-color: #eee;
    }

    .home .tscroll-list-container li {
        width: 100%;
        height: 40px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 3;
        padding-left: 10px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
    }
</style>
