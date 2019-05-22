// this is a mixin of ./components/tabs.vue
import { setSession } from '@/assets/js/storage'

export default {
  methods: {
    changeTab(name) {
      this.tabStatus = name
      setSession('tab_status', name)

      if (this.tabList && this.tabList.length) {
        this.tabList.forEach(tab => {
          if (tab.name === name) {
            this.api.tab = tab.tab
            this.btnShow = tab.btns
            this.distribute_params = tab.distribute_params
          }
        })
      }
    },
  },
}
