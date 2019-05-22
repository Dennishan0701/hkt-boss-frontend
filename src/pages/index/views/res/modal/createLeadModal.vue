<style lang="less">
.crModal {
  .ivu-modal-close .ivu-icon-ios-close {
    display: none;
  }
  .closeModal {
    font-size: 31px;
    color: #999;
    transition: color 0.2s ease;
    position: absolute;
    top: 1px;
    right: 0;
    z-index: 3;
  }
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
      padding: 20px;
      overflow: hidden;
    }
    .ivu-modal-footer {
      /*display: block;*/
    }
    .mdBtn {
      float: right;
    }
  }
}
</style>

<template>
  <div>
    <Modal class="crModal" v-model="leadsShow" width="650" :mask-closable="false">
      <i class="closeModal ivu-icon ivu-icon-ios-close" @click="cancel"></i>
      <div class="mdModalheader" slot="header">
        <Icon type="ios-paper-plane" color="orange" size="22" style="margin-top: -3px;"/>
        新增{{form.recommend_type>0?'推荐':''}}Leads
      </div>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="110">
        <FormItem v-if="studentName!=''" label="推荐学员" style="width:350px">
          <p style="line-height: 34px;">{{studentName}}</p>
        </FormItem>
        <FormItem label="姓名" style="width:350px" prop="name">
          <Input v-model="form.name"></Input>
        </FormItem>
        <FormItem label="手机" style="width:350px" prop="mobile">
          <Input v-model="form.mobile"></Input>
        </FormItem>
        <ul class="list-inline">
          <li>
            <FormItem label="年级" prop="grade" style="width:275px">
              <Select v-model="form.grade" @on-change="changeClassType" transfer clearable>
                <Option :value="+item.key" v-for="(item,index) in gradeOptions" :key="index + 'gradeOptions'">{{item.value}}</Option>
              </Select>
            </FormItem>
          </li>
          <li>
            <Form-item label="科目" prop="subject" style="width:275px">
              <Select v-model="form.subject" @on-change="changeClassType" transfer clearable>
                <Option :value="+item.key" v-for="(item,index) in subjectOptions" :key="'subjectOptiosdgjiosldns' + index">{{item.value}}</Option>
              </Select>
            </Form-item>
          </li>
        </ul>

        <Form-item label="渠道" prop="channel_id" v-if="this.form.recommend_type ==0">
          <Select
            v-model="form.channel_id"
            @on-change="getmarketEvent"
            @on-open-change="getSelectOptions(api.channelsAPI)"
            clearable
            transfer
            style="width:180px; margin-right: 30px;"
            filterable
          >
            <Option v-for="item in selectOptions" :value="item.key" :key="item.key">{{item.value}}</Option>
          </Select>
          <Select
            v-model="form.market_event_id"
            @on-change="marketSelectOptions"
            clearable
            transfer
            style="width:120px"
            v-show="activityList.length > 0"
            filterable
          >
            <Option v-for="item in activityList" :value="item.key" :key="item.key">{{item.value}}</Option>
          </Select>
        </Form-item>
        <FormItem label="名单质量" prop="lead_quality" v-if="this.form.recommend_type ==0">
          <RadioGroup v-model="form.lead_quality">
            <Radio :label="+item.key" v-for="(item,index) in leadQualityOptions" :key="index + 'miaomiao'">{{item.value}}</Radio>
          </RadioGroup>
        </FormItem>

        <div v-if="this.form.recommend_type >0">
          <ul class="list-inline">
            <li>
              <FormItem label="推荐人类型" prop="referee_type">
                <RadioGroup v-model="form.referee_type">
                  <Radio :label="item.key" v-for="(item,index) in refereeTypeOptions" :disabled="rolesReadOnly" :key="index + 'refereeTypeOptions'">{{item.value}}</Radio>
                </RadioGroup>
              </FormItem>
            </li>
            <li>
              <FormItem label="推荐人">{{auth_user.name}}</FormItem>
            </li>
          </ul>

          <FormItem label="推荐类型" prop="recommend_type">
            <RadioGroup v-model="form.recommend_type">

              <Radio :label="item.key" v-for="(item,index) in recommendTypeOptions" :disabled="item.key ==0" :key="'recommendTypeOptions' + index">{{item.value}}</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem
            label="推荐学员手机号"
            style="width:350px"
            prop="student_referee_mobile"
            v-if="this.form.recommend_type ==1"
          >
            <Input v-model="form.student_referee_mobile"></Input>
          </FormItem>

          <FormItem
            label="外部推荐人"
            style="width:350px"
            prop="outsource_referee_name"
            v-if="this.form.recommend_type ==2"
          >
            <Input v-model="form.outsource_referee_name"></Input>
          </FormItem>

          <FormItem
            label="推荐人手机号"
            style="width:350px"
            prop="outsource_referee_mobile"
            v-if="this.form.recommend_type ==2"
          >
            <Input v-model="form.outsource_referee_mobile"></Input>
          </FormItem>
        </div>
        <!-- <FormItem label="备注" style="width:550px">
          <Input
            v-model="form.remark"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 6}"
            placeholder="输入该名单备注信息..."
          ></Input>
        </FormItem> -->
        <FormItem label="备注" style="width:550px" v-if="form.recommend_type==0">
          <Input
            v-model="form.remark"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 6}"
            placeholder="输入该名单备注信息..."
          ></Input>
        </FormItem>
        <FormItem label="备注CC" style="width:550px" v-else-if="form.recommend_type>0">
          <Input
            v-model="form.remark"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 6}"
            placeholder="注意：一定要在这里备注这条推荐例子移交给哪位CC...格式：  CC手机：，CC名字："
          ></Input>
        </FormItem>
      </Form>
      <Button type="info" class="mdBtn" @click="handleSubmit('form')" style="width: 70px;">确 认</Button>
      <Button
        type="default"
        class="mdBtn"
        @click="cancel"
        style="margin-right: 10px;width: 70px;"
      >取 消</Button>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import RULE from "@/api/infoRule";
