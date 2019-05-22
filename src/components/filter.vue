<style lang="less">
</style>

<template lang="html">
    <div id="filter">
        <Form :model="formItem" :label-width="120" label-position="left">
            <!--日期-->
            <FormItem v-if="filter.filter_type =='date'" :label=filter.display_name>
                <DatePicker type="daterange" v-model="formItem.date" split-panels placeholder="   开始时间     至     结束时间"
                            transfer style="width: 200px"
                            @on-change="formItem.date=$event,handleFilterChange(filter,'date')"></DatePicker>
            </FormItem>
            <!--下拉框单选-->
            <FormItem v-if="filter.filter_type =='select'&&filter.field_name !='channel_id'" :label=filter.display_name>
                <!--get_options_type==0,才会调用@on-open-change="getSelectOptions(filter.api_url)"-->
                <Select v-if="filter.get_options_type==0" v-model="formItem.select" filterable style="width:200px"
                        @on-change="handleFilterChange(filter,'select')"
                        @on-open-change="getSelectOptions(filter.api_url)" clearable>
                    <Option v-for="item in selectOptions" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
                <!--否则不会调用@on-open-change="getSelectOptions(filter.api_url)"-->
                <Select v-else v-model="formItem.select" filterable style="width:200px"
                        @on-change="handleFilterChange(filter,'select')">
                    <Option v-for="item in filter.field_options" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
            </FormItem>
            <!--下拉框多选-->
            <FormItem v-if="filter.filter_type =='multi_select'" :label=filter.display_name>
                <!--get_options_type==0,才会调用@on-open-change="getSelectOptions(filter.api_url)"-->
                <Select v-if="filter.get_options_type==0" v-model="formItem.multi_select" multiple filterable style="width: 200px"
                        @on-change="handleFilterChange(filter,'multi_select')"
                        @on-open-change="getSelectOptions(filter.api_url)">
                    <Option v-for="item in selectOptions" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
                <!--否则不会调用@on-open-change="getSelectOptions(filter.api_url)"-->
                <Select v-else v-model="formItem.multi_select" multiple filterable style="width: 200px"
                        @on-change="handleFilterChange(filter,'multi_select')">
                    <Option v-for="item in filter.field_options" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
            </FormItem>
            <!--Radio单选-->
            <FormItem v-if="filter.filter_type =='list'" :label=filter.display_name>
                <RadioGroup v-model="formItem.radio" @on-change="handleFilterChange(filter,'radio')">
                    <Radio v-for="item in filter.field_options" :key="item.key" :label="item.key">{{item.value}}
                    </Radio>
                </RadioGroup>
            </FormItem>
            <!--checkbox多选-->
            <FormItem v-if="filter.filter_type =='multi_list'" :label=filter.display_name>
                <!--<Checkbox-->
                <!--:indeterminate="indeterminate"-->
                <!--:value="checkAll"-->
                <!--@on-change="handleAll">全选-->
                <!--</Checkbox>-->
                <!--<CheckboxGroup style="display: inline-block;" v-model="formItem.checkbox"-->
                <!--@on-change="handleFilterChange(filter,'checkbox')">-->
                <!--<Checkbox :label=item.value v-for="item in filter.field_options"></Checkbox>-->
                <!--</CheckboxGroup>-->
                <ul class="checkBoxList">
                    <li :class="{active: visibility }" @click="clearAll(filter,'checkbox')">全部</li>
                    <li :class="{active: inArray(item.key)}" v-for="item in filter.field_options"
                        @click="handleMultiList(item.key,filter,'checkbox')">
                        {{item.value}}
                    </li>
                </ul>
            </FormItem>
            <!--cascader级联选择-->
            <FormItem v-if="filter.filter_type =='cascader'" :label=filter.display_name>
                <Select v-model="formItem.cascaderValue.select1" filterable style="width:120px;margin-right: 15px;"
                        @on-change="handleFilterChange(filter,'cascader',1)"
                        @on-open-change="getCascaderOptions(filter.api_url)">
                    <Option v-for="(item,index) in cascaderOptions1" :value="item.id" :key="index">{{item.name}}</Option>
                </Select>
                <Select v-if="cascaderOptions2.length>0" v-model="formItem.cascaderValue.select2" filterable style="width:120px;margin-right: 15px;"
                        @on-change="handleFilterChange(filter,'cascader',2)">
                    <Option v-for="(item,index)   in cascaderOptions2" :value="item.id" :key="index">{{item.name}}</Option>
                </Select>
                <Select v-if="cascaderOptions3.length>0" v-model="formItem.cascaderValue.select3" filterable style="width:120px"
                        @on-change="handleFilterChange(filter,'cascader',3)">
                    <Option v-for="(item,index) in cascaderOptions3" :value="item.id" :key="index">{{item.name}}</Option>
                </Select>
            </FormItem>
            <!--渠道+活动-->
            <FormItem v-if="filter.field_name =='channel_id'" :label=filter.display_name>
                <!--get_options_type==0,才会调用@on-open-change="getSelectOptions(filter.api_url)"-->
                <Select v-if="filter.get_options_type==0" v-model="formItem.select" filterable style="width:120px"
                        @on-change="handleFilterChange(filter,'select',1,'channel_id')"
                        @on-open-change="getSelectOptions(filter.api_url)"
                        clearable
                        >
                    <Option v-for="item in selectOptions" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
                <!--否则不会调用@on-open-change="getSelectOptions(filter.api_url)"-->
                <Select v-else v-model="formItem.select" filterable style="width:120px"
                        @on-change="handleFilterChange(filter,'select',1,'channel_id')"
                        clearable
                        >
                    <Option v-for="item in filter.field_options" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
                <Select v-model="formItem.activity" filterable style="width:120px;margin-left: 20px"
                        @on-change="handleFilterChange(marketFilter,'activity')"
                        clearable
                        >
                    <Option v-for="(item,index) in activityList" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
            </FormItem>

        </Form>

    </div>

