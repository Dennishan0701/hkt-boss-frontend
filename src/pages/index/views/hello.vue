<template>
    <div class="hello-content">
        <div class="hello-wrap">
            <div class="hello-head">
                <p class="display_name">尊敬的{{ name }}</p>
                <p>欢迎来到BOSS系统</p>
            </div>
            <img class="emptyGif" src="../../../assets/image/home.gif">
        </div>
    </div>
</template>
<style lang="less">
    .layout-content {
        background-color: #e3e3e3 !important;
        /*overflow: hidden !important;*/
    }
    .hello-content {
        width: 100%;
        height: 100%;
        position: relative;
        .hello-wrap{
            position: absolute;
            width: 600px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .hello-head {
                text-align: center;
                min-width: 200px;
                margin: 0 auto;
                p:first-child {
                    font-size: 26px;
                    line-height: 48px;
                    color: #212121;
                }
                p:nth-child(2) {
                    font-size: 22px;
                    padding-top: 20px;
                    display: inline-block;
                }
            }
            .emptyGif {
                width: 100%;
                margin: 0 auto;
                display: block;
            }
        }
    }
</style>
<script>
  import {getPermission} from '@/api/common';
  export default {
    data() {
      return {
        name: JSON.parse(sessionStorage.getItem('auth_user')).name,
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      getPermission();//获取权限
    },
    methods: {}
  }
</script>
