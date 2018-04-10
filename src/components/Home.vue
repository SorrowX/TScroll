<template>
  <div class="home">
      <t-scroll 
          :simpleScroll="simpleScroll"
      >
          <template>
              <ul ref="tscroll-list-container" class="tscroll-list-container">
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
                  <router-link to="/simple-tscroll" tag="li">SimpleTscroll</router-link>
              </ul>
          </template>
      </t-scroll>
      <router-view></router-view>
  </div>
</template>

<script>
    import TScroll from '@/base-components/TScroll.vue'
    export default {
        name: 'Home',
        components: { TScroll },
        data () {
            return {
                simpleScroll: ''
            }
        },
        mounted() {
            this.simpleScroll = 'simple'
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        overflow: hidden;
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