</template>

<script>
  const tempReg = new RegExp(/\{(.*?)\}/g)
  // 模板替换
  const tempRender = (template, context) => template.replace(tempReg, (match, key) => context[key.trim()])
  // 获取模板的key
  const getRenderKey = template => {
    const arr = template.match(tempReg)
    return (Array.isArray(arr) ? arr : [arr]).map(e => e && e.replace(/\{|\}/g, ''))
  }

  export default {
    data() {
      const selectCache = sessionStorage.getItem('sx_cache')
      return {
        formItem: {
          select: '',
          multi_select: '',
          radio: '',
          checkbox: [],
          date: '',
          cascader:"",//级联选择最终值
          cascaderValue: {//级联选择三个选项值
            select1: "",
            select2: "",
            select3: "",
          },
          activity:""
        },
        selectOptions: [], //select的optionsList
        //级联选择三个选项的optionsList
        cascaderOptions1:[],
        cascaderOptions2:[],
        cascaderOptions3:[],
        //活动list
        activityList:[],
        getmarketEvent:this.$store.state.api.lead.getmarketEvent, //选择渠道获取活动
        marketFilter:"",
        selectCache: selectCache && JSON.parse(selectCache) || {},
      }
    },
    props: ['filter', 'selectObj'],//父组件传送过来的组件数组
    beforeCreate() {


    },
    beforeMount() {

    },
    mounted() {
    },
    watch: {
      //监听级联选项改变
      clickOK(newValue, oldValue) {//（普通watch,这种监听基础类型的变量）
        console.log(newValue);
        if (newValue > 0) {//如果点击了弹窗的确定
          console.log("点击确定了");
          this.getTableData();
        }
      },
    },
    created() {
    },
    computed: {
      //checkBox全选是否active
      visibility: function () {
        //checkBox的选项的没有选值就给(全部)active
        if (this.formItem['checkbox'].length > 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    methods: {
      //点击全选
      clearAll(filter, type) {
        this.formItem['checkbox'] = [];
        var query = {
          field_name: filter.original_field_name,
          table_name: filter.table_name,
          query_method: filter.query_method,
          value: this.formItem[type],
          handle_conditions_type:filter.handle_conditions_type,
        };
        console.log(query);
        this.$emit('requestFilter', query);
      },
      //checkBox中选项是否active
      inArray(key) {
        //checkBox的选项如果已选中，就取消active
        // console.log(this.formItem['checkbox'].includes(key));
        if (this.formItem['checkbox'].includes(key)) {
          return true;
        }
        //否则给active
        else {
          return false;
        }
      },
      //点击checkBox中一个选项
      handleMultiList: function (key, filter, type) {
        //如果checkbox选项已经存在，就删除
        if (this.formItem['checkbox'].includes(key)) {
          this.formItem['checkbox'].splice(this.formItem['checkbox'].indexOf(key), 1);
        }
        //如果不存在就添加
        else {
          this.formItem['checkbox'].push(key);
        }
        var query = {
          field_name: filter.original_field_name,
          table_name: filter.table_name,
          query_method: filter.query_method,
          value: this.formItem[type],
          handle_conditions_type:filter.handle_conditions_type,
        };
        // console.log(query);
        this.$emit('requestFilter', query)
      },
      //点击select获取options
      getSelectOptions(api) {
        if (api) {
          const keys = getRenderKey(api)
          if (keys && keys.length) {
            keys.forEach(key => {
              const val = this.selectObj[key]
              const obj = {}
              obj[key] = val
              api = tempRender(api, obj)
            })
          }
          this.$axios.get(api).then(res => {
            this.selectOptions = res.data.data.data || res.data.data;
          })
        }
      },
      //点击级联select获取options
      getCascaderOptions(api) {
        if (this.cascaderOptions1.length == 0) {
          this.$axios.get(api).then(res => {
            this.cascaderOptions1 = res.data.data;
          });
        }
      },
      //每个组件change事件
      handleFilterChange(filter, type,selectIndex,fieldName) {
        console.log(selectIndex);
        //如果是时间
        if (type == "date" ) {
          //如果点击清除时间，传递一个空数组
          if (this.formItem["date"][0] == "") {
            this.formItem["date"] = [];
          }
          //第一个时间加上00:00，第二个时间加上24:00
          else{
            this.formItem["date"][0]=this.formItem["date"][0]+" 00:00:00";
            this.formItem["date"][1]=this.formItem["date"][1]+" 23:59:59";
            // console.log(this.formItem["date"][1]);
          }
        }
        //如果是级联选择
        if (type == "cascader") {
          if(selectIndex == 1) {//第一个变化，后面清0
            this.formItem.cascaderValue.select2 = '';
            this.formItem.cascaderValue.select3 = '';
            this.cascaderOptions2 = [];
            this.cascaderOptions3 = [];
          }
          else if(selectIndex == 2) {//第二个变化，后面清0
            this.formItem.cascaderValue.select3 = '';
            this.cascaderOptions3 = [];
          }
          let select1=this.formItem.cascaderValue.select1;//级联选择选中第1个值
          let select2=this.formItem.cascaderValue.select2;//级联选择选中第2个值
          let select3=this.formItem.cascaderValue.select3;//级联选择选中第3个值
          let cascaderOptions1=this.cascaderOptions1;//级联选择所有选项
          let cascaderOptions2=this.cascaderOptions2;//级联选择2所有选项
          let cascaderOptions3=this.cascaderOptions3;//级联选择3所有选项
          let that = this;
          if (cascaderOptions1.length >0&&select1!="") {
            this.formItem.cascader=select1;
            cascaderOptions1.forEach(function (item, index) {
              if(item['id']==select1){
                that.cascaderOptions2=item['all_children'];
              }
            });
          }
          if (cascaderOptions2.length >0&&select2!="") {
            this.formItem.cascader=select2;
            cascaderOptions2.forEach(function (item, index) {
              if(item['id']==select2){
                that.cascaderOptions3=item['all_children'];
              }
            });
          }
          if (cascaderOptions3.length >0&&select3!="") {
            this.formItem.cascader=select3;
          }
        }
        //如果是渠道+活动
        if (fieldName == "channel_id") {
          this.$axios.get(this.getmarketEvent,{
            params:{
              channel_id:this.formItem[type]
            }
          }).then(res => {
            this.activityList = res.data.data.data;
            this.marketFilter = res.data.data.filter;
          });
        }
        var query = {
          field_name: filter.original_field_name,
          table_name: filter.table_name,
          query_method: filter.query_method,
          value: this.formItem[type]||'',
          handle_conditions_type:filter.handle_conditions_type,
        };
        var selectObj = {}
        selectObj[`${query.table_name}_${query.field_name}`] = query.value
        // console.log(query);
        this.$emit('updateSelect', selectObj)
        this.$emit('requestFilter', query)
      }
    }
  }

</script>
