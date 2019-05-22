<template>
    <div style="display: inline">
        <span style="float: right; margin-top: -1px;position: relative;z-index: 999;" v-if="item.isHover">
            <Tooltip trigger="hover" content="添加" theme="light">
                <Icon v-if="item.parent_id ==0" type="ios-add-circle-outline" size="15" @click.stop="addDepart(item.id)" color="#C9CED6"/>
            </Tooltip>
            <Tooltip trigger="hover" content="编辑" theme="light">
                <Icon type="md-create" size="15" @click.stop="editDepart(item.id,item.parent_id)" color="#C9CED6" style="margin-left: 4px;"/>
            </Tooltip>
            <Tooltip trigger="hover" content="删除" theme="light">
                <Icon v-if="item.parent_id !=0" type="ios-trash-outline" size="16" @click.stop="deleteDepart(item.id)" color="#C9CED6" style="margin-left: 4px;"/>
            </Tooltip>
        </span>
    </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: [
      'item'
    ],
    methods:{
      //添加
      addDepart(id){
        this.$emit('showaddmodal',id)
      },
      // 编辑
      editDepart(id,pid){
        this.$emit('showeditmodal',id , pid, this.item)
      },
      // 删除
      deleteDepart(id,item){
        this.$emit('showdeletemodal',id, this.item)
      },
    },
  }
</script>
<style scoped="less">

</style>
