<template>
  <div class="box">
    <div class="item" v-for="(i,index) in data" v-show="i.record_url" :key="index + 'feajkl'">
      <div class="name">{{i.user_name}}</div>
      <audio class="record" :src="i.record_url" controls>你的浏览器不支持播放该录音哦，建议使用Chrome</audio>
    </div>
  </div>
</template>
<script>
import { $axios } from "@/api/common";

export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    async getRecords(id) {
      try {
        const { data: { data = [] } = {} } = await $axios.post(
          "/api/leads/call-records",
          {
            lead_id: id
          }
        );
        this.data = data;
      } catch (error) {
        this.data = [];
      }
    }
  },
  mounted() {
    this.getRecords(this.$route.query.id);
  }
};
</script>
<style scoped>
* {
  /* border: solid red 1px; */
}
.box {
}
.item {
  display: flex;
  margin-bottom: 10px;
}
.item:nth-child(1) {
  /* margin-top: 10px; */
}
.name {
  color: #656e7d;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 0 10px;
}
.record {
  flex: 1;
}
</style>
