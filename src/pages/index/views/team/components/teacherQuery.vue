<template>
  <div class="main-box">
    <div class="search-box" v-if="inited && formData">
      <Form :model="formData" inline :label-width="80">
        <FormItem label="姓名">
          <Input v-model="formData.name" style="width: 150px;"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="formData.mobile" style="width: 150px;"></Input>
        </FormItem>
        <br>
        <FormItem label="学科">
          <Select
            v-model="formData.subject"
            transfer
            clearable
            placeholder="请选择"
            style="width: 150px;"
          >
            <Option
              v-for="(subject, index) in options.subject"
              :value="subject.key"
              :key="index"
              :label="subject.value"
            >
              <span>{{ subject.value }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="年级">
          <Select
            v-model="formData.grade"
            transfer
            clearable
            placeholder="请选择"
            style="width: 150px;"
          >
            <Option
              v-for="(grade, index) in options.grade"
              :value="grade.key"
              :key="index"
              :label="grade.value"
            >
              <span>{{ grade.value }}</span>
            </Option>
          </Select>
        </FormItem>
        <div class="btn-box"></div>
        <Button class="btn" type="primary" @click="query()">
          <Icon type="ios-search" style="font-size: 16px;"/>查 询
        </Button>
        <Button class="btn" @click="reset()">
          重 置
        </Button>
      </Form>
    </div>

    <div class="table-box" v-if="data">
      <Table
        class="tableData"
        :columns="columns"
        :data="data"
        border
      ></Table>
      <Page
        :total="pagination.total"
        show-sizer
        show-elevator
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        show-total
      />
    </div>
  </div>
</template>

<script>
import { getFieldOptions } from '../../customer/getData'

export default {
  data() {
    return {
      formData: null,
      page: null,
      querying: null,
      columns: [
        { title: '姓名', width: 100, key: 'name' },
        { title: '手机', width: 100, key: 'mobile' },
        { title: '大学', width: 120, key: 'graduation_school' },
        { title: '专业', width: 100, key: 'major' },
        { title: '年级-科目', width: 100, key: 'grade_and_subject' },
        { title: '学历', width: 100, key: 'education_background' },
        { title: '培训中心', width: 120, key: 'training_center' },
        { title: '评价', width: 150, key: 'interview_feedback' },
      ],
      data: null,
      pagination: null,
      options: null,
      api: '/api/teachers/list'
    }
  },
  created() {
    this.init()
  },
  computed: {
    inited() {
      return !!this.options
    }
  },
  methods: {
    initForm() {
      this.formData = {
        name: '',
        mobile: '',
        subject: '',
        grade: ''
      }
    },
    init() {
      if (!this.options) this.getOptions()
      this.initForm()
      this.page = {
        page: 1,
        page_size: 10
      }
      this.pagination = {
        total: 0
      }
      this.querying = false
      this.data = []
      // 针对需要tooltip的列进行改造
      this.columns.forEach((item, index) => {
        if (item.key === 'grade_and_subject' || item.key === 'interview_feedback') {
          item.render = (createElement, params) => {
            const val = params && params.row && params.row[item.key]
            if (val) {
              if (Array.isArray(val)) {
                return createElement('Tooltip', {
                  props: {
                    'content': val.join('\n'),
                    'max-width': '154',
                    'placement': 'left',
                    'transfer': true,
                  }
                }, [
                  createElement(
                    'div', {
                      class: ['overline-2']
                    }, val.map(v => createElement('p', v))
                  )
                ])
              } else {
                return createElement('Tooltip', {
                  props: {
                    'content': val,
                    'max-width': '200',
                    'placement': 'left'
                  }
                }, [
                  createElement('div', {
                    class: ['overline-2']
                  }, val),
                ])
              }
            }
          }
        }
      })

      // init完成后重载
      this.query()
    },
    reset() {
      this.initForm()
    },
    async query() {
      if (!this.querying) {
        let res = false
        try {
          res = await this.$axios.post(this.api, {
            ...this.formData,
            ...this.page
          })
          if (res.status) {
            this.data = res.data.data
            this.pagination = res.data.page
          }
        } catch (error) {}
        return res
      }
    },
    async getOptions() {
      this.options = await getFieldOptions(['grade', 'subject'])
    },
    pageChange(page) {
      this.page.page = page
      this.query()
    },
    pageSizeChange(size) {
      this.page.page_size = size
      this.query()
    }
  }
}
</script>

<style lang="less" scoped>
.overline-2 {
  text-overflow: -o-ellipsis-lastline;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-top: 3px;
}
.main-box {
  background-color: #fff;
  padding: 24px;
}
.btnSearch {
  height: 36px;
  line-height: 36px;
  width: 36px;
  border-radius: 18px;
  text-align: center;
  padding: 0;
  color: #ffffff;
  border: none;
  background-color: #07c4fe;
  font-size: 14px;
}
.btn-box {
  transform: translateY(1px);
  margin-left: 20px;
  display: inline-block;
}
.btn {
  min-width: 80px;
  margin: 0 10px;
}
</style>