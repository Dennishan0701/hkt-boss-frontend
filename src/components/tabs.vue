<!--tab-->
<template>
    <div id="tabs">
        <Tabs v-if="ready" type="card" :animated="false" :class="tabClass" class="tabs" @on-click="changeTab" v-model="tabStatus">
            <TabPane v-for="(item,index) in tabList" :key="index" v-if="item.show" :name="item.name"
            :label="label(item)" :class="item.name">
                     <!--:label="label" :class="item.name">-->
                <!--<Tooltip max-width="200" content="111">-->
                    <!--{{item.label}}-->
                <!--</Tooltip>-->
            </TabPane>
        </Tabs>
    </div>

</template>

<script type="es6">
  import {isMenu, getPermission} from '@/api/common';
  import {setSession, getSession, removeSession} from '@/assets/js/storage';

  export default {
    props: {},
    data() {
      return {
        ready: false,
        tabStatus: '',
        label(item){
          return (h)=>{
            return h('Tooltip', {
              props: {
                content: item.content,
                'max-width': 200,
                transfer: true,
                placement: "bottom-start",
                delay: 500,
                theme: "light"
              }
            }, [
              h('p',item.label),
            ])
          };
        },
      }
    },
    watch: {},
    computed: {},
    mounted() {
      let firstTab = [];
      getPermission().then(res => {
        // console.log(res);
        let that = this;
        this.tabList.forEach(function (item, index) {
          // item.show=that.isMenu(item.name);
          // that.$set(that.tabList,index, that.tabList[index])
          item.show = item.show || that.isMenu(item.name)
          if (item.show) {
            firstTab.push(item.name);
          }
        })
        this.ready = true
        that.tabStatus = firstTab.includes(getSession('tab_status')) ? getSession('tab_status') : firstTab[0];
        // console.log(that.tabStatus);
        that.$emit('changeTab', that.tabStatus)
      })
    },

    methods: {
      isMenu,
      changeTab(name) {
        this.$emit('changeTab', name)
      },
    },
    props: ['tabList', "tabClass"]
  }

</script>