export default {
  async created() {
    this.init()
  },
  data() {
    return {
      api: {
        manualCreateAPI: this.$store.state.api.lead.manualCreate, //新增leads
        channelsAPI: this.$store.state.api.lead.getOptionsChannels,
        getmarketEvent: this.$store.state.api.lead.getmarketEvent
      },
      rolesReadOnly: true,
      auth_user: "",
      studentName: "",
      gradeOptions:"",
      subjectOptions:"",
      recommendTypeOptions:"",
      refereeTypeOptions:"",
      leadQualityOptions:"",
      form: {},
      id: "",
      modal: false,
      loading: false,
      ruleValidate: {
        name: [
          {
            required: true,
            validator: RULE().validateName,
            message: "请输入正确的姓名",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            validator: RULE().validatePhone,
            trigger: "blur"
          },
        ],
        grade: [
          {
            required: true,
            type: "number",
            message: "请选择年级",
            trigger: "change"
          }
        ],
        subject: [
          {
            required: true,
            type: "number",
            message: "请选择科目",
            trigger: "change"
          }
        ],
        channel_id: [
          {
            required: true,
            type: "number",
            message: "请选择渠道",
            trigger: "change"
          }
        ],
        lead_quality: [
          {
            required: true,
            type: "number",
            message: "请选择名单质量",
            trigger: "change"
          }
        ],
        student_referee_mobile: [
          {
            required: true,
            validator: RULE().validatePhone,
            trigger: "blur"
          },
        ]
      },
      selectOptions: [],
      activityList: []
    };
  },
  computed: {
    ...mapGetters(["leadsShow", "leadsType"])
  },
  methods: {
    async init() {
      this.form = {
        // recommend_internal_user_id: "",//登陆用户id
        // recommend_lead_id: "",//选中学生id
        name: "",
        mobile: "",
        grade: "",
        subject: "",
        channel_id: "",
        market_event_id: "",
        lead_quality: "",
        recommend_type: "",
        referee_type: "",
        student_referee_mobile: "",
        outsource_referee_name: "",
        outsource_referee_mobile: "",
        remark: ""
      }

      await this.getOptions();

      let auth_user = JSON.parse(sessionStorage.getItem("auth_user"));
      if (auth_user) {
        this.auth_user = auth_user;
        switch (auth_user.role.name) {
          case "cc": case "cc_satrap":
            this.form.referee_type = '1';
            break;
          case "cr": case "service_satrap":
            this.form.referee_type = '2';
            break;
          case "teacher":
            this.form.referee_type = '3';
            break;
          default:
            this.rolesReadOnly = false;
            break;
        }
      }
    },
    async getOptions(){
      await this.$axios.post('/api/config/field_options/get',{'field':['grade','subject','recommend_type','referee_type','lead_quality']}).then(res=>{
        this.gradeOptions = res.data.data.grade;
        this.subjectOptions = res.data.data.subject;
        this.recommendTypeOptions = res.data.data.recommend_type;
        this.refereeTypeOptions = res.data.data.referee_type;
        this.leadQualityOptions = res.data.data.lead_quality;
      });
    },
    cancel() {
      //关闭弹窗
      this.$store.commit("LEADS_SHOW", false);
    },
    showCreate(is_recommend = 0) {
      this.init()

      this.$store.commit("LEADS_SHOW", true);
      if (is_recommend == 1) {
        this.form.recommend_type = 1;
      } else {
        this.form.recommend_type = 0;
      }

      // this.form.mobile = this.getMobile();
    },
    // show(id,studentName) {
    //   this.studentName=studentName;
    //   this.form.recommend_lead_id = id;
    // },
    handleSubmit(name) {
      console.log(this.form);
      // if(this.form.referee_type ==""){
      //   this.$Notice.error({
      //     title: "",
      //     desc: "提交人角色错误！",
      //     duration: 3
      //   });
      //   return false;
      // }
      const app = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          let auth_user = JSON.parse(sessionStorage.getItem("auth_user"));
          this.form.recommend_internal_user_id = auth_user.id;
          app.$axios.post(app.api.manualCreateAPI, this.form).then(res => {
            if (res.data.status == "success") {
              app.$Notice.success({
                title: "",
                desc: "新建成功",
                duration: 3
              });
            } else {
              app.$Notice.error({
                title: "",
                desc: "新建失败",
                duration: 3
              });
            }
            this.$store.commit("LEADS_SHOW", false);
            this.$emit("reFresh", "success");
          });
        }
      });
    },
    changeClassType(value) {
      console.log(12213);
    },
    getMobile() {
      var secondNums = new Array("3", "4", "5", "7", "8");
      var newMobile =
        "1" +
        secondNums[Math.floor(Math.random() * secondNums.length)] +
        Math.floor(Math.random() * 899999999 + 100000000);
      return newMobile;
    },
    //点击select获取options
    getSelectOptions(api) {
      if (this.selectOptions.length == 0) {
        this.$axios.get(api).then(res => {
          this.selectOptions = res.data.data;
          // console.log('this.selectOptions', this.selectOptions)
        });
      }
    },
    getmarketEvent(id) {
      //   console.log('id', id);
      this.form.market_event_id = "";
      id &&
        this.$axios
          .get(this.api.getmarketEvent, {
            params: {
              channel_id: id
            }
          })
          .then(res => {
            this.activityList = res.data.data.data;
            // this.marketFilter = res.data.data.filter;
          });
    },
    marketSelectOptions(id) {
      //   this.
    }
  }
};
</script>
