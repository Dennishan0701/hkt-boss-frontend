<!--导入Leads弹窗-->
<template>
    <Modal class="modals" width="600" v-model="isShow"
           :mask-closable="false">
        <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
        <div class="modalCon">
            <Upload
                    ref="upload"
                    type="drag"
                    :action="apiBase + getImportLeadsAPI"
                    :headers="{Authorization : 'Bearer ' + token}"
                    :data="{type:uploadType}"
                    :default-file-list="fileList"
                    :show-upload-list="true"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :on-progress="handleProgress"
                    :before-upload="handleBeforeUpload">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>单击或拖动文件到此处上传</p>
                </div>
            </Upload>
            <div class="template-dowmload">
              <a href="/static/download/import_template.csv" download="import_template.csv">下载模板</a>
            </div>
        </div>
    </Modal>
</template>
<style lang="less">
    @import "../../../../../assets/css/modal.less";
    .modalCon{
        padding: 40px;
    }
</style>
<script>

  import apiBase from '@/api/api.config';

  export default {
    data() {
      return {
        token:localStorage.getItem('token'),
        user_id:JSON.parse(sessionStorage.getItem('auth_user')).id,
        uploadType:"",
        isShow: false,
        apiBase: apiBase('api'),
        leadsParams: {
          name: 'upload'
        },
        loadingStatus: false,
        getImportLeadsAPI: this.$store.state.api.lead.importLeads, //导入LeadsAPI
        fileList:[],
      }
    },
    computed: {},
    mounted() {
    },
    watch: {},
    methods:{
      show(type){
        this.isShow=true;
        this.fileList=[];
        this.uploadType=type;
      },
      cancel(){
        this.isShow=false;
      },

      handleSuccess(res, file) {
        // this.loadingStatus = false;
        // let tip='导入成功'+res.data.imported
        //   +'条，导入重复' +res.data.duplicate
        //   +'条，导入失败' +res.data.faild+'条';
        if(res.status=="success"){
          this.$Notice.success({
            title: '',
            desc: res.message,
            duration: 4
          });
          this.isShow=false;
        }
        else if(res.status=="error"){
          this.$Notice.error({
            title: '',
            desc: res.message,
            duration: 3
          });
        }

      },
      handleError(res, file) {
        this.$Notice.error({
          title: '',
          desc: res.message,
          duration: 3
        });
      },
      handleProgress(res, file) {
        // this.loadingStatus = true;
      },
      handleBeforeUpload(file) {
        console.log(file);
        // const check = this.uploadList.length < 5;
        // if (!check) {
        //   this.$Notice.warning({
        //     title: 'Up to five pictures can be uploaded.'
        //   });
        // }
        // return check;
        // this.$refs.upload.post(file)
      }
    },

    destroyed() {
    },
  }
</script>

<style scoped>
.template-dowmload {
  height: 20px;
  position: absolute;
}
</style>
