<template>
  <div>
    <Modal class="mdModal"
           v-model="modal"
           width="700"
           :mask-closable="false"
    >
      <div class='mdModalheader' slot="header">
        <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
        TMK移交记录
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <!--<div class="line">-->
        <FormItem label="学生姓名" prop="name" class="stuName">
          <span style="line-height: 34px;height: 34px;font-size: 14px;">{{formValidate.name}}</span>
        </FormItem>
        <!--</div>-->
        <div class="title_outer">
          <span class="title_inner">学习要求</span>
        </div>
        <div class="lines">
          <FormItem label="学习科目 " prop="subject">
            <Select v-model="formValidate.subject" style="width:120px"
                    placeholder="请选择科目" transfer>
              <Option v-for="(item,index) in options.subject" :value="parseInt(item.key)" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="所在年级" prop="grade">
            <Select v-model="formValidate.grade" placeholder="请选择年级" style="width:120px" transfer>
              <Option v-for="(item,index) in options.grade" :value="parseInt(item.key)" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="教材版本" prop="textbook">
            <Select v-model="formValidate.textbook" placeholder="请选择教材" style="width:120px" transfer>
              <Option v-for="(item,index) in options.textbook" :value="parseInt(item.key)" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="学习成绩" prop="school_records" class="blockItem">
            <span>得分</span>
            <Input v-model="formValidate.school_records.initial" placeholder="" style="width: 80px;margin-left:10px;margin-right: 20px;"/>
            <span>总分</span>
            <Input v-model="formValidate.school_records.total" placeholder="" style="width: 80px;margin-left: 10px;margin-right: 30px;"/>
            <Select v-model="formValidate.school_records.exam_type" placeholder="请选择考试类型" style="width:130px;" transfer>
              <Option value="单元测试">单元测试</Option>
              <Option value="期中考试">期中考试</Option>
              <Option value="期末考试">期末考试</Option>
            </Select>
          </FormItem>
          <FormItem label="学习情況" prop="learning_situation" class="blockItem">
            <CheckboxGroup v-model="formValidate.study_demand.learning_situation" @on-change="checkAllGroupChange">
              <Checkbox label="厌学"></Checkbox>
              <Checkbox label="贪玩"></Checkbox>
              <Checkbox label="基础薄弱"></Checkbox>
              <Checkbox label="方法不佳"></Checkbox>
              <Checkbox label="均衡"></Checkbox>
              <Checkbox label="拔高"></Checkbox>
            </CheckboxGroup>
            <Input v-model="formValidate.study_demand.desc" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="学习情况详细描述"/>
          </FormItem>
        </div>
        <div class="title_outer">
          <span class="title_inner">老师要求</span>
        </div>
        <div class="lines">
          <FormItem label="性別要求" prop="teacher_gender" class="blockItem">
            <RadioGroup v-model="formValidate.teaching_demand.teacher_gender">
              <Radio label="无要求"></Radio>
              <Radio label="男"></Radio>
              <Radio label="女"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="授课要求" prop="desc" class="blockItem">
            <Input v-model="formValidate.teaching_demand.desc" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="描述授课要求" />
          </FormItem>
        </div>
      </Form>
      <Button type="info" class="mdBtn" @click="handleSubmit('formValidate')">确认</Button>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        api: {
          getFieldOptionsAPI:this.$store.state.api.data_query.getFieldOptions,
          cleanedAPI:this.$store.state.api.lead.cleaned
        },
        id: '',
        lead: '',
        modal: false,
        loading: false,
        formValidate: {
          name: "",
          subject: "",
          grade: "",
          textbook:"",
          school_records: {
            initial:'',
            total:'',
            exam_type:''
          },
          study_demand:{
               learning_situation:[],
               desc:''
          },
          teaching_demand:{
              teacher_gender:'',
              desc:''
          }
        },
        ruleValidate: {
          subject: [
            {type: 'number', required: true, message: '请选择科目', trigger: 'change'},
          ],
          grade: [
            {type: 'number', required: true, message: '请选择年级', trigger: 'change'},
          ]
        },
        options:{
        }
      }
    },
    mounted () {
      this.getAllOptions();

    },
    methods: {
      translateFormData(){
          let data = {};

            for (var index in this.formValidate){
              data[index] = {
                "display_name":this.formNames[index],
                "value":this.formValidate[index],
              }
            }

          return data;
      },
        checkAllGroupChange(){

        },
      show (lead) {
        this.modal = true;
        this.lead = lead;

        this.formValidate.name = lead.basic_info_name;
        this.formValidate.subject = lead.basic_info_subject;
        this.formValidate.grade = lead.basic_info_grade;
        this.formValidate.textbook = lead.basic_info_textbook;
      },
      getAllOptions () {// 获取所有选项
        this.$axios.post (this.api.getFieldOptionsAPI,{"field":['grade','subject','textbook']}).then (res => {
          this.options = res.data.data;
        });
      },

      handleSubmit (name) {//名单分配弹窗，点击确认
        let app = this;

        this.$refs[name].validate ((valid) => {
          if (valid) {
            app.$axios.post(app.api.cleanedAPI, {
              lead_id:this.lead.leads_id,
              form_data: this.formValidate,
            }).then(res => {
              if (res.data.status == "success") {
                app.$Notice.success({
                  title: '',
                  desc: '操作成功',
                  duration:4
                });
                this.modal = false;
                this.$emit ('reFresh', 'success');
                this.formValidate = {
                  name: "",
                  subject: "",
                  grade: "",
                  textbook:"",
                  school_records: {
                    initial:'',
                    total:'',
                    exam_type:''
                  },
                  study_demand:{
                      learning_situation:[],
                      desc:''
                  },
                  teaching_demand:{
                      teacher_gender:'',
                      desc:''
                  }
                };
              } else {
                app.$Notice.error({
                  title: '',
                  desc: '操作失败',
                  duration: 4
                });
              }
            });
          }
        });
      },
    }
  };
</script>

<style lang="less" scoped>
  .stuName{
    margin-bottom: 6px;
    .ivu-form-item-label:before {
      content: '*';
      display: inline-block;
      margin-right: 4px;
      line-height: 1;
      font-family: SimSun;
      font-size: 12px;
      color: #ed4014;
    }
  }
  .title_outer{
    padding: 15px 0;
    .title_inner{
      font-size: 14px;
      font-weight: 600;
      color: #2db7f5;
      margin-left: 22px;
      border-bottom: 3px solid #2db7f5;
      letter-spacing: 1px;
      padding: 2px 0;
    }
  }

  .mdModal {
    .ivu-modal-wrap {
      .ivu-modal-header {
        border: none;
        .mdModalheader {
          display: inline-block;
          vertical-align: middle;
          margin-left: 6px;
          font-size: 16px;
          color: #17233d;
          font-weight: 700;
        }
      }
      .ivu-modal-body {
        padding: 20px !important;
      }
      .ivu-modal-footer {
        /*display: block;*/
      }
      .mdBtn {
        margin-left: 425px;
      }
      .lines {
        /*display: flex;*/
        width: 700px;
        .ivu-form-item {
          width: 210px;
          display: inline-block;
        }
        .blockItem {
          width: 650px;
          display: block;
        }
      }
      /*.block{*/
      /*.ivu-form-item{*/
      /*width: 300px;*/
      /*display: inline-block;*/
      /*}*/
      /*}*/
    }
  }

</style>
